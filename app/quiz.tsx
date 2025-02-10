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
import { LinearGradient } from "expo-linear-gradient";

export default function Quiz() {
  const router = useRouter();
  type Question = {
    question: string;
    answer: string;
  };

  const [currentQuestion, setCurrentQuestion] = useState<Question>();

  const [toggleCard, setToggleCard] = useState(false);

  const [language, setLanguage] = useState("english");

  useEffect(() => {
    getRandomQuestion();
  }, []);

  const getRandomQuestion = () => {
    const questions = language === "english" ? english : spanish;

    const randomIndex = Math.floor(Math.random() * questions.length);
    const question = {
      question: (questions as any[])[randomIndex].question,
      answer: (questions as any[])[randomIndex].answer,
    };
    setCurrentQuestion(question);
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
          <Pressable onPress={() => setToggleCard(!toggleCard)} style={{ width: "100%" }}>
            {!toggleCard ? (
              <>
                <ScrollView
               style={[styles.test_card_container, { backgroundColor: "#CEC5F2"}]}
                  contentContainerStyle={{
                    flexGrow: 1,
                    justifyContent: "center",
                  }}
                >
                  <Text style={styles.card_text}>
                    {currentQuestion ? (
                      <Text>{currentQuestion.question}</Text>
                    ) : (
                      <Text>Loading...</Text>
                    )}
                  </Text>
                </ScrollView>
              </>
            ) : (
              <>
                <ScrollView
                  style={[styles.test_card_container, { backgroundColor: "#4B407C"}]}
                  contentContainerStyle={{
                    flexGrow: 1,
                    justifyContent: "center",
                  }}
                >
                  <Text style={styles.card_text}>
                    {currentQuestion ? (
                      <Text style={styles.white_text}>{currentQuestion.answer}</Text>
                    ) : (
                      <Text>Loading...</Text>
                    )}
                  </Text>
                </ScrollView>
              </>
            )}
          </Pressable>
          <Pressable
            onPress={() =>
              speak(
                toggleCard
                  ? currentQuestion?.answer
                  : currentQuestion?.question,
                .80
              )
            }
          >
            <Image
              style={{ width: 50, height: 50 }}
              source={require("../assets/images/purple-large-audio.png")}
            />
          </Pressable>

          <View style={styles.next_button_container}>
            <TouchableOpacity
              style={styles.next_button}
              onPress={getRandomQuestion}
            >
              <Text style={styles.next_button_text}>Next Question</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
