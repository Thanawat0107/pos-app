import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { useGetMenuAllQuery } from '../../services/menuItemApi'
import Loading from '../Loading';
import Error from '../Error';
import { styles } from './MenuList.Style';
import MenuCard from './MenuCard';

const MenuList = () => {
  const { data: menuList, isLoading, isError } = useGetMenuAllQuery({
    pageNumber: 1,
    pageSize: 10,
  });
  
  if (isLoading) return <Loading />;
  if (isError || !menuList) return <Error />;

  const menuItems = menuList?.result ?? [];

  return (
    <View style={styles.container}>
      <FlatList
        data={menuItems}
        numColumns={2}
        renderItem={({ item }) => <MenuCard menuItems={item} />}
        contentContainerStyle={styles.container}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
}

export default MenuList