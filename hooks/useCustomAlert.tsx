import { LegoButton } from "@/components/LegoButton";
import { Redirect } from "expo-router";
import React, { useEffect, useState } from "react";
import { Platform, Modal, View, Text, Button } from "react-native";

export const useCustomAlert = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState({ title: "", message: "" });

  const showAlert = (title: string, message: string) => {
      setModalContent({ title, message });
      setModalVisible(true);
  };

  const AlertModal = () => {
    useEffect(() => {}, [isModalVisible]);
    return (
      <Modal
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <View
            style={{
              width: 300,
              padding: 20,
              backgroundColor: "white",
              borderRadius: 10,
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              {modalContent.title}
            </Text>
            <Text style={{ marginVertical: 10 }}>{modalContent.message}</Text>
            <LegoButton title="OK" onPress={() => {setModalVisible(false)}} />
          </View>
        </View>
      </Modal>
    );
  };

  return { showAlert, AlertModal };
};
