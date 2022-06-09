import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, useCallback } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { Input } from "react-native-elements";
import { RadioButton } from "react-native-paper";
import { Feather } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

const ProfileSettings = ({ route, navigation }) => {
  // State Hook for User Profiles
  const [profileState, setProfileState] = useState({
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

  // State Hooks for User Group Selection Radio Buttons
  const [userGroupTypeRadio, setUserGroupTypeRadio] = useState("Parents");

  // Helper Function for State Hook Updates
  const updateProfileState = (vals) => {
    setProfileState({
      ...profileState,
      ...vals,
    });
  };

  // Updates profile information upon change
  useEffect(() => {
    // Profie user id check
    let tempId = "";
    if (route.params?.userID) {
      tempId = route.params.userID;
    }

    // Profile user group check
    if (route.params?.userGroup) {
      updateProfileState({
        userGroup: route.params.userGroup,
      });
    }

    // Profile name check
    if (route.params?.name) {
      updateProfileState({
        name: route.params.name,
      });
    }

    // Profile address check
    if (route.params?.address) {
      updateProfileState({
        address: route.params.address,
      });
    }

    // Profile phone check
    if (route.params?.phone) {
      updateProfileState({
        phone: route.params.phone,
      });
    }

    // Profile email check
    if (route.params?.email) {
      updateProfileState({
        email: route.params.email,
      });
    }

    // Profile password check
    if (route.params?.password) {
      updateProfileState({
        password: route.params.password,
      });
    }

    // Profile emergency plan check
    if (route.params?.emergencyPlan) {
      updateProfileState({
        emergencyPlan: route.params.emergencyPlan,
      });
    }

    // Profile payment info check
    if (route.params?.paymentInfo) {
      updateProfileState({
        paymentInfo: route.params.paymentInfo,
      });
    }

    //Profile hours check
    if (route.params?.hours) {
      updateProfileState({
        hours: route.params.hours,
      });
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

  //useEffect for Radio Button
  useEffect(() => {
    updateProfileState({ userGroup: userGroupTypeRadio });
  }, [userGroupTypeRadio]);

  //Navigation Header
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        //save edits and navigate back with new values
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Profile", {
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
          <Feather style={{ marginRight: 10 }} name="save" size={24} color="white" />
        </TouchableOpacity>
      ),
    });
  });

  return (
    <ScrollView nestedScrollEnabled={true}>
      <SafeAreaView style={styles.container}>
        {/* TEMP BUTTON */}
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("CameraScreen");
          }}
        >
          <View>
            <Entypo name="camera" size={24} color="black" />
            <Text>Take A Photo</Text>
          </View>
        </TouchableOpacity>
        {/* TEMP BUTTON */}
        <View>
          <Text> userID: {profileState.id}</Text>
          <View>
            <Text>Please Select Your User Group:</Text>
            <Text>Parents</Text>
            <RadioButton
              value="Parents"
              status={userGroupTypeRadio === "Parents" ? "checked" : "unchecked"}
              onPress={() => {
                setUserGroupTypeRadio("Parents");
                updateProfileState({ userGroup: "Parents" });
              }}
            />
            <Text>Nanny</Text>
            <RadioButton
              value="Nanny"
              status={userGroupTypeRadio === "Nanny" ? "checked" : "unchecked"}
              onPress={() => {
                setUserGroupTypeRadio("Nanny");
                updateProfileState({ userGroup: "Nanny" });
              }}
            />
          </View>
          <Input
            placeholder="Name"
            value={profileState.name}
            onChangeText={(val) => {
              updateProfileState({ name: val });
            }}
          />
          <Input
            placeholder="Address"
            value={profileState.address}
            onChangeText={(val) => {
              updateProfileState({ address: val });
            }}
          />
          <Input
            placeholder="Phone Number"
            value={profileState.phone}
            onChangeText={(val) => {
              updateProfileState({ phone: val });
            }}
          />
          <Input
            placeholder="E-mail Address"
            value={profileState.email}
            onChangeText={(val) => {
              updateProfileState({ email: val });
            }}
          />
          <Input
            placeholder="Password"
            value={profileState.password}
            secureTextEntry={true}
            onChangeText={(val) => {
              updateProfileState({ password: val });
            }}
          />
          <Input
            placeholder="Emergency Plan"
            value={profileState.emergencyPlan}
            onChangeText={(val) => {
              updateProfileState({ emergencyPlan: val });
            }}
          />
          <Input
            placeholder="Payment Information"
            value={profileState.paymentInfo}
            onChangeText={(val) => {
              updateProfileState({ paymentInfo: val });
            }}
          />
          <Input
            placeholder="Work Hours"
            value={profileState.hours}
            onChangeText={(val) => {
              updateProfileState({ hours: val });
            }}
          />
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ProfileSettings;
