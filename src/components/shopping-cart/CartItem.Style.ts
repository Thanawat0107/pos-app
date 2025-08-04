import{ StyleSheet } from 'react-native';
import { hp, wp } from '../../helpers/common';
import { COLORS, SIZES } from '../../helpers/themes';

export const styles = StyleSheet.create({
 card: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: SIZES.xSmall,
    padding: SIZES.xSmall,
    marginBottom: SIZES.xSmall,
    position: 'relative',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: SIZES.xSmall,
  },
  image: {
    width: wp(33),
    height: hp(13),
    borderRadius: 5,
  },
  info: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'space-between',
  },
  name: {
    fontWeight: '600',
    fontSize: 16,
  },
  price: {
    color: '#333',
    marginBottom: 5,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  circleBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#fcecec',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleText: {
    fontSize: 16,
    color: 'red',
  },
  quantity: {
    marginHorizontal: 12,
    fontSize: 16,
  },
  deleteBtn: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
});