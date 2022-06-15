import { Button, StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { BaseRouter } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import YTViewerScreen from "./YTViewerScreen";
import { getVideos } from "../api/YoutubeServer";

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
  //Allow Users to provide additional help search
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getVideos((data) => {
      console.log("recieved: ", data);
    }, searchQuery);
  }, [searchQuery]);

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
