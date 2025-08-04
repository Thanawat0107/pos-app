import { View, Text, FlatList, TextInput, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native'
import React from 'react'
import { styles } from './ShoppingCart.Style';
import CartItem from './CartItem';

const ShoppingCart = () => {
   const cartItems = [
    { id: '1', name: 'Grill Steak', price: 55, quantity: 4, image: require('../../../assets/images/carrot love.jpg') },
    { id: '2', name: 'Beef Burger', price: 45, quantity: 2, image: require('../../../assets/images/hakka noodles.jpg') }
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const fees = 55;
  const total = subtotal + fees;

  return (
    <ScrollView style={styles.container}>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <CartItem item={item} />}
        scrollEnabled={false}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.title}>ShoppingCart</Text>
          </View>
        }
      />

      <View style={styles.summary}>
        <Text style={styles.summaryLabel}>Order Summary</Text>

        <View style={styles.row}>
          <Text>Subtotal ({cartItems.length})</Text>
          <Text>EGP {subtotal}</Text>
        </View>

        <View style={styles.row}>
          <Text>Fees</Text>
          <Text>EGP {fees}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalAmount}>EGP {total}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.checkoutButton}>
        <Text style={styles.checkoutText}>Checkout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

export default ShoppingCart