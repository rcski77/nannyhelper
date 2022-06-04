import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";

const Profile = ({ route, navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>Profile</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});

export default Profile;
