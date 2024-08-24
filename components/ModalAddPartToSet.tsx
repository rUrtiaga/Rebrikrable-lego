import { ApiManager } from "@/app/api/ApiManager";
import { Part, PartLego } from "@/app/api/apiTypes";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useBoolean,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ActivityIndicator, Pressable } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import ItemListPart from "./ItemListPart";

export default function ModalAddPartToSet({
  setAddedPartList,
}: {
  setAddedPartList: React.Dispatch<React.SetStateAction<Part[]>>;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useBoolean(true);
  const [data, setData] = useState<Part[]>([]);
  const toast = useToast();

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
      toast({
        title: "Set error",
        description: `Error obtaing datasets, see console for more details`,
        status: "error",
        duration: 9000,
        isClosable: true,
      }); // Chakra toast on error
    } finally {
      setLoading.off(); // Set loading to false after fetching data
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchParts();
    }
  }, [isOpen]);

  return (
    <>
      <Button onClick={onOpen} style={{marginTop: 8}}>Add new Part</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {loading ? (
              <ActivityIndicator />
            ) : (
              <FlatList
                data={data}
                keyExtractor={(item) => String(item.part_cat_id)}
                renderItem={({ item }) => (
                  <Pressable
                    onPress={() =>
                      setAddedPartList((pList) => [item, ...pList])
                    }
                  >
                    <ItemListPart item={item}/>
                  </Pressable>
                )}
              />
            )}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
