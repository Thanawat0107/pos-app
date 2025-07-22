import { View, StyleSheet, ScrollView } from "react-native";
import React from "react";
import Carousels from "../layouts/Carousels";
import Headings from "../layouts/Headings";
import Search from "../Search";
import MenuRow from "../menu/MenuRow";
import CategotyRow from "../menuCategories/CategotyRow";

const Home = () => {
  return (
    <View style={styles.container}>
      <Search />
      <Headings title="ข้อเสนอพิเศษ" />
      <Carousels />
      <CategotyRow />
      <Headings title="เมนูแนะนำ" />
      <MenuRow />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
});
