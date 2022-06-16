import React, { useEffect, useState, useRef } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

import Schedule from "./screens/Schedule";
import ScheduleStackScreen from "./screens/Schedule";
import ProfileStackScreen from "./screens/Profile";
import YTVideoFeedStackScreen from "./screens/VideoListScreen";

import * as Analytics from "expo-firebase-analytics";

const Tab = createBottomTabNavigator();

export default function App() {
  const navigationRef = useRef();
  const routeNameRef = useRef();

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => (routeNameRef.current = navigationRef.current.getCurrentRoute().name)}
      onStateChange={async () => {
        const previousRouteName = routeNameRef.current;
        const currentRouteName = navigationRef.current.getCurrentRoute().name;
        if (previousRouteName !== currentRouteName) {
          await Analytics.logEvent("screen_view", {
            screen_name: currentRouteName,
            screen_class: currentRouteName,
          });
        }
        // Save the current route name for later comparison
        routeNameRef.current = currentRouteName;
      }}
    >
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
          headerShown: false,
          tabBarActiveBackgroundColor: "#3c4754",
          tabBarActiveTintColor: "#fff",
          tabBarLabelStyle: { fontSize: 14 },
        }}
      >
        <Tab.Screen
          name="ProfileStackScreen"
          component={ProfileStackScreen}
          options={{
            tabBarLabel: "Profile",
            tabBarIcon: ({ color }) => <Feather name="user" size={24} color={color} />,
          }}
        />

        <Tab.Screen
          name="ScheduleStackScreen"
          component={ScheduleStackScreen}
          options={{
            tabBarLabel: "Schedule",
            tabBarIcon: ({ color }) => <Feather name="calendar" size={24} color={color} />,
          }}
        />

        <Tab.Screen
          name="YTVideoFeedStackScreen"
          component={YTVideoFeedStackScreen}
          options={{
            tabBarLabel: "Video Tips",
            tabBarIcon: ({ color }) => <Entypo name="video" size={24} color={color} />,
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
