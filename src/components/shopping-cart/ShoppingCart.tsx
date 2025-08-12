import { View, Text, FlatList, TouchableOpacity, ScrollView, ActivityIndicator, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { styles } from './ShoppingCart.Style';
import CartItem from './CartItem';
import { useGetCartByTokenQuery } from "../../services/shoppingCartApi";
import { getCartToken } from '../../helpers/cartTokenStorage';

const ShoppingCart = () => {
  const [cartToken, setCartToken] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const token = await getCartToken();
      setCartToken(token);
    })();
  }, []);

  const {
    data: cart,
    isLoading,
    error,
  } = useGetCartByTokenQuery(cartToken, {
    skip: !cartToken,
  });
  if (isLoading) {
    return (
      <ActivityIndicator size="large" color="#000" style={{ marginTop: 20 }} />
    );
  }

  if (error || !cart) {
    return (
      <Text style={{ textAlign: "center", marginTop: 20 }}>
        ไม่สามารถโหลดตะกร้าได้
      </Text>
    );
  }

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const extraTotal = cart.reduce((sum, item) => sum + item.extraTotal, 0);
  const totalAmount = subtotal + extraTotal;

  return (
    <ScrollView style={styles.container}>
      <FlatList
        data={cart}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <CartItem item={item} />}
        scrollEnabled={false}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.title}>ตะกร้าสินค้า</Text>
          </View>
        }
      />

      <View style={styles.summary}>
        <Text style={styles.summaryLabel}>สรุปคำสั่งซื้อ</Text>

        <View style={styles.row}>
          <Text>รวมย่อย</Text>
          <Text>ราคา {subtotal}</Text>
        </View>
        <View style={styles.row}>
          <Text>ส่วนเสริม</Text>
          <Text>ราคา {extraTotal}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.totalLabel}>ทั้งหมด</Text>
          <Text style={styles.totalAmount}>ราคา {totalAmount}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.checkoutButton}>
        <Text style={styles.checkoutText}>สั่งออเดอร์</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ShoppingCart
