import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";

const YTViewerScreen = ({ route }) => {
  console.log("YTViewerScreen: ", route.params);
  return (
    <View style={styles.screen}>
      <WebView
        javaScriptEnabled={true}
        domStorageEnabled={true}
        source={{ uri: `https://www.youtube.com/embed/${route.params.id.videoId}` }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});

export default YTViewerScreen;
