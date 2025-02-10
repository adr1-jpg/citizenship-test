import {
  Image,
  Text,
  View,
  Pressable,
} from "react-native";
import styles from "../styles"; 
import { useRouter } from "expo-router";

export default function Home() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header_container}>
        <Image
          source={require("../../assets/images/logo.png")}
          style={{ width: 40, height: 40 }}
        />
        <Text style={styles.primary_text}>Ciudadana</Text>
      </View>

      <View style={{ alignContent: "center", alignItems: "center" }}>
        <View style={styles.intro_container}>
          <Text style={styles.intro_text}>
            ¡Hola mami!{"\n\n"}
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
        </View>
      </View>
    </View>
  );
}