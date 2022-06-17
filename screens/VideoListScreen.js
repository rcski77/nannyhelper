import {
  Button,
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Input, ListItem, Image } from "react-native-elements";
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

  //Copies JSON over to usestate variable
  const [videos, setVideos] = useState([]);

  // WARNING COMMENT OUT THIS LINE OF CODE FOR NOW, IF QUOTA IS MET
  // ------------------------------------------
  useEffect(() => {
    getVideos((data) => {
      console.log("recieved: ", data);
      setVideos(data.items);
    }, searchQuery);
  }, []);
  // ------------------------------------------

  // RenderVideo takes in two arguments and use JS destructure to
  // ge these values right into these variables
  const renderVideo = ({ index, item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("YTViewerScreen", item);
        }}
      >
        <ListItem key={index}>
          <Image source={{ uri: item.snippet.thumbnails.default.url }} style={styles.thumbnails} />
          <ListItem.Content>
            <ListItem.Title>{item.snippet.title}</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
      </TouchableOpacity>
    );
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
        <Input
          placeholder="Search Parenting Tips"
          value={searchQuery}
          onChangeText={(val) => {
            setSearchQuery(val);
            console.log(searchQuery);
          }}
        />

        <View style={styles.padder}>
          <Button
            title="Search"
            onPress={() => {
              console.log(searchQuery);
              // WARNING COMMENT OUT THIS LINE OF CODE FOR NOW, IF QUOTA IS MET
              // ------------------------------------------
              getVideos((data) => {
                console.log("recieved: ", data);
                setVideos(data.items);
              }, searchQuery);
              // ------------------------------------------

              Keyboard.dismiss();
            }}
          />
        </View>

        <View style={styles.padder}>
          <Button
            title="Clear"
            onPress={() => {
              setSearchQuery("");
              console.log(searchQuery);
              Keyboard.dismiss();
            }}
          />
        </View>

        <FlatList
          data={videos}
          keyExtractor={(item) => item.id.videoId}
          //Rerender or update whenever we change the state w/ this attribute
          extraData={videos}
          renderItem={renderVideo} //index, item
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  thumbnails: {
    width: 100,
    height: 55,
  },
  padder: {
    margin: 10,
  },
});

export default YTVideoFeedStackScreen;
