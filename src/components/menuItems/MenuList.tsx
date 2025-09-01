import { View, Text, FlatList } from "react-native";
import React, { useState } from "react";
import { useGetMenuAllQuery } from "../../services/menuItemApi";
import Loading from "../Loading";
import Error from "../Error";
import { styles } from "./MenuList.Style";
import MenuCard from "./MenuCard";
import { getCardWidth, wp } from "../../helpers/common";
import SearchBar from "../SearchBar";
import FilterSortBar from "../filters/FilterSortBar";
import Pagination from "../pagination/Pagination";

const numColumns = 2;
const spacingPercent = 4;
const paddingPercent = 3;

const MenuList = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(6);

  const {
    data: menuList,
    isLoading,
    isError,
  } = useGetMenuAllQuery({
    pageNumber ,
    pageSize,
  });

  if (isLoading) return <Loading />;
  if (isError || !menuList) return <Error />;

  const menuItems = menuList?.result ?? [];
  const meta = menuList?.meta;

  const itemSpacing = wp(spacingPercent);
  const horizontalPadding = wp(paddingPercent);
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
        showsVerticalScrollIndicator={false}
        ListFooterComponent={
          meta && (
            <Pagination
              meta={meta}
              page={pageNumber - 1}
              numberOfItemsPerPage={pageSize}
              onPageChange={(page) => setPageNumber(page + 1)}
              onItemsPerPageChange={(size) => {
                setPageSize(size);
                setPageNumber(1);
              }}
              numberOfItemsPerPageList={[6, 11, 21]}
            />
          )
        }
      />
    </View>
  );
};

export default MenuList;
