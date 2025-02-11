import { Image, Text, View, Pressable } from "react-native";
import styles from "./styles";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  useFonts,
  Merriweather_400Regular,
  Merriweather_700Bold,
} from "@expo-google-fonts/merriweather";
import {
  MerriweatherSans_400Regular,
  MerriweatherSans_700Bold,
} from "@expo-google-fonts/merriweather-sans";

import React, { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";

export default function App() {
  const router = useRouter();
  const [fontsLoaded] = useFonts({
    Merriweather_400Regular,
    Merriweather_700Bold,
    MerriweatherSans_400Regular,
    MerriweatherSans_700Bold,
  });

  useEffect(() => {
    async function prepare() {
      if (fontsLoaded) {
        await SplashScreen.hideAsync();
      }
    }
    prepare();
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null; // Prevents rendering until fonts are loaded
  }

  

  return (
    <SafeAreaView style={styles.safe_area}>
      <View style={styles.container}>
        <View style={styles.header_container}>
          <Image
            source={require("../assets/images/logo.png")}
            style={{ width: 40, height: 40 }}
          />
          <Text style={styles.primary_text}>Ciudadana</Text>
        </View>

        <View style={{ alignContent: "center", alignItems: "center" }}>
          <View style={[styles.intro_container, { paddingVertical: 20 }]}>
            <Text style={styles.intro_text}>
              ¡Hola!{"\n\n"}
              Haz clic en 'Practicar' para aprender las preguntas y cómo
              pronunciarlas.{"\n\n"}
              Cuando estés lista, haz la prueba.
            </Text>
          </View>

          <View style={styles.buttons}>
            <Pressable
              style={styles.button_container}
              onPress={() => router.push("/practice")}
            >
              <Text style={styles.button_text_english}>Practice</Text>
              <Text style={styles.button_text_spanish}>Practicar</Text>
            </Pressable>
            <Pressable
              style={styles.button_container}
              onPress={() => router.push("/quiz")}
            >
              <Text style={styles.button_text_english}>Test</Text>
              <Text style={styles.button_text_spanish}>Prueba</Text>
            </Pressable>

            <Pressable
              style={styles.button_container_gold}
              onPress={() => router.push("/favorites")}
            >
              <Text style={styles.button_text_english}>Favorites</Text>
              <Text style={styles.button_text_spanish}>Favoritos</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
