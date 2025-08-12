import { ScrollView, StyleSheet } from "react-native";
import Home from "../components/home/Home";
import { useAuth } from "../hooks/useAuth";

const HomeScreen = () => {
  useAuth();

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Home />
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