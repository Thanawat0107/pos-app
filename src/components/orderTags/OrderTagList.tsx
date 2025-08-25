import { ActivityIndicator, FlatList, Text, View } from 'react-native'
import React from 'react'
import { useGetOrderTagAllQuery } from '../../services/orderTagApi';
import { styles } from './OrderTagList.Style';
import OrderTagItem from './OrderTagItem';
import { COLORS, SIZES } from '../../helpers/themes';

const OrderTagList = () => {
  const { data, error, isLoading } = useGetOrderTagAllQuery(null);

  if (isLoading) {
    return (
       <View style={styles.center}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

   if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>เกิดข้อผิดพลาดในการโหลดข้อมูล</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        numColumns={2}
        contentContainerStyle={{ paddingTop: SIZES.xsLarge }}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <OrderTagItem item={item} />}
      />
    </View>
  );
};

export default OrderTagList;