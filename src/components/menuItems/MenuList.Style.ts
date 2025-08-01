import { StyleSheet } from "react-native";
import { SIZES } from "../../helpers/themes";
import { hp } from "../../helpers/common";

export const styles = StyleSheet.create({
  container: {
    paddingBottom: hp(7),
  },
  header: {
    marginTop: 5,
    marginBottom: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    marginHorizontal: "auto",
    marginBottom: 10,
  },
  cardContainer: {
    marginBottom: 15,
  },
  flatListContainer: {
    paddingTop: SIZES.xxLarge,
  },
});