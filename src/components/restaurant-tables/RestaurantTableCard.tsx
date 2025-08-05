import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { styles } from './RestaurantTableCard.Style';

interface Props {
  tableNumber: number;
  status: 'available' | 'occupied' | 'reserved';
  seats: number;
  onPress?: () => void;
}

const statusColors = {
  available: '#4CAF50',
  occupied: '#F44336',
  reserved: '#FF9800',
};

const RestaurantTableCard = ({ tableNumber, status, seats, onPress }: Props) => {
  return (
     <TouchableOpacity onPress={onPress} style={[styles.card, { borderColor: statusColors[status] }]}>
      <Text style={styles.tableNumber}>โต๊ะ {tableNumber}</Text>
      <Text style={{ color: statusColors[status], fontWeight: 'bold' }}>
        {status === 'available' ? 'ว่าง' : status === 'occupied' ? 'ใช้งานอยู่' : 'จองแล้ว'}
      </Text>
      <Text style={styles.seats}>{seats} ที่นั่ง</Text>
    </TouchableOpacity>
  )
}

export default RestaurantTableCard