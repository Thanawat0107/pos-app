import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ShoppingCart from '../components/shopping-cart/ShoppingCart'

const ShoppingCartScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ShoppingCart />
    </SafeAreaView>
  );
}

export default ShoppingCartScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});