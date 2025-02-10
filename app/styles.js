import { StyleSheet } from "react-native";

import {
  useFonts,
  Merriweather_400Regular,
  Merriweather_700Bold,
} from "@expo-google-fonts/merriweather";
import {
  MerriweatherSans_400Regular,
  MerriweatherSans_700Bold,
} from "@expo-google-fonts/merriweather-sans";

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 30,
    backgroundColor: "#F9F6F1",
  },
  header_container: {
    display: "flex",
    flexDirection: "row",
    gap: 5,
  },
  primary_text: {
    fontSize: 36,
    color: "#4B407C",
    fontWeight: "bold",
    fontFamily: "Merriweather_700Bold",
  },

  intro_container: {
    backgroundColor: "#4B407C",
    height: 275,
    width: "100%",
    borderRadius: 15,
    marginTop: 20,
    marginBottom: 30,
    justifyContent: "center",
  },
  intro_text: {
    color: "#F9F6F1",
    fontSize: 20,
    fontFamily: "MerriweatherSans_400Regular",
    padding: 30,
  },

  buttons: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
    width: "100%",
  },
  button_container: {
    backgroundColor: "#CEC5F2",
    borderRadius: 20,
    height: 90,
    justifyContent: "center",
  },
  button_text_english: {
    color: "#1E1E1E",
    fontSize: 26,
    fontFamily: "Merriweather_700Bold",
    marginLeft: 30,
  },
  button_text_spanish: {
    color: "#1E1E1E",
    fontSize: 18,
    fontFamily: "MerriweatherSans_400Regular",
    marginLeft: 30,
  },

  card: {
    backgroundColor: "#4B407C",
    height: 300,
    width: "100%",
    borderRadius: 15,
    marginTop: 20,
    marginBottom: 10,
    justifyContent: "center",
    paddingHorizontal: 30,
  },
  card_text: {
    color: "#FFFFFF",
    fontSize: 30,
    fontFamily: "Merriweather_700Bold",
  },

  answer: {
    backgroundColor: "#FFFFFF",
    height: 200,
    width: "100%",
    borderRadius: 15,

    padding: 30,

    paddingHorizontal: 30,
  },
  answer_text: {
    color: "#000000",
    fontSize: 30,
    fontFamily: "Merriweather_700Bold",
    lineHeight: 50,
  },
  next_button: {
    backgroundColor: "#CEC5F2",
    borderRadius: 15,
    height: 40,
    justifyContent: "center",
    paddingHorizontal: 30,
  },
  next_button_text: {
    color: "#1E1E1E",
    fontSize: 16,
    fontFamily: "MerriweatherSans_400Regular",
  },
});
