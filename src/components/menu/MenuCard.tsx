import { Text, TouchableOpacity, View, Image } from "react-native";
import React from "react";
import { useAppNavigation } from "../../hooks/useAppNavigation";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../helpers/themes";
import { baseUrl } from "../../helpers/SD";
import { styles } from "./MenuCard.Style";

interface Props {
  menus:{
    id: number;
    name: string;
    category: string;
    price: number;
    imageUrl: string;
  };
}

const MenuCard = ({ menus }: Props) => {
  const navigation = useAppNavigation();

  return (
    <TouchableOpacity onPress={() => {}} style={styles.container}>
      <View style={styles.imageWepper}>
        <Image
          source={{ uri: baseUrl + menus.imageUrl }}
          style={styles.menuImage}
        />
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.menuName} numberOfLines={1}>
          {menus.name}
        </Text>

        <Text style={styles.categoty} numberOfLines={1}>
          {menus.category}
        </Text>

        <Text style={styles.menuPrice} numberOfLines={1}>
         ${menus.price.toFixed(2)}
        </Text>
      </View>
      <TouchableOpacity style={styles.addBtn}>
        <Ionicons name="add-circle" size={35} color={COLORS.red3} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default MenuCard;


