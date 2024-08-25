import { Text, View, Button } from "react-native";

import { Link } from "expo-router";
import { useSession } from "@/hooks/ctx";

export default function Index() {
  const { signOut } = useSession();
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
        <Button title="Go to SETS" />
      </Link>
      <Link href="/screens/PartListsScreen" asChild>
        <Button title="Go to PARTLISTS" />
      </Link>

      <Link href="/" asChild>
        <Button onPress={() => signOut()} title="LogOut" />
      </Link>
    </View>
  );
}
