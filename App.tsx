import React, { useState, useEffect, useRef } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import { AppLoading } from 'expo';
import {
  useFonts,
  Poppins_500Medium,
} from '@expo-google-fonts/poppins';
import { NavigationContainer } from '@react-navigation/native';
import { enableScreens } from 'react-native-screens';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import HomeScreen from './screens/Home/HomeScreen';
import SearchScreen from './screens/Search/SearchScreen';
import NoteDetailsScreen from './screens/NoteDetails/NoteDetailsScreen';
import SecurityPinScreen from './screens/SecurityPin/SecurityPinScreen';
import { useSelector, useDispatch } from 'react-redux';
import ToasterComponent from './components/Common/ToasterComponent';
import { addBulkNotes } from './redux/actions/NotesActions';


enableScreens();

function LoginStack() {
  const Login = createNativeStackNavigator();
  return (
    <Login.Navigator
      screenOptions={{
        gestureEnabled: true,
        headerShown: false
      }}
    >
      <Login.Screen
        name="SecurtyPinScreen"
        component={SecurityPinScreen}
      />
    </Login.Navigator>
  )
}

function AppStack() {
  const App = createNativeStackNavigator();
  return (
    <App.Navigator
      screenOptions={{
        gestureEnabled: true,
        headerShown: false
      }}
    >
      <App.Screen
        name="HomeScreen"
        component={HomeScreen}
      />

      <App.Screen
        name="SecurtyPinScreen"
        component={SecurityPinScreen}
      />

      <App.Screen
        name="SearchScreen"
        component={SearchScreen}
      />

      <App.Screen
        name="NoteDetailsScreen"
        component={NoteDetailsScreen}
      />
    </App.Navigator>
  )
}

export default function App() {

  const loginStatus = useSelector((state: any) => state.loginStatus);
  const toaster = useSelector((state: any) => state.toaster);

  const dispatch = useDispatch();

  let [fontLoaded] = useFonts({
    Poppins_500Medium
  });

  useEffect(() => {
    AsyncStorage
      .getItem('state')
      .then((state: any) => {
        if (state !== null) {
          const notes = JSON.parse(state).notes;
          dispatch(addBulkNotes(notes));
        }
      });
  }, []);

  if (!fontLoaded) {
    return <AppLoading />
  } else {
    return (
      <View style={{ flex: 1 }}>
        <NavigationContainer>
          {
            loginStatus &&
            <AppStack />
          }
          {
            loginStatus === false &&
            <LoginStack />
          }
        </NavigationContainer>
        {
          toaster && toaster.show &&
          <ToasterComponent message={toaster.message} />
        }
      </View>
    );
  }

}