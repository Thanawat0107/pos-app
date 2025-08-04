import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { styles } from './CartItem.Style';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const CartItem = ({ item }) => {
  return (
    <View style={styles.card}>
      <Image source={item.image} style={styles.image} />

      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>${item.price}</Text>

        <View style={styles.quantityContainer}>
          <TouchableOpacity style={styles.circleBtn}>
            <Text style={styles.circleText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantity}>{item.quantity}</Text>
          <TouchableOpacity style={styles.circleBtn}>
            <Text style={styles.circleText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.deleteBtn}>
        <MaterialCommunityIcons
          name="delete-sweep-outline"
          size={24}
          color="black"
        />
      </TouchableOpacity>
    </View>
  );
};

export default CartItem