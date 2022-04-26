import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './src/scenes/Home';
import FavoriteScreen from './src/scenes/Favorite/Favorite';
import Home from 'react-native-vector-icons/Entypo';
import Favorite from 'react-native-vector-icons/MaterialIcons';
import MovieDetailScreen from './src/scenes/MovieDetail/MovieDetail';

export default function App() {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}
const Stack = createNativeStackNavigator();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MovieDetail"
        component={MovieDetailScreen}
        options={{title: 'Movie Detail'}}
      />
    </Stack.Navigator>
  );
}

const BottomTab = createBottomTabNavigator();
function BottomTabNavigator() {
  return (
    <BottomTab.Navigator initialRouteName="Home">
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <Home name="home" size={size} color={color}></Home>
          ),
        }}
      />
      <BottomTab.Screen
        name="Favorite"
        component={FavoriteScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Favorite name="favorite" size={size} color={color}></Favorite>
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}
