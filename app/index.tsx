import { Text, View, Button } from "react-native";

import { Link } from "expo-router";

export default function Index() {
  return (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text> Welcome </Text>
          <Link href="/screens/SetsScreen" asChild>
            <Button title="Go to SETS"/>
          </Link>
        </View>
  );
}
