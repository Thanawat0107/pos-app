import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import React from "react";
import { useAppNavigation } from "../../hooks/useAppNavigation";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SIZES } from "../../helpers/themes";
import { hp, wp } from "../../helpers/common";
import { baseUrl, isIOS } from "../../helpers/SD";

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

const styles = StyleSheet.create({
  container: {
    width: wp(50),
    marginEnd: wp(1),
    backgroundColor: COLORS.light_red,
    borderRadius: SIZES.medium,
  },

  imageWepper: {
    borderRadius: SIZES.medium,
    backgroundColor: COLORS.grayBy,
    marginTop: 5,
    marginHorizontal: 5,
    overflow: "hidden",
  },
  menuImage: {
    width: "100%",
    height: isIOS ? hp(18) : hp(15),
    borderRadius: SIZES.medium,
    resizeMode: "cover",
  },
  contentContainer: {
    padding: SIZES.small,
  },
  menuName: {
    color: "#444444",
    fontSize: SIZES.large,
    fontFamily: "bold",
    marginBottom: 2,
  },
  categoty: {
    color: "#737373",
    fontFamily: "regular",
    fontSize: SIZES.small,
  },
  menuPrice: {
    fontSize: SIZES.large,
    color: COLORS.red_orange,
    fontFamily: "medium",
  },
  addBtn: {
    position: "absolute",
    bottom: SIZES.xSmall,
    right: SIZES.xSmall,
  },
});
