import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/HomeScreen';
import QuizScreen from './screens/QuizScreen';
import ResultsScreen from './screens/ResultsScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerTitleAlign: 'center',
          headerStyle: { backgroundColor: '#1b2a49' },
          headerTintColor: '#ffffff',
          contentStyle: { backgroundColor: '#f5f7fb' },
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'BrainBolt' }} />
        <Stack.Screen name="Quiz" component={QuizScreen} options={{ title: 'Quiz Time' }} />
        <Stack.Screen name="Results" component={ResultsScreen} options={{ title: 'Results' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
