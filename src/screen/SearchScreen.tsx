import { StyleSheet, SafeAreaView, TextInput, TouchableOpacity, View } from 'react-native'
import { StatusBar } from "expo-status-bar";
import React, { useState } from 'react'
import { Ionicons, Feather } from '@expo/vector-icons';
import { isIOS } from '../helpers/SD';
import { COLORS, SIZES } from '../helpers/themes';

const SearchScreen = () => {
  const [searchKey, setSearchKey] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = () => {
    try {
      
    } catch (error) {

    }
  }

  return (
    <>
      <StatusBar style="auto" />
      <SafeAreaView style={styles.container}>
        <View style={styles.searchContainer}>
          <TouchableOpacity>
            <Ionicons
              name="camera-outline"
              size={SIZES.xLarge}
              style={styles.searchIcon}
            />
          </TouchableOpacity>
          <View style={styles.searchWrapper}>
            <TextInput
              placeholder="What are you looking for"
              style={styles.textInput}
              value={searchKey}
              onChangeText={setSearchKey}
            />
          </View>
          <View>
            <TouchableOpacity style={styles.searchBtn} onPress={() => handleSearch()}>
              <Feather name="search" size={24} color={COLORS.offwhite} />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}

export default SearchScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: SIZES.small,
    marginTop: SIZES.xsLarge,
    marginBottom: isIOS ? 45 : 70,
  },
  searchContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.while,
    borderRadius: SIZES.medium,
    marginVertical: SIZES.medium,
    height: 50,
  },
  searchIcon: {
    marginHorizontal: 10,
    color: COLORS.gray,
  },
  searchWrapper: {
    flex: 1,
    backgroundColor: COLORS.while,
    marginRight: SIZES.small,
    borderRadius: SIZES.small,
  },
  textInput: {
    fontFamily: "regular",
    width: "100%",
    height: "100%",
    paddingHorizontal: SIZES.small,
    fontSize: 14,
  },
  searchBtn: {
    width: 45,
    height: "90%",
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.gray2,
  },
});