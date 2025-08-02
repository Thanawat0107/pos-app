import { StyleSheet } from "react-native";
import { wp } from "../../helpers/common";
import { COLORS, SIZES } from "../../helpers/themes";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.while,
  },
  upperRow: {
    marginHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    top: SIZES.xxLarge,
    width: SIZES.width - 44,
    zIndex: 999,
  },
  imageWepper: {
    width: wp(100),
    height: wp(100),
    backgroundColor: "#6c757d",
    overflow: "hidden",
  },
  productImage: {
    aspectRatio: 1,
    resizeMode: "cover",
    overflow: "hidden",
  },
  contentContainer: {
    marginTop: -SIZES.large,
    backgroundColor: COLORS.while,
    width: SIZES.width,
    borderTopLeftRadius: SIZES.medium,
    borderTopRightRadius: SIZES.medium,
  },
  titleRow: {
    marginHorizontal: 20,
    paddingBottom: SIZES.small,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: SIZES.width - 44,
    top: 20,
  },
  title: {
    fontFamily: "bold",
    fontSize: SIZES.large,
  },
  ratingRow: {
    paddingBottom: SIZES.small,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: SIZES.width - 10,
    top: 5,
  },
  rating: {
    top: SIZES.large,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginHorizontal: SIZES.large,
  },
  ratingText: {
    color: COLORS.gray,
    fontFamily: "medium",
    paddingHorizontal: SIZES.xSmall,
  },
  priceWrapper: {
    backgroundColor: COLORS.light_red,
    paddingVertical: SIZES.small / 2,
    borderRadius: SIZES.large,
  },
  price: {
    paddingHorizontal: 10,
    fontFamily: "medium",
    fontSize: SIZES.large,
    color: COLORS.red_orange,
  },
  descriptionWrapper: {
    marginTop: SIZES.large * 2,
    marginHorizontal: SIZES.large,
  },
  description: {
    fontFamily: "bold",
    marginBottom: 5,
    fontSize: SIZES.large - 2,
  },
  descText: {
    fontFamily: "regular",
    fontSize: SIZES.small,
    textAlign: "justify",
    marginBottom: SIZES.small,
  },
  test: {
    marginHorizontal: SIZES.large,
    marginBottom: 10,
  },
  location: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: COLORS.gray2,
    marginHorizontal: 12,
    padding: 5,
    borderRadius: SIZES.large,
  },
  cartRow: {
    paddingBottom: SIZES.xLarge,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: SIZES.width,
  },
  cartBtn: {
    width: wp(90),
    backgroundColor: COLORS.red_orange,
    marginHorizontal: SIZES.large,
    borderRadius: 5,
    padding: SIZES.small / 2,
  },
  cartBtnContent: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: SIZES.medium,
  },
  leftBox: {
    flex: 2,
    justifyContent: "center",
    margin: "auto",
    // alignItems: "center",
    height: 40,
  },
  rightBox: {
    flex: 1,
    justifyContent: "center",
    margin: "auto",
    // alignItems: "center",
    height: 40,
  },
  divider: {
    width: 1,
    height: "60%", // หรือ 25-30 ก็ได้
    backgroundColor: COLORS.while,
  },
  cartTitle: {
    fontFamily: "boold",
    fontSize: SIZES.large,
    color: COLORS.while,
    textAlign: "center",
  },
  addCartText: {
    color: "white",
    fontFamily: "medium",
    fontSize: SIZES.large,
    textAlign: "center",
  },
  optionSection: {
    marginHorizontal: SIZES.large,
    marginTop: SIZES.large,
  },
  optionTitle: {
    fontFamily: "bold",
    fontSize: SIZES.medium,
    marginBottom: 8,
    color: COLORS.primary,
  },
  optionDetail: {
    padding: 10,
    backgroundColor: COLORS.gray2,
    borderRadius: SIZES.small,
    marginBottom: 5,
  },
  optionDetailText: {
    fontFamily: "regular",
    fontSize: SIZES.small,
  },
});
