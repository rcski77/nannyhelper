import { Button, StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { BaseRouter } from "@react-navigation/native";
import React from "react";
import YTViewerScreen from "./YTViewerScreen";

const YTVideoFeedStack = createNativeStackNavigator();

const YTVideoFeedStackScreen = ({ route, navigation }) => {
  return (
    <YTVideoFeedStack.Navigator
      initialRouteName="VideoListScreen"
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
      <YTVideoFeedStack.Screen
        name="VideoListScreen"
        component={VideoListScreen}
        options={{ headerTitle: "Video Feed" }}
      />
      <YTVideoFeedStack.Screen
        name="YTViewerScreen"
        component={YTViewerScreen}
        options={{ headerTitle: "Video Viewer" }}
      />
    </YTVideoFeedStack.Navigator>
  );
};

const VideoListScreen = ({ navigation }) => {
  return (
    <View>
      <Button
        title="Goto YTViewerScreen"
        onPress={() => {
          navigation.navigate("YTViewerScreen", "video to be displayed");
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default YTVideoFeedStackScreen;
