import * as Speech from "expo-speech";
import { toWords } from "number-to-words"; // Convert numbers to words

const speak = (text, rate ) => {
  // Convert numbers to words to force correct pronunciation
  const formattedText = text.replace(/\b\d+\b/g, (num) => toWords(parseInt(num)));

  Speech.speak(formattedText, {
    rate: rate,
    language: "en",
  });
};

export default speak;