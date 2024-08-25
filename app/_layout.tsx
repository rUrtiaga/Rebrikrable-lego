import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" />
      <Stack.Screen name="screens/SetsScreen" />
      <Stack.Screen name="screens/SetScreen/[set_num]" />
    </Stack>
  );
}
