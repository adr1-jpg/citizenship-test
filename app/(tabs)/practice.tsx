import { Image, Text, View } from "react-native";
import { useRouter } from "expo-router";
import styles from "../styles";

export default function Home() {
  const router = useRouter();

  return (
      <View style={styles.container}>
        <View style={styles.header_container}>
          <Image
            source={require("../../assets/images/logo.png")}
            style={{ width: 40, height: 40 }}
          />
          <Text style={styles.primary_text}>Practice</Text>
        </View>
      </View>
  );
}