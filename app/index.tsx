import { useState } from "react";
import { Text, View, TextInput, StyleSheet, Button, Image } from "react-native";
import { ApiManager } from "./api/ApiManager";
import { Redirect, router } from "expo-router";
import { useSession } from "@/hooks/ctx";
import { LegoButton } from "@/components/LegoButton";
import LogoTextInput from "@/components/LogoTextInput";

export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPasword] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn, session } = useSession();


  // Function to fetch data from the API
  const handleLogin = async () => {
    setLoading(true)
    await signIn(username, password);
    setLoading(false)
    // Navigate after signing in. You may want to tweak this to ensure sign-in is
    // successful before navigating.
    router.replace("/screens/");
  };

  // Redirect when user is alredy log-in
  if (session) {
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
      <Image
        style={{ marginBottom: 50 }}
        source={require("@/assets/images/login-logo.svg")}
      />
      <LogoTextInput
        placeholder="Email or Username"
        value={username}
        onChangeText={setUsername}
        keyboardType="default"
      />
      <LogoTextInput
        placeholder="Password"
        value={password}
        onChangeText={setPasword}
        secureTextEntry={true}
        onSubmitEditing={handleLogin}
      />
      <View style={{ marginTop: 30 }}>
        <LegoButton title="Log In" onPress={handleLogin} loading={loading}/>
      </View>
    </View>
  );
}
