import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Pressable,
  Image,
} from "react-native";
import { ApiManager } from "../api/ApiManager";
import { SetLego } from "../api/apiTypes";
import { Link } from "expo-router";
import { useSession } from "@/hooks/ctx";

export default function SetsScreen() {
  const [data, setData] = useState<SetLego[]>([]);
  const [loading, setLoading] = useState(true);
  const {session} = useSession();

  // Function to fetch data from the API
  const fetchData = async () => {
    try {
      const response = await ApiManager.getPartLists(session as string); //cast session in this context always be a string

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
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Link href={`/screens/SetScreen/${item.set_num}`} asChild>
              <Pressable>
                <View style={styles.row}>
                  <View style={styles.textContainer}>
                    <Text style={styles.title}>{item.name}</Text>
                    <Text style={styles.subtitle}>
                      Set Number: {item.set_num}
                    </Text>
                    <Text style={styles.subtitle}>
                      Num parts: {item.num_parts}
                    </Text>
                    <Text style={styles.subtitle}>
                      Theme: {item.theme_id}
                    </Text>
                  </View>
                  <Image
                    style={styles.image}
                    source={{ uri: item.set_img_url }}
                    resizeMode="cover"
                  />
                </View>
              </Pressable>
            </Link>
          </View>
        )}
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
  item: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textContainer: {
    flex: 4,
  },
  image: {
    width: 80,
    height: 80,
    flex: 1,
    marginLeft: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
  },
});
