import { Image, View, Text, Button, Pressable } from "react-native";
import { useRouter } from "expo-router";

import React, { useState, useEffect } from "react";
import english from "../assets/questions-english.json"; // Import JSON file
import spanish from "../assets/questions-spanish.json";
import styles from "./styles";

export default function Quiz() {
  type Question = {
    question: string;
    answer: string;
  };
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState<Question>();

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

      {/* <View>
        {currentQuestion ? (
          <>
            <Text>{currentQuestion.question}</Text>
            <Text>Answer: {currentQuestion.answer}</Text>
            <Button title="Next Question" onPress={getRandomQuestion} />
          </>
        ) : (
          <Text>Loading...</Text>
        )}
      </View> */}
    </View>
  );
}
