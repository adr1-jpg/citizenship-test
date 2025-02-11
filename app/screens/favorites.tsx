import {
  Image,
  View,
  Text,
  Pressable,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  FlatList,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import questions_english from "../../assets/questions-english.json"; // Import JSON file

import styles from "../styles";

import { StackNavigationProp } from '@react-navigation/stack';

const FavoritesScreen = ({ navigation }: any) => {

  interface Question {
    id: number;
    question: string;
    answer: string;
    questionSpanish: string;
    answerSpanish: string;
    favorite: boolean;
  }

  const [cardState, setCardState] = useState("question");

  // State for holding favorite question IDs
  const [favorites, setFavorites] = useState<number[]>([]);

  // State to handle loading
  const [loading, setLoading] = useState(true);

  const toggleFavorite = async (id: number) => {
    let newFavorites = [];
    if (favorites.includes(id)) {
      newFavorites = favorites.filter((favorite) => favorite !== id);
    } else {
      newFavorites = [...favorites, id];
    }
    setFavorites(newFavorites);
    try {
      await AsyncStorage.setItem("favorites", JSON.stringify(newFavorites));
    } catch (error) {
      console.error("Failed to save favorites:", error);
    }
  };
  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const savedFavorites = await AsyncStorage.getItem("favorites");
        console.log("savedFavorites", savedFavorites);
        if (savedFavorites) {
          setFavorites(JSON.parse(savedFavorites)); // Update favorites state
        }
      } catch (error) {
        console.error("Failed to load favorites:", error);
      } finally {
        setLoading(false); // Set loading to false after the data has been fetched
      }
    };

    loadFavorites();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />; // Show a loading spinner while fetching
  }

  const favoritedQuestions = questions_english.filter((question) =>
    favorites.includes(question.id)
  );

  return (
    <SafeAreaView style={styles.safe_area}>
      <View style={styles.container}>
        <View style={styles.header_container}>
          <Pressable onPress={() =>navigation.navigate('Home')}>
            <Image
              source={require("../../assets/images/logo.png")}
              style={{ width: 40, height: 40 }}
            />
          </Pressable>
          <Text style={styles.primary_text}>Favorites</Text>
        </View>

        {favoritedQuestions.length === 0 ? (
          <Text style={[styles.fav_text, styles.black_text, { marginTop: 20 }]}>
            No favorites yet!
          </Text>
        ) : (
          <FlatList
            data={favoritedQuestions}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <View>
                <Pressable
                  style={[
                    styles.fav_card_container,
                    cardState === item.id.toString()
                      ? { backgroundColor: "#CEC5F2" }
                      : { backgroundColor: "#4B407C" },
                  ]}
                  onPress={() =>
                    setCardState(
                      cardState === item.id.toString()
                        ? "question"
                        : item.id.toString()
                    )
                  }
                >
                  {cardState === item.id.toString() ? (
                    <Text style={styles.fav_answer_text}>{item.answer}</Text>
                  ) : (
                    <Text style={styles.fav_text}>{item.question}</Text>
                  )}
                </Pressable>

                <Pressable onPress={() => toggleFavorite(item.id)}>
                  <Image
                    style={{ width: 30, height: 30 }}
                    source={
                      favorites.includes(item.id)
                        ? require("../../assets/images/heart-solid.png")
                        : require("../../assets/images/heart-outline.png")
                    }
                  />
                </Pressable>
              </View>
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
}
export default FavoritesScreen;