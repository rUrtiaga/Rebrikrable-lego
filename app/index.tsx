import { Text, View } from "react-native";

import { Button, ButtonGroup, ChakraProvider } from '@chakra-ui/react'
import { Link } from "expo-router";

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
        <Text> Welcome </Text>
        <Link href="/screens/SetsScreen" asChild>
          <Button>
          Go to SETS
          </Button>
          </Link>
      </View>
    </ChakraProvider>
  );
}
