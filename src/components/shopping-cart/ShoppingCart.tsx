import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import React, { useEffect, useState } from 'react'
import { styles } from './ShoppingCart.Style';
import CartItem from './ShoppingCartItem';
import { useGetCartByTokenQuery } from "../../services/shoppingCartApi";
import { getCartToken } from '../../helpers/cartTokenStorage';

const CTA_HEIGHT = 50; // ความสูงปุ่ม

const ShoppingCart = () => {
  const insets = useSafeAreaInsets();
  const tabBarHeight = useBottomTabBarHeight(); // สูงของ BottomTab
   // เผื่อพื้นที่ให้รายการ ไม่ให้โดนปุ่มทับ
  const listPaddingBottom = CTA_HEIGHT + tabBarHeight + insets.bottom + 36;

  const [cartToken, setCartToken] = useState<string>("");

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
    refetch,
    isFetching,
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
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <FlatList
        data={cart}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <CartItem item={item} cartToken={cartToken} />}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.title}>ตะกร้าสินค้า</Text>
          </View>
        }
        ListFooterComponent={
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
        }
        refreshing={isFetching}
        onRefresh={refetch}
        // ใช้ styles.container เดิม + เติม paddingBottom ทับลงไป
        contentContainerStyle={[
          styles.container,
          { paddingBottom: listPaddingBottom },
        ]}
        showsVerticalScrollIndicator={false}
      />

      {/* แถบล่าง: ใช้ stickyBar เดิม + ใส่ตำแหน่งให้ลอยเหนือแท็บ */}
      <View
        style={[
          styles.stickyBar,
          {
            position: "absolute",
            left: 0,
            right: 0,
            bottom: tabBarHeight, // ยกขึ้นเหนือ BottomTab
            paddingBottom: insets.bottom + 8,
          },
        ]}
      >
        <View style={[styles.row, { marginBottom: 8 }]}>
          <Text style={styles.totalLabel}>ทั้งหมด</Text>
          <Text style={styles.totalAmount}>ราคา {totalAmount}</Text>
        </View>

        <TouchableOpacity
          style={[styles.checkoutButton, { height: CTA_HEIGHT }]}
        >
          <Text style={styles.checkoutText}>สั่งออเดอร์</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ShoppingCart
