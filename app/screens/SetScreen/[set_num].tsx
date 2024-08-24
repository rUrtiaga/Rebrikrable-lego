import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Pressable,
} from "react-native";
import { Grid, GridItem, Image, useToast } from "@chakra-ui/react";
import { Link, useLocalSearchParams } from "expo-router";
import { ApiManager } from "@/app/api/ApiManager";
import { PartLego } from "@/app/api/apiTypes";

export default function SetsScreen() {
  const local = useLocalSearchParams<{ set_num: string }>();
  const [data, setData] = useState<PartLego[]>([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  // Function to fetch data from the API
  const fetchData = async () => {
    try {
      const response = await ApiManager.getSetParts(local.set_num);

      if (!response.ok) {
        // Handle errors if response is not ok
        throw new Error("Network response was not ok");
      }

      const json = await response.json(); // Parse JSON response
      setData(json.results); // Update state with the data received
    } catch (error) {
      console.error("Error fetching data:", error);
      toast({
        title: "Set error",
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
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Grid templateColumns="repeat(5, 1fr)" gap={4}>
              <GridItem colSpan={4}>
                <View>
                  <Text style={styles.title}>{item.part.name}</Text>
                  <Text style={styles.subtitle}>Quantity: {item.quantity}</Text>
                  <Text style={styles.subtitle}>
                    Is Spare: {item.is_spare ? "Yes" : "No"}
                  </Text>
                  <Text style={styles.subtitle}>
                    Element ID: {item.element_id}
                  </Text>
                </View>
              </GridItem>
              <GridItem colStart={6} colEnd={6}>
                <Image
                  boxSize="80px"
                  objectFit="cover"
                  src={item.part.part_img_url}
                  alt={item.part.name + " image"}
                />
              </GridItem>
            </Grid>
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
