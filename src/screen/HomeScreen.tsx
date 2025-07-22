import { ScrollView, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import Navber from "../components/layouts/Navber";
import Home from "../components/home/Home";
import { useAuth } from "../hooks/useAuth";
import MenuRow from "../components/menu/MenuRow";
import CategotyRow from "../components/menuCategories/CategotyRow";

const HomeScreen = () => {
  useAuth();

  return (
    <>
      <StatusBar style="auto" />
      <SafeAreaView style={styles.container}>
        <Navber />
        <ScrollView showsVerticalScrollIndicator={false}>
          <Home />
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
