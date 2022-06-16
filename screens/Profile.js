import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ScrollView } from "react-native";
import { Divider, Image } from "react-native-elements";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DropDownPicker from "react-native-dropdown-picker";
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
    id: "",
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
      route.params?.id ||
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
    route.params?.id,
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
              id: profileState.id,
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

  //Setup Firebase
  useEffect(() => {
    try {
      initDB();
    } catch (err) {
      console.log(err);
    }

    setupProfileListener((items) => {
      setProfileList(items);
      console.log("List of profiles: ", items);
    });
  }, []);

  //Profile picker
  const [profileOpen, setProfileOpen] = useState(false);
  const [profileValue, setProfileValue] = useState(null);
  const [profileList, setProfileList] = useState([]);

  const selectProfile = (profile) => {
    updateProfileState(profile);
  };

  const renderProfilePic = (profile) => {
    if (profile.profileURI == "") {
      return (
        <View>
          <Text style={{ marginBottom: 10 }}>No profile picture set</Text>
        </View>
      );
    } else {
      return (
        <Image
          source={{ uri: profile.profileURI }}
          style={{ width: 150, height: 150, borderRadius: 75 }}
        />
      );
    }
  };

  //write schedule slots passed from add screen
  useEffect(() => {
    if (
      route.params?.profileURI ||
      route.params?.id ||
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
    route.params?.id,
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
        <DropDownPicker
          placeholder="Select profile"
          schema={{
            label: "name",
            value: "id",
          }}
          open={profileOpen}
          value={profileValue}
          items={profileList}
          setOpen={setProfileOpen}
          setValue={setProfileValue}
          setItems={setProfileList}
          onSelectItem={selectProfile}
          containerStyle={{ marginTop: 5 }}
        />
      </View>
      <Divider orientation="horizontal" width={5} margin={5} />
      <ScrollView nestedScrollEnabled={true}>
        <View style={styles.profilePic}>{renderProfilePic(profileState)}</View>
        <View>
          <View style={styles.nameBlock}>
            <Text style={styles.name}>{profileState.name}</Text>
            <Text style={styles.nameSub}>Group: {profileState.userGroup}</Text>
            <Text style={styles.nameSub}>ProfileID: {profileState.id}</Text>
          </View>
          <Divider orientation="horizontal" width={5} margin={5} />
          <Text style={styles.hours}>{profileState.hours} hours worked</Text>
          <View style={styles.profileElement}>
            <Feather name="compass" size={24} color="#636363" />
            <Text style={styles.profileText}>Address</Text>
          </View>
          <View>
            <Text style={styles.text}>{profileState.address}</Text>
          </View>
          <View style={styles.profileElement}>
            <Feather name="phone" size={24} color="#636363" />
            <Text style={styles.profileText}>Phone #</Text>
          </View>
          <View>
            <Text style={styles.text}>{profileState.phone}</Text>
          </View>
          <View style={styles.profileElement}>
            <Feather name="mail" size={24} color="#636363" />
            <Text style={styles.profileText}>Email</Text>
          </View>
          <View>
            <Text style={styles.text}>{profileState.email}</Text>
          </View>
          <View style={styles.profileElement}>
            <Feather name="alert-triangle" size={24} color="#636363" />
            <Text style={styles.profileText}>Emergency Plan</Text>
          </View>
          <View>
            <Text style={styles.text}>{profileState.emergencyPlan}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
  },
  navButtons: {
    color: "white",
    margin: 10,
  },
  text: {
    fontSize: 18,
    marginLeft: 30,
    marginBottom: 5,
  },
  profilePic: {
    alignItems: "center",
  },
  nameBlock: {
    alignItems: "center",
  },
  name: {
    fontWeight: "bold",
    fontSize: 24,
  },
  nameSub: {
    fontSize: 12,
  },
  hours: {
    fontSize: 18,
    alignSelf: "center",
    fontWeight: "bold",
  },
  profileElement: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
  },
  profileText: {
    fontSize: 20,
    flex: 1,
    color: "#636363",
    marginLeft: 5,
  },
});

export default ProfileStackScreen;
