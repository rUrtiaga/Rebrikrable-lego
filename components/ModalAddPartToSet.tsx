import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Modal,
  Button,
  ActivityIndicator,
  Pressable,
  FlatList,
  Alert,
  StyleSheet,
} from "react-native";
import { ApiManager } from "@/app/api/ApiManager";
import { Part } from "@/app/api/apiTypes";
import ItemListPart from "./ItemListPart";
import { LegoButton } from "./LegoButton";


export default function ModalAddPartToSet({
  setAddedPartList,
}: {
  setAddedPartList: React.Dispatch<React.SetStateAction<Part[]>>;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Part[]>([]);

  // Function to fetch data from the API
  const fetchParts = async () => {
    try {
      const response = await ApiManager.getParts();

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

  useEffect(() => {
    if (isOpen) {
      fetchParts();
    }
  }, [isOpen]);

  return (
    <View>
      <LegoButton 
        title="Add new Part"
        onPress={() => setIsOpen(true)} />

      <Modal
        animationType="slide"
        transparent={false}
        visible={isOpen}
        onRequestClose={() => setIsOpen(false)}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Modal Title</Text>

          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <FlatList
              data={data}
              keyExtractor={(item) => String(item.part_cat_id)}
              renderItem={({ item }) => (
                <Pressable
                  onPress={
                    () => setAddedPartList((pList) => [item, ...pList]) // Add item to main state
                  }
                >
                  <ItemListPart item={item} />
                </Pressable>
              )}
            />
          )}

          <View style={styles.modalFooter}>
            <Button
              title="Close"
              onPress={() => setIsOpen(false)}
              color="#007bff"
            />
            <Button
              title="Secondary Action"
              onPress={() => {}}
              color="#6c757d"
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  modalFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
});
