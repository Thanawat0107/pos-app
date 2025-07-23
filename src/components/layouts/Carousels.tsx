import React from 'react';
import { View, Dimensions, Image, StyleSheet } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { hp, wp } from '../../helpers/common';

const banners = [
  require('../../../assets/images/carrot love.jpg'),
  require('../../../assets/images/hakka noodles.jpg'),
  require('../../../assets/images/paneer tikka.jpg'),
];

const Carousels = () => (
  <View style={styles.wrapper}>
    <Carousel
      width={wp(90)}
      height={hp(20)}
      data={banners}
      autoPlay
      autoPlayInterval={3000}
      scrollAnimationDuration={800}
      renderItem={({ item }) => (
        <Image source={item} style={styles.image} resizeMode="cover" />
      )}
      mode="parallax"
      modeConfig={{
        parallaxScrollingOffset: 50,
        parallaxScrollingScale: 0.9,
      }}
    />
  </View>
);

export default Carousels;

const styles = StyleSheet.create({
  wrapper: {
    // marginTop: 16,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
});
