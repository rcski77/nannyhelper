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
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FlatList } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import ProfileSettings from "./ProfileSettings";
import { initDB, setupProfileListener, storeProfile, updateProfile } from "../helpers/fb_helper";

const ProfileStack = createNativeStackNavigator();

const ProfileStackScreen = ({ route, navigation }) => {
  return (
    <ProfileStack.Navigator
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
      <ProfileStack.Screen name="Profile" component={Profile} />
      <ProfileStack.Screen
        name="ProfileSettings"
        component={ProfileSettings}
        options={{ headerTitle: "Profile Settings" }}
      />
    </ProfileStack.Navigator>
  );
};

const Profile = ({ route, navigation }) => {
  //Display heading and navigation
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("ProfileSettings");
          }}
        >
          <Feather style={styles.navButtons} name="settings" size={24} />
        </TouchableOpacity>
      ),
    });
  });

  // const [profileList, setProfileList] = useState([]);

  //Setup Firebase
  useEffect(() => {
    try {
      initDB();
    } catch (err) {
      console.log(err);
    }

    // setupProfileListener((items) => {
    //   setProfileList(items);
    //   console.log(items);
    // });
  }, []);

  //write schedule slots passed from add screen
  useEffect(() => {
    if (
      route.params?.userID ||
      route.params?.userGroup ||
      route.params?.name ||
      route.params?.address ||
      route.params?.phone ||
      route.params?.email ||
      route.params?.password ||
      route.params?.emergencyPlan ||
      route.params?.paymentInfo ||
      route.params?.hours
    ) {
      updateProfile(route.params);
    }
  }, [
    route.params?.userID,
    route.params?.userGroup,
    route.params?.name,
    route.params?.address,
    route.params?.phone,
    route.params?.email,
    route.params?.password,
    route.params?.emergencyPlan,
    route.params?.paymentInfo,
    route.params?.hours,
  ]);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>Profile</Text>
        <Text>Please Log In:</Text>
        <Input></Input>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navButtons: {
    color: "white",
    margin: 10,
  },
});

export default ProfileStackScreen;
