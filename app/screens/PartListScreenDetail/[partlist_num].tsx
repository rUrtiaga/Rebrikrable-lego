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
import { LegoButton } from "@/components/LegoButton";
import { useSession } from "@/hooks/ctx";
import { stylesTitles } from "@/constants/StyleTitles";
import { useCustomAlert } from "@/hooks/useCustomAlert";

export default function SetsScreen() {
  const local = useLocalSearchParams<{ partlist_num: string }>();
  const [data, setData] = useState<PartLego[]>([]);
  const [loading, setLoading] = useState(true);
  const { AlertModal, showAlert } = useCustomAlert();

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

      console.log("HEADERS",response.headers)
      const json = await response.json(); // Parse JSON response
      console.log(
        "RESPONSE ERROR",
        session as string,
        local.partlist_num,
        response, 
        json
      );
      if (!response.ok) {
        // Handle errors if response is not ok
        const msj = json.detail || "Network response was not ok"
        throw new Error(msj);
      }

      setData(json.results); // Update state with the data received
    } catch (error) {
      console.error("Error fetching data:", error);
      showAlert(
        "Get error",
        "Error getting datasets, see console for more details"
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
      showAlert(
        "New SET created",
        "Great you have a new set with your Set parts and the new parts that you added"
      );
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
      <Text style={stylesTitles.h3}>Parts of the piece</Text>
      <FlatList
        data={data}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <ItemListPart item={item} />}
      />
      <AlertModal />
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
