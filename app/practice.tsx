import {
  Image,
  Text,
  View,
  Button,
  Pressable,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import React, { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import styles from "./styles";
import english from "../assets/questions-english.json"; // Import JSON file
import spanish from "../assets/questions-spanish.json";
import * as Speech from "expo-speech";
import speak from "./utilities/speechToText";

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
        <Pressable style={styles.card}  onPress={() => speak(currentQuestion?.question, 0.5)}>
          <Pressable
           
            style={{ position: "absolute", top: 15, right: 15 }}
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
                <Text>{currentQuestion.question}</Text>
              ) : (
                <Text>Loading...</Text>
              )}
            </Text>
          </ScrollView>
        </Pressable>

        <View style={{ position: "relative", width: "100%" }}>
          <ScrollView
            style={styles.answer_card}
            showsVerticalScrollIndicator={false}
         
          >
            <Text>
              {currentQuestion ? (
                <>
                  {currentQuestion.answer.split(" ")?.map((word, index) => (
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
                                width: 25,
                                height: 25,
                                marginLeft: 5,
                                top: 4,
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
                                width: 25,
                                height: 25,
                                marginLeft: 5,
                                top: 4,
                              }}
                            />
                          </Pressable>
                          {"\n"}
                        </>
                      )}
                    </Text>
                  ))}
                  {/* <Text key={index}>
                      <Text key={index} style={styles.answer_text}>
                        {word}{" "}
                        <Pressable onPress={() => speak(word, 0.1)}>
                          <Image
                            source={require("../assets/images/small-audio.png")}
                            style={{
                              width: 25,
                              height: 25,
                              marginLeft: 5,
                              top: 4,
                            }}
                          />
                        </Pressable>
                        {"\n"}
                      </Text>
                    </Text> */}
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
              height: 40,
              borderBottomLeftRadius: 12,
              borderBottomRightRadius: 12,
            }}
          />
        </View>

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
