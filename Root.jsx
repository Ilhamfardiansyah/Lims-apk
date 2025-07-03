// AppNavigators.js (atau RootLayout.js)

import { AuthContext } from '@/context/AuthProvider';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SecureStore from 'expo-secure-store';
import React, { useContext, useEffect, useState } from 'react';
import LoginScreen from './app/screens/Auth/LoginScreen';
import RegisterScreen from './app/screens/Auth/RegisterScreen';
import Beranda from './app/screens/Beranda';
import Details from './app/screens/Details';
import HomeScreen from './app/screens/HomeScreen';
import Notification from './app/screens/Notivication';
import Profile from './app/screens/Profile';
import Search from './app/screens/Search';
import SetingScreen from './app/screens/SetingScreen';


import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ActivityIndicator, View } from 'react-native';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const AuthStackNavigatorScreen = () => {
  return (
    <Stack.Navigator
      screenOptions={{ 
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Login Screen"
        component={LoginScreen}
        options={{ 
          headerShown: false
        }}
      />

      <Stack.Screen
        name="Register Screen"
        component={RegisterScreen}
        options={{ 
          headerShown: false
        }}
      />
    </Stack.Navigator>
  );
}

export function StackNavigatorScreen() {
  return (
    <Stack.Navigator
      screenOptions={{ 
        headerShown: true,
      }}
    >
      <Stack.Screen
        name="Tabs"
        component={TabsNavigatorScreen}
        options={{ 
          headerShown: false
        }}
      />
      <Stack.Screen
        name="Details"
        component={Details}
        options={{ title: 'Detail Tambahan', headerShown: false }}
      />
      <Stack.Screen
        name="Beranda"
        component={Beranda}
        options={{ title: 'Beranda', headerShown: false  }}
      />
      <Stack.Screen
        name="Profile Screens"
        component={Profile}
        options={{ title: 'Profile Screens', headerShown: false }}
      />
    </Stack.Navigator>
  );
}


// ✅ Tab navigator (dipakai dalam stack)
function TabsNavigatorScreen() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <AntDesign name="home" size={size} color={color} />
          )
        }}
      />
      <Tab.Screen name="Search" component={Search}
        options={{ 
          tabBarIcon: ({color, size}) => (
            <AntDesign name="search1" size={size} color={color} />
          )
        }}
      />
      <Tab.Screen name="Notification" component={Notification}
        options={{ 
          tabBarIcon: ({color, size}) => (
            <Ionicons name="notifications" size={size} color={color} />
          )
        }}
      />
    </Tab.Navigator>
  );
}


export default function RootLayout() {
  const [isLoading, setIsLoading] = useState(true);
  const { user, setUser } = useContext(AuthContext); 

  useEffect(() => {
    SecureStore.getItemAsync('user')
    .then(userStrig => {
      if (userStrig) {
        setUser(JSON.parse.userStrig)
      }
      setIsLoading(false)
    })
    .catch(err => {
      console.log(err)
      setIsLoading(false)
    });
  }, []);
  

  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" color="gray" />
      </View>
    )
  }

  return (
    <>
    { user ? (
      <Drawer.Navigator
        screenOptions={{
          drawerType: 'front',
          headerShown: true,
        }}
        initialRouteName="Home"
      >
        <Drawer.Screen
          name="Home"
          component={StackNavigatorScreen}
          options={{ drawerLabel: 'Home Screen' }}
        />
        <Drawer.Screen
          name="Seting"
          component={SetingScreen}
          options={{ drawerLabel: 'Setings' }}
        />
        <Drawer.Screen
          name="Profile"
          component={Profile}
          options={{ drawerLabel: 'Profile' }}
        />
      </Drawer.Navigator>
      ) : (
        <Stack.Navigator>
      <Stack.Screen
        name="Auth"
        component={AuthStackNavigatorScreen} // ✅ Ini benar
      />
      </Stack.Navigator>

      )}
    </>
  );
}
