import { View, StyleSheet, Text } from "react-native";
import React from "react";
import Carousels from "../layouts/Carousels";
import Headings from "../layouts/Headings";
import SearchBar from "../SearchBar";
import MenuRow from "../menuItems/MenuRow";
import CategotyRow from "../menuCategories/CategotyRow";
import { COLORS, SIZES } from "../../helpers/themes";
import Navber from "../layouts/Navber";
import { hp } from "../../helpers/common";

const Home = () => {
  return (
    <View style={styles.container}>
      <Navber />
      <Text style={welcomeText(COLORS.red_orange, 0)}>
        ร้านอาหารขนาดเล็ก
      </Text>
      <Text style={welcomeText(COLORS.tertiary, 0)}>ยินดีต้อนรับ</Text>
      <SearchBar />
      <Headings title="ข้อเสนอพิเศษ" />
      <Carousels />
      <CategotyRow />
      <Headings title="เมนูแนะนำ" />
      <MenuRow />
    </View>
  );
};

export default Home;

const welcomeText = (color: string, top: number = 0) => ({
  fontFamily: "bold",
  fontSize: SIZES.xxLarge - 6,
  marginTop: top,
  color: color,
});

const styles = StyleSheet.create({
  container: {
    marginHorizontal: SIZES.small,
    paddingTop: hp(5),
    paddingBottom: hp(10),
  },
});
