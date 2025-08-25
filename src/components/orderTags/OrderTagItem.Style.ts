import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
   container: {
    flex: 1, // ให้กินครึ่งนึงของแถว
    padding: 8, // เว้นระหว่าง card
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  tag: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 6,
    color: "#333",
  },
  qrContainer: {
    alignItems: "center",
    marginVertical: 10,
  },
  url: {
    color: "#1e90ff",
    textDecorationLine: "underline",
    fontSize: 12,
    marginBottom: 6,
    textAlign: "center",
  },
  date: {
    color: "#777",
    fontSize: 10,
    textAlign: "center",
  },
});