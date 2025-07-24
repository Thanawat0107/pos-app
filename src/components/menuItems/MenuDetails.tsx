import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { styles } from './MenuDetails.Style'
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../navigators/navigation';
import { useAppNavigation } from '../../hooks/useAppNavigation';
import { Ionicons, SimpleLineIcons, MaterialCommunityIcons, Fontisto } from '@expo/vector-icons';
import { COLORS, SIZES } from '../../helpers/themes';
import { useGetMenuByIdQuery } from '../../services/menuItemApi';
import Loading from '../Loading';
import Error from '../Error';

type MenuDetailsRouteProp = RouteProp<RootStackParamList, "MenuDetails">;

const MenuDetails = () => {
  const route = useRoute<MenuDetailsRouteProp>();
  const { menuId } = route.params;
  const navigation = useAppNavigation();

  const { data: menu, isLoading, isError } = useGetMenuByIdQuery(menuId);

  const [count, setCount] = useState(1);
  const increment = () => setCount((prev) => prev + 1);
  const decrement = () => setCount((prev) => (prev > 1 ? prev - 1 : prev));

    if (isLoading) return <Loading />;
    if (isError || !menu) return <Error />;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.upperRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back-circle" size={30} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {}}>
          <Ionicons name="heart" size={30} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <View style={styles.imageWepper}>
        <Image
          source={{ uri: `${menu.imageUrl}` }}
          style={styles.productImage}
        />
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>{menu.name}</Text>
          <View style={styles.priceWrapper}>
            <Text style={styles.price}>$ {menu.basePrice}</Text>
          </View>
        </View>

        <View style={styles.ratingRow}>
          <View style={styles.rating}>
            {[1, 2, 3, 4, 5].map((index) => (
              <Ionicons key={index} name="star" size={24} color="gold" />
            ))}
            <Text style={styles.ratingText}>(4.9)</Text>
          </View>

          <View style={styles.rating}>
            <TouchableOpacity onPress={() => decrement()}>
              <SimpleLineIcons name="minus" size={20} />
            </TouchableOpacity>

            <Text style={styles.ratingText}>{count}</Text>

            <TouchableOpacity onPress={() => increment()}>
              <SimpleLineIcons name="plus" size={20} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.descriptionWrapper}>
          <Text style={styles.description}>คำอธิบาย</Text>
          <Text style={styles.descText}>{menu.description}</Text>
        </View>

        <View style={styles.cartRow}>
          <TouchableOpacity onPress={() => {}} style={styles.cartBtn}>
            <Text style={styles.cartTitle}>BUY NOW </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {}} style={styles.addCart}>
            <Fontisto name="shopping-bag" size={22} color={COLORS.lightWhite} />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default MenuDetails