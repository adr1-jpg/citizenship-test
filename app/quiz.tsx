import {
  Image,
  View,
  Text,
  Button,
  Pressable,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { useRouter } from "expo-router";

import React, { useState, useEffect } from "react";
import english from "../assets/questions-english.json"; // Import JSON file
import spanish from "../assets/questions-spanish.json";
import styles from "./styles";
import speak from "./utilities/speechToText";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Quiz() {
  const router = useRouter();
  interface Question {
    id: number;
    question: string;
    answer: string;
    questionSpanish: string;
    answerSpanish: string;
    favorite: boolean;
  }

  const [favorites, setFavorites] = useState<number[]>([]); // Store favorite question IDs

  const [currentQuestion, setCurrentQuestion] = useState<Question>();

  const [toggleCard, setToggleCard] = useState(false);

  const [language, setLanguage] = useState("english");

  useEffect(() => {
    getRandomQuestion();
  }, []);

  const getRandomQuestion = () => {
    const questions = language === "english" ? english : spanish;

    const randomIndex = Math.floor(Math.random() * questions.length);
    const question: Question = {
      id: (questions as any[])[randomIndex].id,
      question: (questions as any[])[randomIndex].question,
      answer: (questions as any[])[randomIndex].answer,
      questionSpanish: (questions as any[])[randomIndex].questionSpanish,
      answerSpanish: (questions as any[])[randomIndex].answerSpanish,
      favorite: favorites.includes((questions as any[])[randomIndex].id),
    };
    setCurrentQuestion(question);
  };

  // Toggle favorite status and save to AsyncStorage
  const toggleFavorite = async (id: number) => {
    const updatedFavorites = favorites.includes(id)
      ? favorites.filter((favId) => favId !== id) // Remove if already favorited
      : [...favorites, id]; // Add if not favorited

    setFavorites(updatedFavorites);
    await AsyncStorage.setItem("favorites", JSON.stringify(updatedFavorites));

    // Update current question's favorite status
    if (currentQuestion && currentQuestion.id === id) {
      setCurrentQuestion({
        ...currentQuestion,
        favorite: updatedFavorites.includes(id),
      });
    }
  };

  return (
    <SafeAreaView style={styles.safe_area}>
      <View style={styles.container}>
        <View style={styles.header_container}>
          <Pressable onPress={() => router.push("/")}>
            <Image
              source={require("../assets/images/logo.png")}
              style={{ width: 40, height: 40 }}
            />
          </Pressable>

          <Text style={styles.primary_text}>Test</Text>
        </View>

        <View style={{ alignContent: "center", alignItems: "center", flex: 1 }}>
          <Pressable
            onPress={() => setToggleCard(!toggleCard)}
            style={{ width: "100%" }}
          >
            {!toggleCard ? (
              <>
                <ScrollView
                  style={[
                    styles.test_card_container,
                    { backgroundColor: "#4B407C" },
                  ]}
                  contentContainerStyle={{
                    flexGrow: 1,
                    justifyContent: "center",
                  }}
                >
                  <Text style={styles.card_text}>
                    {currentQuestion ? (
                      <Text style={styles.white_text}>
                        {currentQuestion.question}
                      </Text>
                    ) : (
                      <Text>Loading...</Text>
                    )}
                  </Text>
                </ScrollView>
              </>
            ) : (
              <>
                <ScrollView
                  style={[
                    styles.test_card_container,
                    { backgroundColor: "#CEC5F2" },
                  ]}
                  contentContainerStyle={{
                    flexGrow: 1,
                    justifyContent: "center",
                  }}
                >
                  <Text style={styles.card_text}>
                    {currentQuestion ? (
                      <Text style={styles.black_text}>
                        {currentQuestion.answer}
                      </Text>
                    ) : (
                      <Text>Loading...</Text>
                    )}
                  </Text>
                </ScrollView>
              </>
            )}
          </Pressable>
              <Pressable
              style={{ alignSelf: "flex-start", marginTop: 10 }}
              onPress={() =>
                speak(
                toggleCard
                  ? currentQuestion?.answer
                  : currentQuestion?.question,
                0.8
                )
              }
              >
              <Image
                style={{ width: 50, height: 50 }}
                source={require("../assets/images/purple-large-audio.png")}
              />
              </Pressable>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
              alignContent: "center",
              position: "absolute",
              bottom: 10,
            }}
          >
            <Pressable
              onPress={() =>
                currentQuestion && toggleFavorite(currentQuestion.id)
              }
            >
              <Image
                style={{ width: 40, height: 40 }}
                source={
                  currentQuestion?.favorite
                    ? require("../assets/images/heart-solid.png")
                    : require("../assets/images/heart-outline.png")
                }
              />
            </Pressable>
           
            <View>
              <TouchableOpacity
                style={styles.next_button}
                onPress={getRandomQuestion}
              >
                <Text style={styles.next_button_text}>Next Question</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
