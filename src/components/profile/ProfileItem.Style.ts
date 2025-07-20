import { StyleSheet } from "react-native";
import { hp } from "../../helpers/common";
import { COLORS, SIZES } from "../../helpers/themes";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: hp(5),
    padding: SIZES.small,
  },
  profileBox: {
    backgroundColor: COLORS.light_red,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    marginBottom: 20,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontWeight: "bold",
    fontSize: 16,
  },
  profileEmail: {
    color: "gray",
    fontSize: 14,
  },
  editIcon: {
    padding: 4,
  },
  menuProfile: {
    backgroundColor: COLORS.light_red,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    marginBottom: 10,
  },
  menuLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuText: {
    marginLeft: 12,
    fontSize: 16,
  },
});