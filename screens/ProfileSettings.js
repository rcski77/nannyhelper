import { StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, useCallback } from "react";

const ProfileSettings = ({ route, navigation }) => {
  // State Hook
  const [profileState, setProfileState] = useState({
    name: "Tom MySpace",
    address: "101 Emergency Lane",
    phone: "111-111-1111",
    email: "Cool",
  });

  return (
    <View style={styles.container}>
      <Text>{profileState.name}</Text>
      <Text>{profileState.address}</Text>
      <Text>{profileState.phone}</Text>
      <Text>{profileState.email}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ProfileSettings;
