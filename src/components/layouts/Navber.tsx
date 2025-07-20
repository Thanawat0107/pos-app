import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { COLORS, SIZES } from "../../helpers/themes";
import { useAppNavigation } from "../../hooks/useAppNavigation";
import { Ionicons } from "@expo/vector-icons";

const Navber = () => {
  const navigation = useAppNavigation();
  return (
    <View style={styles.appBar}>
      <Ionicons name="location-outline" size={30} />
      <Text style={styles.location}> Food Application </Text>
      <View style={{ alignItems: "flex-end" }}>
        <View style={styles.cartCount}>
          <Text style={styles.cartNumber}> 9 </Text>
        </View>
        <TouchableOpacity onPress={() => {}}>
          <Ionicons name="notifications-outline" size={30} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Navber;

const styles = StyleSheet.create({
  textStyle: {
    fontFamily: "bold",
    fontSize: 40,
  },
  appBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    marginBottom: 10,
    marginHorizontal: SIZES.xSmall,
  },
  location: {
    fontFamily: "medium",
    color: COLORS.gray,
  },
  cartCount: {
    position: "absolute",
    bottom: 16,
    width: 16,
    height: 16,
    borderRadius: 8,
    alignItems: "center",
    backgroundColor: COLORS.red,
    justifyContent: "center",
    zIndex: 999,
  },
  cartNumber: {
    fontFamily: "regular",
    fontWeight: "600",
    fontSize: 10,
    color: COLORS.lightWhite,
  },
});
