// App.tsx
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/index";
import PracticeScreen from "./screens/practice";
import QuizScreen from "./screens/quiz";
import FavoritesScreen from "./screens/favorites";
import { GestureHandlerRootView } from "react-native-gesture-handler";
// Define the type for your stack navigator
export type RootStackParamList = {
  Home: undefined;
  Practice: undefined;
  Quiz: undefined;
  Favorites: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <GestureHandlerRootView>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Practice" component={PracticeScreen} />
          <Stack.Screen name="Quiz" component={QuizScreen} />
          <Stack.Screen name="Favorites" component={FavoritesScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default App;
