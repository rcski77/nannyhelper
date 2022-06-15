import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, useCallback } from "react";
import { Input } from "react-native-elements";
import { RadioButton } from "react-native-paper";
import { Feather } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
//---------------------------------------------------------
import { initDB, upload } from "../helpers/fb_storage_helper";
//---------------------------------------------------------

const ProfileSettings = ({ route, navigation }) => {
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

  // State Hooks for User Group Selection Radio Buttons
  const [userGroupTypeRadio, setUserGroupTypeRadio] = useState("Parents");

  // Helper Function for State Hook Updates
  const updateProfileState = (vals) => {
    setProfileState({
      ...profileState,
      ...vals,
    });
  };

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
              profileURI: imageURI,
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

  // Callback to explicitly change useState Values
  const forcedStateUpdate = useCallback(() => {
    updateProfileState(route.params);
  });

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
      // Values of input changes
      updateProfileState(route.params);

      // Explicitly ensures the useState Profile Value Changes
      forcedStateUpdate();
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

  // imageURI statehook
  const [imageURI, setImageURI] = useState(null); //Originally set to null

  const pickProfileImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      // Allows for only images
      mediaTypes: ImagePicker.MediaTypeOptions.Images,

      // Allows for editing
      allowsEditing: true,

      // Image editted at 1:1 Aspect Ratio
      aspect: [1, 1],

      // Picks highest Image Quality
      quality: 1,

      // Ensures image data is formatted
      base64: true,

      //Excludes EXIF data
      exif: false,
    });

    // console.log(result);

    if (!result.cancelled) {
      setImageURI(result.uri);
    }
  };

  // UseEffect Hook to pull cache Image URI from camera screen
  // NOTE: FIREBASE RELATED - May not work w/ firebase code since it requires image binary - (RESOLVED, SEE fb_storage_helper.js)
  // NOTE: FIREBASE RELATED - May Need to figure out how to move image over between screen without errors - (RESOLVED, SEE fb_storage_helper.js)
  // COMMENT OUT FROM HERE - IF SOLUTION CANNOT BE SOLVE
  useEffect(() => {
    if (route.params.photoURI) {
      // Values of input changes

      setImageURI(route.params.photoURI);
      forcedImageURIStateChange();
    }
  }, [route.params?.photoURI]);

  // Callback to explicitly change useState Values
  const forcedImageURIStateChange = useCallback(() => {
    setImageURI(route.params.photoURI);
  });
  // COMMENT OUT TO HERE

  //---------------------------------------------------------
  // TODO: Implement Firebase Storage and Means to Pesist Firebase ImageURI
  // WIP PROGRESS IMCOMPLETE
  // Setup Firebase Storage
  useEffect(() => {
    try {
      initDB();
    } catch (err) {
      console.log(err);
    }
  }, []);

  const [loading, setLoading] = useState(false);
  const [confirmProfileSave, setConfirmProfileSave] = useState(false);
  const uploadImage = () => {
    if (imageURI) {
      setConfirmProfileSave(false);
      //Upload takes 4 parameters in the following order: (1) image URI (2) currentuserID (3) setLoading (4) setImageURI
      //Uploads image into firebase and gives unique name based on User ID
      //Toggles on and off loading flag inbetween upload
      //Update imageURI to link to firebase
      upload(imageURI, profileState.userID, setLoading, setImageURI);
      setConfirmProfileSave(true);
    }
  };

  // Only triggers if you save profiles
  useEffect(() => {
    updateProfileState({ profileURI: imageURI });
    forcedProfileURIStateChange();

    console.log("COOL CAT");
    console.log(profileState.profileURI);
  }, [confirmProfileSave]);

  // Callback to explicitly change useState Values
  const forcedProfileURIStateChange = useCallback(() => {
    updateProfileState({ profileURI: imageURI });
  });

  useEffect(() => {
    if (route.params.profileURI) {
      // Values of input changes

      setImageURI(route.params.profileURI);
    }
  }, [route.params?.profileURI]);

  //---------------------------------------------------------

  return (
    <ScrollView nestedScrollEnabled={true}>
      <SafeAreaView style={styles.container}>
        {/* Image Component, if imageURI is exists, else placeholder*/}
        {imageURI ? (
          <Image source={{ uri: imageURI }} style={{ width: 200, height: 200 }} />
        ) : (
          <Text>Please Select an Profile Image...</Text>
        )}

        {/* Image Picker Button */}
        <TouchableOpacity onPress={pickProfileImage}>
          <View>
            <Entypo name="images" size={24} color="black" />
            <Text>Select a photo</Text>
          </View>
        </TouchableOpacity>

        {/* Button to Camera Screen */}
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

        {/* Button Save on Firebase Storage Button */}
        <TouchableOpacity onPress={uploadImage} disabled={loading || !imageURI}>
          <View>
            <Entypo name="save" size={24} color="black" />
            <Text>Confirm Profile Image</Text>
          </View>
        </TouchableOpacity>

        <View>
          {/* USER ID PLACE HOLDER */}
          <Text> userID: {profileState.userID}</Text>

          {/* USER GROUP RADIO BUTTON SELECTION */}
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

          {/* OTHER INPUTS */}
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
