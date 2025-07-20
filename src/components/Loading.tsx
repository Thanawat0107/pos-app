import React from "react";
import { Text, View, ActivityIndicator, StyleSheet } from "react-native";
import { COLORS } from "../helpers/themes";

const Loading = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={COLORS.red_orange} />
      <Text>Font loading...</Text>
    </View>
  );
}
export default Loading

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
