import { SessionProvider } from "@/hooks/ctx";
import { Slot } from "expo-router";

export default function RootLayout() {
  return (
    <SessionProvider>
      <Slot />
    </SessionProvider>
  );
}
