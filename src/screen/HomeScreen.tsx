import { ScrollView, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import Navber from "../components/layouts/Navber";
import Welcome from "../components/home/Home";
import CarRow from "../components/menu/MenuRow";
import { useAuth } from "../hooks/useAuth";

const HomeScreen = () => {
  useAuth();

  return (
    <>
      <StatusBar style="auto" />
      <SafeAreaView style={styles.container}>
        <Navber />
        <ScrollView>
          <Welcome />
          <CarRow />
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
