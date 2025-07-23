import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Home from "../components/home/Home";
import { useAuth } from "../hooks/useAuth";

const HomeScreen = () => {
  useAuth();

  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <Home />
      </SafeAreaView>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
