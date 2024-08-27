import React, { useEffect, useState } from "react";
import {
  View,
  ActivityIndicator,
  FlatList,
  Pressable,
  Text,
  Image,
  StyleSheet,
  Alert,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { ApiManager } from "@/app/api/ApiManager";
import { Part, PartLego, PartPost } from "@/app/api/apiTypes";
import ModalAddPartToSet from "@/components/ModalAddPartToSet";
import { stylesList } from "@/constants/StyleList";
import ItemListPart from "@/components/ItemListPart";
import { Button } from "@/components/Button";
import { useSession } from "@/hooks/ctx";

export default function SetsScreen() {
  const local = useLocalSearchParams<{ partlist_num: string }>();
  const [data, setData] = useState<PartLego[]>([]);
  const [loading, setLoading] = useState(true);

  const { session } = useSession();

  // Added Part state
  const [addedPartList, setAddedPartList] = useState<Part[]>([]);

  // Function to fetch data from the API
  const fetchData = async () => {
    try {
      const response = await ApiManager.getPartListsDetail(
        session as string,
        local.partlist_num
      );

      if (!response.ok) {
        // Handle errors if response is not ok
        throw new Error("Network response was not ok");
      }

      const json = await response.json(); // Parse JSON response
      setData(json.results); // Update state with the data received
    } catch (error) {
      console.error("Error fetching data:", error);
      Alert.alert(
        "Set error",
        "Error obtaining datasets, see console for more details"
      );
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

  const generatePartList: () => PartPost[] = () => {
    const setParts = data.map((p) => ({
      part_num: p.part.part_num,
      color_id: p.color?.id as number,
      quantity: p.quantity,
    }));
    const newParts = addedPartList.map((p) => ({
      part_num: p.part_num,
      color_id: 1,
      quantity: 1,
    }));

    return [...setParts, ...newParts];
  };

  const handleCreate = async () => {
    const partListNAME = `MyPart-${new Date().getTime()}`;
    const createNewPartList = async (_partListNAME: string) => {
      return ApiManager.postnewPartList(session as string, {
        name: _partListNAME,
      });
    };

    const addPartLists = async (list_id: string, listPart: PartPost[]) => {
      return ApiManager.postPartsToPartList(session as string, {
        list_id,
        listPart,
      });
    };

    try {
      //Create a new PartList
      const rNewPartList = await createNewPartList(partListNAME);
      //Add PartLists to the createdone
      const idList = await rNewPartList.json();
      console.log(idList);
      await addPartLists(idList.id, generatePartList());
      //Show message success.
    } catch (error) {
      console.error(error);
      Alert.alert(
        "Set error",
        "Error saving datasets, see console for more details"
      );
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
    <View style={stylesList.container}>
      <ModalAddPartToSet setAddedPartList={setAddedPartList} />
      <Button title="CREATE my part" onPress={handleCreate} />
      <Text style={styles.headerText}>Added Parts</Text>
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
      <Text style={styles.headerText}>Parts of the piece</Text>
      <FlatList
        data={data}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <View style={stylesList.item}>
            <View style={styles.row}>
              <View style={styles.textContainer}>
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
              <Image
                style={styles.image}
                source={{ uri: item.part.part_img_url }}
                resizeMode="cover"
              />
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
    marginLeft: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 10,
  },
});
