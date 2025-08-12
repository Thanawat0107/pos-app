import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { styles } from './CartItem.Style';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const CartItem = ({ item }: any) => {
  return (
    <View style={styles.card}>
      {item.menuItemImage ? (
        <Image
          source={{ uri: item.menuItemImage }}
          style={styles.image}
          resizeMode="cover"
        />
      ) : (
        <View style={[styles.image, { backgroundColor: "#eee" }]} />
      )}

      <View style={styles.info}>
        <Text style={styles.name}>{item.menuItemName}</Text>
        <Text style={styles.price}>ราคา {item.price}</Text>

        <View style={styles.quantityContainer}>
          <TouchableOpacity style={styles.circleBtn}>
            <Text style={styles.circleText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantity}>{item.quantity}</Text>
          <TouchableOpacity style={styles.circleBtn}>
            <Text style={styles.circleText}>+</Text>
          </TouchableOpacity>
        </View>

        {item.options.length > 0 && (
          <View style={{ marginTop: 4 }}>
            {item.options.map((opt: any) => (
              <Text key={opt.optionId} style={{ fontSize: 15, color: "#555" }}>
                • {opt.optionGroupName}: {opt.optionValueName} (+
                {opt.extraPrice})
              </Text>
            ))}
          </View>
        )}
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