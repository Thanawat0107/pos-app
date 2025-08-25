import { View, Text, TouchableOpacity, Linking } from 'react-native'
import React from 'react'
import { OrderTagEntity } from '../../@types/dto/OrderTagEntity';
import { styles } from './OrderTagItem.Style';
import { SvgXml } from "react-native-svg";

interface Props {
  item: OrderTagEntity;
}

const OrderTagItem = ({item}: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.tag}>โต๊ะ: {item.tag}</Text>

        <View style={styles.qrContainer}>
          <SvgXml xml={item.qrSvg} width={200} height={200} />
        </View>

        <TouchableOpacity onPress={() => Linking.openURL(item.qrUrl)}>
          <Text style={styles.url}>{item.qrUrl}</Text>
        </TouchableOpacity>

        <Text style={styles.date}>
          สร้างเมื่อ: {new Date(item.createdAt).toLocaleString()}
        </Text>
      </View>
    </View>
  );
}

export default OrderTagItem