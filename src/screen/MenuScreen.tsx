import React from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import MenuList from '../components/menu/MenuList'

const MenuScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <MenuList />
    </SafeAreaView>
  );
}

export default MenuScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});