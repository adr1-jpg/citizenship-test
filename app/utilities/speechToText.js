import * as Speech from "expo-speech";
import { toWords } from "number-to-words"; // Convert numbers to words

const speak = (text) => {
  // Convert numbers to words to force correct pronunciation
  const formattedText = text.replace(/\b\d+\b/g, (num) => toWords(parseInt(num)));

  Speech.speak(formattedText, {
    rate: .1,
    language: "en",
  });
};

export default speak;