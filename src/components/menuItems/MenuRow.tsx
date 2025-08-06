import { FlatList, View } from 'react-native'
import React, {  } from 'react'
import { SIZES } from '../../helpers/themes';
import MenuCard from './MenuCard';
import { styles } from './MenuRow.Style';
import { useGetMenuAllQuery } from '../../services/menuItemApi';
import Error from '../Error';
import Loading from '../Loading';

const MenuRow = () => {
  const {
    data: menus,
    isLoading,
    isError,
  } = useGetMenuAllQuery({
    pageNumber: 1,
    pageSize: 10,
  });

  if (isLoading) return <Loading />;
  if (isError || !menus) return <Error />;

  const menuItems = menus?.result ?? [];
  return (
    <View style={styles.menuGrid}>
      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        renderItem={({ item }) => <MenuCard menuItems={item} />}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ columnGap: SIZES.small }}
      />
    </View>
  );
};

export default MenuRow

