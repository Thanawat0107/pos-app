import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const FilterSortBar = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button}>
        <MaterialIcons name="filter-list" size={20} color="#f44336" />
        <Text style={styles.text}>Filter</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <MaterialIcons name="sort" size={20} color="#f44336" />
        <Text style={styles.text}>Sort</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FilterSortBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#fbe9e7',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 6,
    alignItems: 'center',
  },
  text: {
    marginLeft: 6,
    color: '#f44336',
    fontWeight: '600',
  },
});
