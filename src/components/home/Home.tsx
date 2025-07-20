import { View, StyleSheet, ScrollView } from "react-native";
import React from "react";
import Carousels from "../layouts/Carousels";
import Headings from "../layouts/Headings";
import Search from "../Search";
import MenuRow from "../menu/MenuRow";

const Home = () => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Search />
      <Headings title="Special Offers" />
      <Carousels />
      <Headings title="Top Seller" />
      <MenuRow />
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
});
