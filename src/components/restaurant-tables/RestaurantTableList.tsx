import { View, Text, FlatList } from 'react-native'
import React from 'react'
import RestaurantTableCard from './RestaurantTableCard';
import { styles } from './RestaurantTableList.Style';

const tables = [
  { id: 1, number: 1, status: 'available', seats: 4 },
  { id: 2, number: 2, status: 'occupied', seats: 2 },
  { id: 3, number: 3, status: 'reserved', seats: 6 },
  { id: 4, number: 4, status: 'available', seats: 4 },
  // เพิ่มรายการได้ตามต้องการ
];

const RestaurantTableList = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={tables}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.title}>รายการโต๊ะ</Text>
          </View>
        }
        renderItem={({ item }) => (
          <RestaurantTableCard
            tableNumber={item.number}
            status={item.status as "available" | "occupied" | "reserved"}
            seats={item.seats}
            onPress={() => console.log("กดโต๊ะหมายเลข", item.number)}
          />
        )}
      />
    </View>
  );
};

export default RestaurantTableList;