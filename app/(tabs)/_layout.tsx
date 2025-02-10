import React, { useState } from "react";
import { Tabs } from "expo-router";
import { View, ActivityIndicator } from "react-native";
import {
  HomeIcon,
  CheckCircleIcon,
  QuestionMarkCircleIcon,
} from "react-native-heroicons/solid";
import {
  HomeIcon as HomeIconOutline,
  CheckBadgeIcon as CheckBadgeIconOutline,
  QuestionMarkCircleIcon as QuestionMarkCircleIconOutline,
} from "react-native-heroicons/outline";

// Load custom fonts
import {
  useFonts,
  Merriweather_400Regular,
  Merriweather_700Bold,
} from "@expo-google-fonts/merriweather";
import {
  MerriweatherSans_400Regular,
  MerriweatherSans_700Bold,
} from "@expo-google-fonts/merriweather-sans";
import * as SplashScreen from "expo-splash-screen";
import { useCallback } from "react";

SplashScreen.preventAutoHideAsync();

export default function TabLayout() {
  const [activeTab, setActiveTab] = useState("index"); // Initial state set to 'index'

  // Load the Merriweather font
  const [fontsLoaded] = useFonts({
    Merriweather_400Regular,
    Merriweather_700Bold,
    MerriweatherSans_400Regular,
    MerriweatherSans_700Bold,
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View onLayout={onLayoutRootView} style={{ flex: 1 }}>
      <Tabs
        initialRouteName={activeTab} // Set the initial route name to the activeTab state
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#4B407C",
          tabBarInactiveTintColor: "#B3B3B3",
          tabBarStyle: { backgroundColor: "#F9F9F9" },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            tabBarIcon: ({ color, focused }) =>
              focused ? (
                <HomeIcon size={20} color={color} />
              ) : (
                <HomeIconOutline size={20} color={color} />
              ),
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="practice"
          options={{
            tabBarIcon: ({ color, focused }) =>
              focused ? (
                <CheckCircleIcon size={20} color={color} />
              ) : (
                <CheckBadgeIconOutline size={20} color={color} />
              ),
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="quiz"
          options={{
            tabBarIcon: ({ color, focused }) =>
              focused ? (
                <QuestionMarkCircleIcon size={20} color={color} />
              ) : (
                <QuestionMarkCircleIconOutline size={20} color={color} />
              ),
            headerShown: false,
          }}
        />
      </Tabs>
    </View>
  );
}
