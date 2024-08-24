import { Text, View } from "react-native";

import { ChakraProvider } from '@chakra-ui/react'
import SetsScreen from "./screens/SetsScreen";

export default function Index() {
  //ChakraProvider - mantains and serve status of the UI library
  return (
    <ChakraProvider>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <SetsScreen />
      </View>
    </ChakraProvider>
  );
}
