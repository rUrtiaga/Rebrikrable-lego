import { StyleSheet } from "react-native";
import { Colors } from "./Colors";

export const stylesList = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      justifyContent: "center",
      paddingHorizontal: 20,
    },
    item: {
      padding: 20,
      borderBottomWidth: 2,
      borderBottomColor: Colors.blue,
    },
    title: {
      fontSize: 18,
      fontWeight: "bold",
      color: Colors.blue,
      fontFamily: "SpaceMono"
    },
    subtitle: {
      fontSize: 13,
      color: Colors.blue,
      fontFamily: "SpaceMono"
    },
    gridContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    gridItem: {
      flex: 4, // Occupies the first 4/5ths of the grid
    },
    imageContainer: {
      flex: 1, // Occupies the last 1/5th of the grid
      alignItems: "center",
    },
    image: {
      width: 80,
      height: 80,
      resizeMode: "contain",
    },
  });
  