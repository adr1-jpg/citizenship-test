// screens/index.tsx
import React, { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import { Image, Text, View, Pressable } from "react-native";
// Add these two new imports ⬇️
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import styles from "../styles";
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

// Add this type definition ⬇️
type RootStackParamList = {
  Home: undefined;
  Practice: undefined;
  Quiz: undefined;
  Favorites: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList>;

// Change your component definition to this ⬇️
const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp>();
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
            source={require("../../assets/images/logo.png")}
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
              onPress={() => navigation.navigate("Practice")}
            >
              <Text style={styles.button_text_english}>Practice</Text>
              <Text style={styles.button_text_spanish}>Practicar</Text>
            </Pressable>
            <Pressable
              style={styles.button_container}
              onPress={() => navigation.navigate("Quiz")}
            >
              <Text style={styles.button_text_english}>Test</Text>
              <Text style={styles.button_text_spanish}>Prueba</Text>
            </Pressable>

            <Pressable
              style={styles.button_container_gold}
              onPress={() => navigation.navigate("Favorites")}
            >
              <Text style={styles.button_text_english}>Favorites</Text>
              <Text style={styles.button_text_spanish}>Favoritas</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
