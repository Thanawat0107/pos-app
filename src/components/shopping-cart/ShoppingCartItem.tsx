import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { styles } from "./ShoppingCartItem.Style";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { CartItem } from "../../@types/dto/CartItem";
import { useAppDispatch } from "../../hooks/useAppHookState";
import {
  useRemoveCartItemMutation,
  useUpdateCartItemMutation,
} from "../../services/shoppingCartApi";
import {
  removeItem,
  updateQuantity,
  upsertItem,
} from "../../store/slices/shoppingCartSlice";

interface Props {
  item: CartItem;
  cartToken: string;
}

const ShoppingCartItem = ({ item, cartToken }: Props) => {
  const dispatch = useAppDispatch();
  const [updateCartItem] = useUpdateCartItemMutation();
  const [removeCartItem] = useRemoveCartItemMutation();

  const handleIncrease = async () => {
    dispatch(updateQuantity({ id: item.id, delta: 1 })); // local update
    try {
      await updateCartItem({
        data: {
          cartToken,
          cartItemId: item.id,
          quantity: item.quantity + 1,
        },
      }).unwrap();
    } catch (err) {
      dispatch(updateQuantity({ id: item.id, delta: -1 })); // rollback
    }
  };

  const handleDecrease = async () => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ id: item.id, delta: -1 }));
      try {
        await updateCartItem({
          data: {
            cartToken,
            cartItemId: item.id,
            quantity: item.quantity - 1,
          },
        }).unwrap();
      } catch (err) {
        dispatch(updateQuantity({ id: item.id, delta: +1 }));
      }
    } else {
      // ถ้าเหลือ 1 แล้วกดลบ
      dispatch(removeItem(item.id));
      try {
        await removeCartItem({ id: item.id, cartToken }).unwrap();
      } catch (err) {
        dispatch(upsertItem(item)); // rollback
      }
    }
  };

  const handleRemove = async () => {
    dispatch(removeItem(item.id));
    try {
      await removeCartItem({ id: item.id, cartToken }).unwrap();
    } catch (err) {
      dispatch(upsertItem(item)); // rollback
    }
  };
  
  return (
    <View style={styles.card}>
      {item.menuItemImage ? (
        <Image source={{ uri: item.menuItemImage }} style={styles.image} />
      ) : (
        <View style={[styles.image, { backgroundColor: "#eee" }]} />
      )}

      <View style={styles.info}>
        <Text style={styles.name}>{item.menuItemName}</Text>
        <Text style={styles.price}>
          ราคา {item.price.toLocaleString("th-TH")} ฿
        </Text>

        <View style={styles.quantityContainer}>
          <TouchableOpacity style={styles.circleBtn} onPress={handleDecrease}>
            <Text style={styles.circleText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantity}>{item.quantity}</Text>
          <TouchableOpacity style={styles.circleBtn} onPress={handleIncrease}>
            <Text style={styles.circleText}>+</Text>
          </TouchableOpacity>
        </View>

        {item.options?.length > 0 && (
          <View style={{ marginTop: 4 }}>
            {item.options.map((opt) => (
              <Text key={opt.optionId} style={{ fontSize: 14, color: "#555" }}>
                • {opt.optionGroupName}: {opt.optionValueName} (+
                {opt.extraPrice})
              </Text>
            ))}
          </View>
        )}
      </View>

      <TouchableOpacity style={styles.deleteBtn} onPress={handleRemove}>
        <MaterialCommunityIcons
          name="delete-sweep-outline"
          size={24}
          color="black"
        />
      </TouchableOpacity>
    </View>
  );
};

export default ShoppingCartItem;
