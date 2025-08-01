import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { useAppNavigation } from '../../hooks/useAppNavigation';
import { COLORS, SIZES } from '../../helpers/themes';

interface Props {
  title?: string;
}

const Headings = ({ title = "New Rivals" }: Props) => {
  const navigation = useAppNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{title}</Text>
        <TouchableOpacity onPress={() => {}}>
            <Ionicons name='grid' size={24} color={COLORS.primary} />
            {/* <Text style={styles.titleRight}>ดูทั้งหมด</Text> */}
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Headings

const styles = StyleSheet.create({
  container: {
    // marginHorizontal: SIZES.small,
  },
  header: {
    flexDirection: "row",
     justifyContent: "space-between",
  },
  headerTitle: {
    fontFamily: "bold",
    fontSize: SIZES.xLarge -2,
  },
  titleRight: {
    fontFamily: "regular",
    fontSize: SIZES.medium,
    color: COLORS.primary,
  },
});