import { useState } from "react";
import { Text, View, TextInput, StyleSheet, Button } from "react-native";
import { ApiManager } from "./api/ApiManager";
import { Redirect, router } from "expo-router";
import { useSession } from "@/hooks/ctx";

export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPasword] = useState("");
  const { signIn, session } = useSession();

  // Function to fetch data from the API
  const handleLogin = async () => {
    await signIn(username, password);
    // Navigate after signing in. You may want to tweak this to ensure sign-in is
    // successful before navigating.
    router.replace("/screens/");
  };

  // Redirect when user is alredy log-in
  if(session){
    return <Redirect href="/screens/" />;
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text> LogIn </Text>
      <TextInput
        style={styles.input}
        placeholder="email or user"
        value={username}
        onChangeText={setUsername}
        keyboardType="default"
      />
      <TextInput
        style={styles.input}
        placeholder="password"
        value={password}
        onChangeText={setPasword}
        secureTextEntry={true}
      />
      <Button title="Log In" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    width: 150,
    borderColor: "grey",
    fontSize: 16,
    borderStyle: "solid",
    borderWidth: 2,
  },
});
