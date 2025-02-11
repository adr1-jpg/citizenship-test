import * as Speech from "expo-speech";

const speak = (text, rate) => {

  Speech.speak(text, {
    rate: rate,
    language: "en",
    voice: "com.apple.ttsbundle.siri_female_en-US_compact"
  });
};

export default speak;


