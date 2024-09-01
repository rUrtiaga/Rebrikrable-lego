import React, { useEffect, useState } from "react";
import {
  View,
  ActivityIndicator,
  FlatList,
  StyleSheet,
} from "react-native";
import { ApiManager } from "../api/ApiManager";
import { SetLego } from "../api/apiTypes";
import ItemListSet from "@/components/ItemListSet";

export default function SetsScreen() {
  const [data, setData] = useState<SetLego[]>([]);
  const [loading, setLoading] = useState(true);

  // Function to fetch data from the API
  const fetchData = async () => {
    try {
      const response = await ApiManager.getSets();

      if (!response.ok) {
        // Handle errors if response is not ok
        throw new Error("Network response was not ok");
      }

      const json = await response.json(); // Parse JSON response
      setData(json.results); // Update state with the data received
    } catch (error) {
      console.error("Error fetching data:", error);
      // Display an alert instead of toast
      alert("Error obtaining datasets. See console for more details.");
    } finally {
      setLoading(false); // Set loading to false after fetching data
    }
  };

  useEffect(() => {
    fetchData(); // Fetch data when component mounts
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    ); // Show loading indicator while data is being fetched
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => String(item.set_num)}
        renderItem={({ item }) => <ItemListSet item={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
