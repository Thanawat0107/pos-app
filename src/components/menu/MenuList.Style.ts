import { StyleSheet } from "react-native";
import { SIZES } from "../../helpers/themes";

export const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingTop: SIZES.xxLarge,
    // paddingLeft: SIZES.small / 2,
    // paddingHorizontal: SIZES.small / 4 
  },
  separator: {
    height: 16,
  },
});