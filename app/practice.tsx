import {
  Image,
  Text,
  View,
  Pressable,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import React, { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import styles from "./styles";
import english_questions from "../assets/questions-english.json";
import speak from "./utilities/speechToText";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Home() {
  const router = useRouter();

  interface Question {
    id: number;
    question: string;
    answer: string;
    questionSpanish: string;
    answerSpanish: string;
    favorite: boolean;
  }

  const [currentQuestion, setCurrentQuestion] = useState<Question>();

  const [favorites, setFavorites] = useState<number[]>([]); // Store favorite question IDs

  useEffect(() => {
    loadFavorites();
    getRandomQuestion();
  }, []);

  const getRandomQuestion = () => {
    const questions: Question[] = english_questions;

    const randomIndex = Math.floor(Math.random() * questions.length);
    const question = {
      ...questions[randomIndex],
      favorite: favorites.includes(questions[randomIndex].id), // Check if it's favorited
    };
    setCurrentQuestion(question);
  };

  // Load favorite question IDs from AsyncStorage
  const loadFavorites = async () => {
    try {
      const savedFavorites = await AsyncStorage.getItem("favorites");
      if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites));
      }
    } catch (error) {
      console.error("Failed to load favorites:", error);
    }
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

          <Text style={styles.primary_text}>Practice</Text>
        </View>

        <View style={{ alignContent: "center", alignItems: "center", flex: 1 }}>
          <Pressable style={styles.card}>
            <Pressable
              style={{ position: "absolute", top: 10, right: 15 }}
              onPress={() => speak(currentQuestion?.question, 0.5)}
            >
              <Image
                style={{ width: 50, height: 50 }}
                source={require("../assets/images/large-audio.png")}
              />
            </Pressable>

            <ScrollView
              contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
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
          </Pressable>

          <View
            style={{
              position: "relative",
              width: "100%",
              backgroundColor: "white",
              borderRadius: 15,
            }}
          >
            <ScrollView
              style={styles.answer_card}
              showsVerticalScrollIndicator={false}
            >
              <Text>
                {currentQuestion && currentQuestion.answer ? (
                  <>
                    {currentQuestion.answer
                      .split(" ")
                      .map((word: string, index: number) => (
                        <Text key={index} style={styles.answer_text}>
                          {word.endsWith(",") ? (
                            <>
                              {word.slice(0, -1)}{" "}
                              <Pressable
                                onPress={() => speak(word.slice(0, -1), 0.1)}
                              >
                                <Image
                                  source={require("../assets/images/small-audio.png")}
                                  style={{
                                    width: 35,
                                    height: 35,
                                    marginLeft: 5,
                                    top: 10,
                                  }}
                                />
                              </Pressable>
                              {"\n"}
                              <Text
                                key={`${index}-second`}
                                style={styles.answer_text}
                              >
                                ━━━━
                                {"\n"}
                              </Text>
                            </>
                          ) : (
                            <>
                              {word}{" "}
                              <Pressable onPress={() => speak(word, 0.1)}>
                                <Image
                                  source={require("../assets/images/small-audio.png")}
                                  style={{
                                    width: 35,
                                    height:35,
                                    marginLeft: 5,
                                    top: 10,
                                  }}
                                />
                              </Pressable>
                              {"\n"}
                            </>
                          )}
                        </Text>
                      ))}
                  </>
                ) : (
                  <Text>Loading...</Text>
                )}
              </Text>
            </ScrollView>
            <LinearGradient
              colors={["rgba(255,255,255,0)", "rgba(255,255,255,1)"]}
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: 60,
                borderBottomLeftRadius: 12,
                borderBottomRightRadius: 12,
              }}
            />
          </View>

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
              alignContent: "center",
              marginTop: 20,
              position: "absolute",
              bottom: 20,
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
