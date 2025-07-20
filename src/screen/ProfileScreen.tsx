import { StatusBar } from "expo-status-bar"
import { View, Text, StyleSheet } from "react-native"
import ProfileItem from "../components/profile/ProfileItem"

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <ProfileItem />
    </View>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
})