import React, { useEffect, useRef, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  Button,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { Camera, CameraType, FlashMode } from "expo-camera";
import { shareAsync } from "expo-sharing";
import * as MediaLibrary from "expo-media-library";

const CameraScreen = ({ route, navigation }) => {
  //Navigation Header
  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        //save edits and navigate back with new values
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("ProfileSettings", { photoURI });
          }}
        >
          <Ionicons name="arrow-back-circle-outline" size={24} color="white" />
        </TouchableOpacity>
      ),
    });
  });

  // State Hook to store photoURI
  const [photoURI, setPhotoURI] = useState("");

  // State Hooks to ensure we have pemission to use Camera
  const [hasCameraPermission, setHasCameraPermission] = useState();

  // State Hook to ensure we have permission to access Media Gallery such as Camera Roll or Gallery
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();

  // State Hook to define Camera Type (Front or Back)
  const [type, setType] = useState(CameraType.back);

  // State Hook to define Flash for Camera
  const [flash, setFlash] = useState(FlashMode.off);
  const [flashText, setFlashText] = useState("Flash Off");

  // UseEffect Hook
  useEffect(() => {
    flash === FlashMode.off ? setFlashText("Flash Off") : setFlashText("Flash On");
  }, [flash]);

  // State Hooke to set Photos
  const [photo, setPhoto] = useState();

  //Check for Permissions when Components Mount
  useEffect(() => {
    (async () => {
      //Request Pemission for Camera and Media Library Access, Async
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === "granted");

      const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();
      setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
    })();
  }, []);

  let cameraRef = useRef();

  // If there's no camera permission request yet show nothing
  if (hasCameraPermission === undefined) {
    return <Text>Requesting Permission</Text>;

    // If user decline camera mission return message
  } else if (hasCameraPermission === false) {
    return <Text>Permission for camera, denied! Change settings for permission</Text>;
  }

  // Camera Features
  // ---------------------------
  let takePhoto = async () => {
    // Camera Picture Options
    let options = {
      quality: 1,
      base64: true,
      exif: false,
    };

    // Takes a picture and saves it to app's cache directory
    let newPhoto = await cameraRef.current.takePictureAsync(options);
    setPhoto(newPhoto);
  };

  // If photo was taken we can, we'll render a different set of components
  if (photo) {
    // TEMP PRINT PHOTO
    // console.log(photo.uri);

    //Save Photo
    let savePhoto = () => {
      // Save photos to media
      MediaLibrary.saveToLibraryAsync.then(() => {
        // Save photo URL so we can bring back to profile edit screen and profile screen
        // Note, probably not very useful as this is only a cached URI.
        setPhotoURI(photo.uri);

        // Share clear cache photo afterwards
        setPhoto(undefined);
      });
    };

    // Share Photo
    // May not be necessary for profile pics, but could be useful for parents or nannys to share pics of kids
    // Implemented Here for now
    let sharePhoto = () => {
      // Share photos
      shareAsync(photo.uri).then(() => {
        // Share clear cache photo afterwards
        setPhoto(undefined);
      });
    };

    // Return Preview of Image if Photo State contains object, else rerenders other Camera View Components
    return (
      <SafeAreaView style={styles.container}>
        {/* Preview Image */}
        <Image
          style={styles.previewPhoto}
          source={{ uri: "data:image/jpg;base64," + photo.base64 }}
        />

        {/* Save Photo Button */}
        {hasMediaLibraryPermission ? (
          <Button color="#3c4754" title="Save Photo" onPress={savePhoto} />
        ) : undefined}

        {/* Discard Photo Button */}
        <Button color="#3c4754" title="Discard Photo" onPress={() => setPhoto(undefined)} />

        {/* Share Photo Button */}
        <Button color="#3c4754" title="Share Photo" onPress={sharePhoto} />
      </SafeAreaView>
    );
  }

  return (
    <Camera style={styles.cameraContainer} ref={cameraRef} type={type} flashMode={flash}>
      <View style={styles.viewContainer}>
        {/* Button to Use Flash */}
        <Button
          color="#3c4754"
          title={flashText}
          onPress={() => {
            setFlash(flash === FlashMode.off ? FlashMode.on : FlashMode.off);
          }}
        />

        {/* Button to Take Picture */}
        <Button color="#3c4754" title="Take A Photo" onPress={takePhoto} />
        {/* Button for Camera Type*/}
        <Button
          color="#3c4754"
          title="Flip Camera"
          onPress={() => {
            setType(type === CameraType.back ? CameraType.front : CameraType.back);
          }}
        />
      </View>
      <StatusBar style="auto" />
    </Camera>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cameraContainer: {
    flex: 1,
    alignSelf: "stretch",
  },
  viewContainer: {
    flex: 1,
    flexDirection: "column-reverse",
    alignContent: "space-between",
  },
  buttonContainer: {
    padding: 10,
  },
  button: {
    flex: 0.1,
    backgroundColor: "#3c4754",
  },
  text: {
    fontSize: 18,
    color: "white",
  },
  previewPhoto: {
    alignSelf: "stretch",
    flex: 1,
  },
});

export default CameraScreen;
