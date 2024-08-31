import { Text, View, Button, Image } from "react-native";

import { Link } from "expo-router";
import { useSession } from "@/hooks/ctx";
import { LegoButton } from "@/components/LegoButton";

export default function Index() {
  const { signOut } = useSession();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
      }}
    >
      <Image
        source={require("@/assets/images/HI.png")}
        style={{ alignSelf: "center" }}
      />
      <Link href="/screens/SetsScreen" asChild>
        <LegoButton title="Go to SETS" onPress={() => {}} />
      </Link>
      <Link href="/screens/PartListsScreen" asChild>
        <LegoButton title="Go to PARTLISTS" onPress={() => {}} />
      </Link>

      <Link href="/" asChild>
        <LegoButton title="LogOut" onPress={() => signOut()} />
      </Link>
    </View>
  );
}
