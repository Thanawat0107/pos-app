import { StyleSheet } from "react-native";
import { SIZES } from "../../helpers/themes";

export const styles = StyleSheet.create({
  container: {
    // marginBottom: -themes.THEME.sizes.xSmall,
    // marginHorizontal: 12,
  },
  header: {
    flexDirection: "row",
     justifyContent: "space-between",
  },
  headerTitle: {
    fontFamily: "medium",
    fontSize: SIZES.xLarge -2,
  },
});