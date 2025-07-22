import { View, Text, FlatList } from 'react-native'
import React from 'react'
import CategotyCard from './CategotyCard';
import { styles } from './CategotyRow.Style';
import Loading from '../Loading';
import Error from '../Error';
import { useGetCategoryAllQuery } from '../../services/menuCategoryApi';

const CategotyRow = () => {
  const {
    data: menuCategories,
    isLoading,
    isError,
  } = useGetCategoryAllQuery({ pageNumber: 1, pageSize: 5 });
  
  if (isLoading) return <Loading />;
  if (isError || !menuCategories) return <Error />;
  
  const categories = menuCategories?.result ?? [];

  return (
    <View style={styles.rowContainer}>
      <FlatList
        horizontal
        data={categories}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <CategotyCard item={item} />}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default CategotyRow