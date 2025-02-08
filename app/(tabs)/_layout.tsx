import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'blue' }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <FontAwesome size={18} name="home" color={color} />,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="practice"
        options={{
          title: 'Practice',
          tabBarIcon: ({ color }) => <FontAwesome size={18} name="bullseye" color={color} />,
          headerShown: false,
        }}
      />
      <Tabs.Screen
      name="quiz"
      options={{
        title: 'Quiz',
        tabBarIcon: ({ color }) => <FontAwesome size={18} name="question" color={color} />,
        headerShown: false,
      }}
    />
    </Tabs>
  );
}

