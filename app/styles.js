import { StyleSheet, Dimensions } from "react-native";

const { height } = Dimensions.get("window"); // Get screen height

export default StyleSheet.create({
  safe_area: {
    flex: 1,
    backgroundColor: "#F9F6F1",
    position: "absolute",
    height: height,
    width: "100%",
  },
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 30,
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

    width: "100%",
    borderRadius: 15,
    marginTop: 20,
    marginBottom: 30,
    justifyContent: "center",
  },
  intro_text: {
    color: "#F9F6F1",
    fontSize: 24,
    fontFamily: "MerriweatherSans_400Regular",
    paddingHorizontal: 30,
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
  button_container_gold: {
    backgroundColor: "#EBC14A",
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
    paddingTop: 60,
    paddingBottom: 30,
    width: "100%",
    height: height * 0.3,
    borderRadius: 15,
    marginTop: 20,
    marginBottom: 10,
    justifyContent: "flex-start",
    paddingHorizontal: 15,
    display: "flex",
    flexDirection: "row",
  },

  test_card_container: {
    borderRadius: 15,
    marginTop: 20,
    marginBottom: 10,
    padding: 30,
    width: "100%",
    paddingHorizontal: 15,
    display: "flex",

    height: height * 0.6,
  },
  fav_card_container: {
    borderRadius: 15,
    marginTop: 20,
    marginBottom: 10,
    padding: 30,
    width: "100%",
    paddingHorizontal: 15,
    display: "flex",

    height: height * 0.3,
    justifyContent: "center",
  },
  fav_text: {
    fontSize: 24,
    color: "#FFFFFF",
    fontFamily: "Merriweather_700Bold",
  },
  fav_answer_text: {
    fontSize: 24,
    color: "#000000",
    fontFamily: "MerriweatherSans_400Regular",
    marginTop: 10,
  },

  card_text: {
    fontSize: 24,
    fontFamily: "Merriweather_700Bold",
  },
  white_text: {
    color: "#FFFFFF",
  },
  black_text: {
    color: "#000000",
  },

  answer_card: {
    backgroundColor: "#FFFFFF",
    maxHeight: height * 0.4,
    width: "100%",
    borderRadius: 15,
    padding: 30,
    paddingHorizontal: 15,
  },

  answer_text: {
    color: "#000000",
    fontSize: 30,
    fontFamily: "Merriweather_700Bold",
    lineHeight: 50,
  },
  next_button_container: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: "center", // This centers the button horizontally
  },
  next_button: {
    backgroundColor: "#EBC14A",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    alignSelf: "center",
  },
  next_button_text: {
    color: "#1E1E1E",
    fontSize: 16,
    fontFamily: "MerriweatherSans_700Bold",
  },
  large_audio_button: {
    // width: 100,
  },
});
