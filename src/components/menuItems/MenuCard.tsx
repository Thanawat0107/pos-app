import { Text, TouchableOpacity, View, Image } from "react-native";
import React from "react";
import { useAppNavigation } from "../../hooks/useAppNavigation";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../helpers/themes";
import { baseUrl } from "../../helpers/SD";
import { styles } from "./MenuCard.Style";
import { MenuItem } from "../../@types/dto/MenuItem";

interface Props {
  menuItems: MenuItem;
}

const MenuCard = ({ menuItems }: Props) => {
  const navigation = useAppNavigation();

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("MenuDetails", { menuId: menuItems.id })
      }
      style={styles.container}
    >
      <View style={styles.imageWepper}>
        <Image
          source={{ uri: baseUrl + menuItems.imageUrl }}
          style={styles.menuImage}
        />
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.menuName} numberOfLines={1}>
          {menuItems.name}
        </Text>

        <Text style={styles.categoty} numberOfLines={1}>
          {menuItems.menuCategoryName}
        </Text>

        <Text style={styles.menuPrice} numberOfLines={1}>
          ${menuItems.basePrice.toFixed(2)}
        </Text>
      </View>
      <TouchableOpacity style={styles.addBtn}>
        <Ionicons name="add-circle" size={35} color={COLORS.red3} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default MenuCard;


