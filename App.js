import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import ARScreen from './src/screens/ARScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ headerShown: false }} // Custom header used in screen
        />
        <Stack.Screen 
          name="ARScreen" 
          component={ARScreen} 
          options={{ headerShown: false }} // Fullscreen AR experience
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
