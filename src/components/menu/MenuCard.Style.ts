import { StyleSheet } from 'react-native';
import { hp, wp } from '../../helpers/common';
import { COLORS, SIZES } from '../../helpers/themes';
import { isIOS } from '../../helpers/SD';

export const styles = StyleSheet.create({
  container: {
    width: wp(50),
    marginEnd: wp(1),
    backgroundColor: COLORS.light_red,
    borderRadius: SIZES.medium,
  },

  imageWepper: {
    borderRadius: SIZES.medium,
    backgroundColor: COLORS.grayBy,
    marginTop: 5,
    marginHorizontal: 5,
    overflow: "hidden",
  },
  menuImage: {
    width: "100%",
    height: isIOS ? hp(18) : hp(15),
    borderRadius: SIZES.medium,
    resizeMode: "cover",
  },
  contentContainer: {
    padding: SIZES.small,
  },
  menuName: {
    color: "#444444",
    fontSize: SIZES.large,
    fontFamily: "bold",
    marginBottom: 2,
  },
  categoty: {
    color: "#737373",
    fontFamily: "regular",
    fontSize: SIZES.small,
  },
  menuPrice: {
    fontSize: SIZES.large,
    color: COLORS.red_orange,
    fontFamily: "medium",
  },
  addBtn: {
    position: "absolute",
    bottom: SIZES.xSmall,
    right: SIZES.xSmall,
  },
});
