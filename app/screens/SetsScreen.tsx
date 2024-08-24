import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Pressable,
} from "react-native";
import { ApiManager } from "../api/ApiManager";
import { SetLego } from "../api/apiTypes";
import { Grid, GridItem, Image, useToast } from "@chakra-ui/react";
import { Link } from "expo-router";

export default function SetsScreen() {
  const [data, setData] = useState<SetLego[]>([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

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
      toast({
        title: "Sets error",
        description: `Error obtaing datasets, see console for more details`,
        status: "error",
        duration: 9000,
        isClosable: true,
      }); // Chakra toast on error
    } finally {
      setLoading(false); // Set loading to false after fetching data
    }
  };

  useEffect(() => {
    fetchData(); // Fetch data when component mounts
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />; // Show loading indicator while data is being fetched
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
            <Grid templateColumns="repeat(5, 1fr)" gap={4}>
              <GridItem colSpan={4}>
                <View>
                  <Text style={styles.title}>{item.name}</Text>
                  <Text style={styles.subtitle}>
                    Set Number: {item.set_num}
                  </Text>
                  <Text style={styles.subtitle}>
                    Num parts: {item.num_parts}
                  </Text>
                  <Text style={styles.subtitle}>Theme: {item.theme_id}</Text>
                </View>
              </GridItem>
              <GridItem colStart={6} colEnd={6}>
                <Image
                  boxSize="80px"
                  objectFit="cover"
                  src={item.set_img_url}
                  alt={item.name + " image"}
                />
              </GridItem>
            </Grid>
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
  item: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
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
