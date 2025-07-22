import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { styles } from './CategotyCard.Style';
import { MenuCategory } from '../../@types/dto/MenuCategory';
import { COLORS, SIZES } from '../../helpers/themes';

interface Props {
  item: MenuCategory;
}

const categoryIcons: { [key: string]: any } = {
  Pizza: require("../../../assets/images/mango.png"),
  Meat: require("../../../assets/images/mango.png"),
  Fish: require("../../../assets/images/mango.png"),
  Soupe: require("../../../assets/images/mango.png"),
  Drink: require("../../../assets/images/mango.png"),
  Default: require("../../../assets/images/mango.png"),
};

const CategotyCard = ({ item }: Props) => {
    const icon = categoryIcons[item.name] || categoryIcons.Default;
  return (
    <TouchableOpacity
      onPress={() => console.log(item.name)}
      style={styles.container}
    >
      <View style={styles.imageIcon}>
        <Image source={icon} style={styles.icon} resizeMode="contain" />
      </View>
      <Text style={styles.title}>{item.name}</Text>
    </TouchableOpacity>
  );
};

export default CategotyCard