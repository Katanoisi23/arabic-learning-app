import { Stack } from "expo-router";
import { ProgressProvider } from "../context/ProgressContext";

export default function RootLayout() {
  return (
    <ProgressProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </ProgressProvider>
  );
}
