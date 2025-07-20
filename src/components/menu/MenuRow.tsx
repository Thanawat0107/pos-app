import { FlatList, StyleSheet, View } from 'react-native'
import React, {  } from 'react'
import { SIZES } from '../../helpers/themes';
import MenuCard from './MenuCard';
const mockMenus = [
  {
    id: 1,
    name: "Pizza Margherita",
    category: "Pizza",
    price: 14.5,
    imageUrl: "https://i.imgur.com/1bX5QH6.png",
  },
  {
    id: 2,
    name: "Grilled Chicken",
    category: "Meat",
    price: 18.9,
    imageUrl: "https://i.imgur.com/o6wX9uU.png",
  },
  {
    id: 3,
    name: "Fish & Chips",
    category: "Fish",
    price: 12.0,
    imageUrl: "https://i.imgur.com/YqFgXTi.png",
  },
];

const MenuRow = () => {
  return (
    <View style={styles.menuGrid}>
      <FlatList
        data={mockMenus}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        renderItem={({ item }) => <MenuCard menus={item} />}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ columnGap: SIZES.small }}
      />
    </View>
  );
};

export default MenuRow

const styles = StyleSheet.create({
  menuGrid: { marginTop: SIZES.large },
});