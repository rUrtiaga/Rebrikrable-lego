import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" />
      <Stack.Screen name="SetsScreen" />
      <Stack.Screen name="SetScreen/[set_num]" />
    </Stack>
  );
}
