import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

import Profile from "./screens/Profile";
import Schedule from "./screens/Schedule";
import ProfileSettings from "./screens/ProfileSettings";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Profile"
        screenOptions={{
          headerStyle: {
            backgroundColor: "#3c4754",
          },
          headerTintColor: "#fff",
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          tabBarActiveBackgroundColor: "#3c4754",
          tabBarActiveTintColor: "#fff",
          tabBarLabelStyle: { fontSize: 14 },
        }}
      >
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarLabel: "Profile",
            tabBarIcon: ({ color }) => <Feather name="user" size={24} color={color} />,
          }}
        />
        <Tab.Screen
          name="Profile Settings"
          component={ProfileSettings}
          listeners={({ navigation, route }) => {
            onTabPress: () => {
              navigation.navigate("Settings");
            };
          }}
          options={{
            tabBarLabel: "Settings",
            tabBarIcon: ({ color }) => <Feather name="settings" size={24} color={color} />,
          }}
        />
        <Tab.Screen
          name="Schedule"
          component={Schedule}
          options={{
            tabBarLabel: "Schedule",
            tabBarIcon: ({ color }) => <Feather name="calendar" size={24} color={color} />,
          }}
        />
      </Tab.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
