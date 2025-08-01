import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { AuthProvider, useAuth } from "@/context/GlobalContext";
import LoginScreen from "./Login";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  const baseToastStyle = {
    borderLeftWidth: 0,
    borderRadius: 8,
    paddingHorizontal: 15,
    height: 40,
    marginTop: 18,
  };

  const baseContentContainerStyle = {
    paddingHorizontal: 0,
    margin: 0,
  };

  const baseText1Style = {
    fontSize: 13,
    fontWeight: "500" as const,
    color: "#fff",
  };

  const toastConfig = {
    success: (props) => (
      <BaseToast
        {...props}
        style={{ ...baseToastStyle, backgroundColor: "#4CAF50" }}
        contentContainerStyle={baseContentContainerStyle}
        text1Style={baseText1Style}
      />
    ),
    error: (props) => (
      <ErrorToast
        {...props}
        style={{ ...baseToastStyle, backgroundColor: "#c33028ff" }}
        contentContainerStyle={baseContentContainerStyle}
        text1Style={baseText1Style}
      />
    ),
  };

  function MainNavigator() {
    const { isSignedIn } = useAuth();

    return isSignedIn ? (
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        {/* <Stack.Screen
          name="Pages/company"
          options={{
            animation: "slide_from_bottom",
            animationTypeForReplace: "push",
            gestureDirection: "vertical",
          }}
        /> */}
      </Stack>
    ) : (
      <LoginScreen />
    );
  }

  return (
    <AuthProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <MainNavigator />
        <Toast config={toastConfig} />
      </ThemeProvider>
    </AuthProvider>
  );
}
