import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, FlatList, Pressable } from "react-native";
import {
  ChakraProvider,
  Grid,
  GridItem,
  Image,
  Text,
  useToast,
} from "@chakra-ui/react";
import { Link, useLocalSearchParams } from "expo-router";
import { ApiManager } from "@/app/api/ApiManager";
import { Part, PartLego } from "@/app/api/apiTypes";
import ModalAddPartToSet from "@/components/ModalAddPartToSet";
import { stylesList } from "@/constants/StyleList";
import ItemListPart from "@/components/ItemListPart";

export default function SetsScreen() {
  const local = useLocalSearchParams<{ set_num: string }>();
  const [data, setData] = useState<PartLego[]>([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  //Added Part state
  const [addedPartList, setAddedPartList] = useState<Part[]>([]);

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

  const removeItem = (itemToRemove: Part) => {
    setAddedPartList((prevItems) => {
      return prevItems.filter(
        (item) => itemToRemove.part_num !== item.part_num
      );
    });
  };

  useEffect(() => {
    fetchData(); // Fetch data when component mounts
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />; // Show loading indicator while data is being fetched
  }

  return (
    <ChakraProvider>
      <View style={stylesList.container}>
        <ModalAddPartToSet setAddedPartList={setAddedPartList} />
        <Text fontSize="1.5em"> Added Parts </Text>
        <FlatList
          data={addedPartList}
          keyExtractor={(item) => String(item.part_cat_id)}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => {
                removeItem(item);
              }}
            >
              <ItemListPart item={item} />
            </Pressable>
          )}
        />
        <Text fontSize="1.5em"> Parts of the piece </Text>
        <FlatList
          data={data}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <View style={stylesList.item}>
              <Grid templateColumns="repeat(5, 1fr)" gap={4}>
                <GridItem colSpan={4}>
                  <View>
                    <Text style={stylesList.title}>{item.part.name}</Text>
                    <Text style={stylesList.subtitle}>
                      Quantity: {item.quantity}
                    </Text>
                    <Text style={stylesList.subtitle}>
                      Is Spare: {item.is_spare ? "Yes" : "No"}
                    </Text>
                    <Text style={stylesList.subtitle}>
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
    </ChakraProvider>
  );
}
