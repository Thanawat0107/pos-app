import { StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../../helpers/themes';
import { hp } from '../../helpers/common';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SIZES.medium,
    paddingBottom: hp(8),
  },
  header: {
    marginTop: hp(5),
    marginBottom: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    marginHorizontal: "auto",
    marginBottom: 10,
  },
  promoContainer: {
    flexDirection: "row",
    marginBottom: 20,
    alignItems: "center",
  },
  promoInput: {
    flex: 1,
    height: 44,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  applyButton: {
    marginLeft: 10,
    backgroundColor: "#eee",
    paddingHorizontal: 16,
    height: 44,
    justifyContent: "center",
    borderRadius: 8,
  },
  applyText: { color: "#333" },
  summary: {
    marginBottom: 16,
  },
  summaryLabel: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 2,
  },
  totalLabel: { fontWeight: "bold", fontSize: 16 },
  totalAmount: { fontWeight: "bold", fontSize: 16 },
  checkoutButton: {
    backgroundColor: COLORS.red_orange,
    borderRadius: 5,
    paddingVertical: 14,
    alignItems: "center",
  },
  checkoutText: { color: "white", fontWeight: "bold", fontSize: 16 },
  cartItemContainer: {
  flexDirection: 'row',
  marginVertical: 10,
  padding: 10,
  borderWidth: 1,
  borderColor: '#ddd',
  borderRadius: 8,
},

cartItemImage: {
  width: 80,
  height: 80,
  borderRadius: 8,
  marginRight: 10,
},

cartItemDetails: {
  flex: 1,
},

optionText: {
  fontSize: 12,
  color: '#555',
},

optionsContainer: {
  marginTop: 4,
},

});