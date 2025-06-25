// AppNavigators.js (atau RootLayout.js)

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Beranda from './screens/Beranda';
import Details from './screens/Details';
import HomeScreen from './screens/HomeScreen';
import Notification from './screens/Notivication';
import Profile from './screens/Profile';
import Search from './screens/Search';
import SetingScreen from './screens/SetingScreen';

import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


// ✅ Stack screen yang memuat Tabs + detail screen lain
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
        options={{ title: 'Detail Tambahan' }}
      />
      <Stack.Screen
        name="Beranda"
        component={Beranda}
        options={{ title: 'Beranda' }}
      />
      <Stack.Screen
        name="Profile Screens"
        component={Profile}
        options={{ title: 'Profile Screens' }}
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


// ✅ Drawer sebagai root layout
export default function RootLayout() {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerType: 'front',
        drawerStyle: { width: 240 },
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
  );
}
