import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FlatList } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import ProfileSettings from "./ProfileSettings";
import CameraScreen from "./CameraScreen";
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
      <ProfileStack.Screen
        name="CameraScreen"
        component={CameraScreen}
        options={{ headerTitle: "Camera" }}
      />
    </ProfileStack.Navigator>
  );
};

const Profile = ({ route, navigation }) => {
  // State Hook for User Profiles
  const [profileState, setProfileState] = useState({
    profileURI: "",
    userID: "",
    userGroup: "",
    name: "",
    address: "",
    phone: "",
    email: "",
    password: "",
    emergencyPlan: "",
    paymentInfo: "",
    hours: "",
  });

  // Helper Function for State Hook Updates
  const updateProfileState = (vals) => {
    setProfileState({
      ...profileState,
      ...vals,
    });
  };

  // Updates profile information upon change
  useEffect(() => {
    if (
      route.params?.profileURI ||
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
      updateProfileState(route.params);
    }
  }, [
    route.params?.profileURI,
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

  //Display heading and navigation
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("ProfileSettings", {
              profileURI: profileState.profileURI,
              userID: profileState.userID,
              userGroup: profileState.userGroup,
              name: profileState.name,
              address: profileState.address,
              phone: profileState.phone,
              email: profileState.email,
              password: profileState.password,
              emergencyPlan: profileState.emergencyPlan,
              paymentInfo: profileState.paymentInfo,
              hours: profileState.hours,
            });
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

  //write profile onto FB Database
  useEffect(() => {
    if (
      route.params?.profileURI ||
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
    route.params?.profileURI,
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
      <ScrollView nestedScrollEnabled={true}>
        <View>
          <Text style={styles.text}>Profile:</Text>
          {/* Image Component, if imageURI is exists, else placeholder*/}
          {profileState.profileURI ? (
            <Image source={{ uri: profileState.profileURI }} style={{ width: 200, height: 200 }} />
          ) : (
            <Text>No Images</Text>
          )}
          <Text style={styles.text}>Group: {profileState.userGroup}</Text>
          <Text style={styles.text}>Name: {profileState.name}</Text>
          <Text style={styles.text}>Address: {profileState.address}</Text>
          <Text style={styles.text}>Phone #: {profileState.phone}</Text>
          <Text style={styles.text}>Email: {profileState.email}</Text>
          <Text style={styles.text}>Emergency Plan: {profileState.emergencyPlan}</Text>
          <Text style={styles.text}>Hours: {profileState.hours}</Text>
        </View>
      </ScrollView>
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
  text: {
    fontSize: 18,
  },
});

export default ProfileStackScreen;
