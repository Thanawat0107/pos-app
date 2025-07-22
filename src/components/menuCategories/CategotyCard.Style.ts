import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../helpers/themes";
import { hp } from "../../helpers/common";

export const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginRight: SIZES.medium,
  },
  icon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#fcefe7",
    padding: 8,
  },
  imageIcon: {
    backgroundColor: COLORS.light_red,
    padding: SIZES.xSmall,
    borderRadius: SIZES.xSmall,
  },
  title: {
    marginTop: hp(1),
    fontFamily: "regular",
    fontSize: SIZES.small,
    color: COLORS.black,
  },
});
