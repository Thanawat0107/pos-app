import { View, Text, FlatList } from "react-native";
import React from "react";
import { useGetMenuAllQuery } from "../../services/menuItemApi";
import Loading from "../Loading";
import Error from "../Error";
import { styles } from "./MenuList.Style";
import MenuCard from "./MenuCard";
import { getCardWidth, wp } from "../../helpers/common";
import SearchBar from "../SearchBar";
import FilterSortBar from "../filters/FilterSortBar";

const MenuList = () => {
  const {
    data: menuList,
    isLoading,
    isError,
  } = useGetMenuAllQuery({
    pageNumber: 1,
    pageSize: 10,
  });

  if (isLoading) return <Loading />;
  if (isError || !menuList) return <Error />;

  const menuItems = menuList?.result ?? [];

  const numColumns = 2;
  const spacingPercent = 4;
  const paddingPercent = 3;

  const itemSpacing = wp(spacingPercent); // ระยะห่างระหว่างการ์ด
  const horizontalPadding = wp(paddingPercent); // padding ซ้ายขวา
  const cardWidth = getCardWidth(numColumns, spacingPercent, paddingPercent);

  return (
    <View style={styles.container}>
      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.id.toString()}
        numColumns={numColumns}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.title}>รายการเมนู</Text>
            <SearchBar />
            <FilterSortBar />
          </View>
        }
        renderItem={({ item, index }) => (
          <View
            style={[
              styles.cardContainer,
              {
                width: cardWidth,
                marginLeft: index % numColumns === 0 ? 0 : itemSpacing,
              },
            ]}
          >
            <MenuCard menuItems={item} />
          </View>
        )}
        contentContainerStyle={[
          styles.flatListContainer,
          { paddingHorizontal: horizontalPadding },
        ]}
      />
    </View>
  );
};

export default MenuList;
