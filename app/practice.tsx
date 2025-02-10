import {
  Image,
  Text,
  View,
  Button,
  Pressable,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import styles from "./styles";
import english from "../assets/questions-english.json"; // Import JSON file
import spanish from "../assets/questions-spanish.json";
import * as Speech from "expo-speech";
import  speak  from "./utilities/speechToText";

export default function Home() {
  const router = useRouter();

  type Question = {
    question: string;
    answer: string;
  };

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
       
        <Text style={styles.primary_text}>Practice</Text>
      </View>

      <View style={{ alignContent: "center", alignItems: "center", flex: 1 }}>
        <Pressable style={styles.card} onPress={getRandomQuestion}>
          <Text>
            {currentQuestion ? (
              <>
                <Text style={styles.card_text}>{currentQuestion.question}</Text>
              </>
            ) : (
              <Text>Loading...</Text>
            )}
          </Text>
        </Pressable>
        <ScrollView style={styles.answer} showsVerticalScrollIndicator={false}>
          <Text>
            {currentQuestion ? (
              <>
                {currentQuestion.answer.split(" ").map((word, index) => (
                  <Text key={index} style={styles.answer_text}>
                    {word}{" "}
                    <Pressable onPress={() => speak(word)}>
                      <Image
                        source={require("../assets/images/small-audio.png")}
                        style={{ width: 25, height: 25, marginLeft: 5, top: 4 }}
                      />
                    </Pressable>
                    {"\n"}
                  </Text>
                ))}
              </>
            ) : (
              <Text>Loading...</Text>
            )}
          </Text>
        </ScrollView>
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
            marginBottom: 20,
            marginTop: 20,
          }}
        >
          <TouchableOpacity
            style={styles.next_button}
            onPress={getRandomQuestion}
          >
            <Text style={styles.next_button_text}>Next Question</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
