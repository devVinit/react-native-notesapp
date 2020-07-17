import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableNativeFeedback, Platform, TextInput } from 'react-native';
import { AppLoading } from 'expo';
import { StatusBar } from 'expo-status-bar';
import {
  useFonts,
  Poppins_500Medium,
} from '@expo-google-fonts/poppins';

import { SafeAreaView } from 'react-native-safe-area-context';
import MenuIconSvg from './Components/Svg/MenuIconSvg';
import SearchIconSvg from './Components/Svg/SearchIconSvg';
import AddIconSvg from './Components/Svg/AddIconSvg';
import BackIconSvg from './Components/Svg/BackIconSvg';
import UndoIconSvg from './Components/Svg/UndoIconSvg';
import RedoIconSvg from './Components/Svg/RedoIconSvg';
import DoneIconSvg from './Components/Svg/DoneIconSvg';
import CloseIconSvg from './Components/Svg/CloseIconSvg';
import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
import { enableScreens } from 'react-native-screens';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import HomeScreen from './screens/Home/HomeScreen';
import SearchScreen from './screens/Search/SearchScreen';
import NoteDetailsScreen from './screens/NoteDetails/NoteDetailsScreen';

enableScreens();
const Stack = createNativeStackNavigator();

export default function App() {
  let fontLoaded = useFonts({
    Poppins_500Medium
  })

  if (!fontLoaded) {
    return <AppLoading />
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            gestureEnabled: true
          }}
        >
          <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="SearchScreen"
            component={SearchScreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="NoteDetailsScreen"
            component={NoteDetailsScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

}