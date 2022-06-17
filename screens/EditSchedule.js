import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import { Input, Button } from "react-native-elements";
import { Feather } from "@expo/vector-icons";
import Toast from "react-native-root-toast";
import DropDownPicker from "react-native-dropdown-picker";

import {
  deleteSchedule,
  initDB,
  setupProfileListener,
} from "../helpers/fb_helper";

const EditSchedule = ({ route, navigation }) => {
  const [scheduleObj, setScheduleObj] = useState({
    startTime: "",
    endTime: "",
    sitter: "",
    date: "",
    id: "",
  });

  const updateScheduleObj = (vals) => {
    setScheduleObj({
      ...scheduleObj,
      ...vals,
    });
  };

  useEffect(() => {
    let tempId = "";
    if (route.params?.id) {
      tempId = route.params.id;
    }
    if (route.params?.startTime) {
      updateScheduleObj({
        startTime: route.params.startTime,
        endTime: route.params.endTime,
        sitter: route.params.sitter,
        date: route.params.date,
        id: tempId,
      });
    }
  }, [
    route.params?.startTime,
    route.params?.endTime,
    route.params?.sitter,
    route.params?.date,
    route.params?.id,
  ]);

  //navigation header
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        //save edits and navigate back with new values
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Schedule", {
              startTime: scheduleObj.startTime,
              endTime: scheduleObj.endTime,
              sitter: scheduleObj.sitter,
              date: scheduleObj.date,
              id: scheduleObj.id,
            });
          }}
        >
          <Feather style={{ marginRight: 10 }} name="save" size={24} color="white" />
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
      let tempArray = items.filter(profile => profile.userGroup === "Nanny");
      setProfileList(tempArray);
      //console.log("List of profiles: ", tempArray);
    });
  }, []);

  //Profile picker for babysitter
  const [profileOpen, setProfileOpen] = useState(false);
  const [profileValue, setProfileValue] = useState(null);
  const [profileList, setProfileList] = useState([]);

  useEffect(() => {
    if (scheduleObj.sitter) {
      setProfileValue(scheduleObj.sitter);
    }
  }, [scheduleObj.sitter]);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Input
          placeholder="Set start time"
          value={scheduleObj.startTime}
          onChangeText={(val) => {
            updateScheduleObj({ startTime: val });
          }}
        />
        <Input
          placeholder="Set end time"
          value={scheduleObj.endTime}
          onChangeText={(val) => {
            updateScheduleObj({ endTime: val });
          }}
        />
        <Input
          placeholder="Set date"
          value={scheduleObj.date}
          onChangeText={(val) => {
            updateScheduleObj({ date: val });
          }}
        />
        <DropDownPicker
          placeholder="Select babysitter"
          schema={{
            label: "name",
            value: "name",
          }}
          open={profileOpen}
          value={profileValue}
          items={profileList}
          setOpen={setProfileOpen}
          setValue={setProfileValue}
          setItems={setProfileList}
          onSelectItem={(val) => {
            updateScheduleObj({ sitter: val.name });
          }}
          containerStyle={{ marginTop: 5 }}
        />
        <Text> id: {scheduleObj.id}</Text>
      </View>
      <View style={styles.button}>
        <Button 
          onPress={() => {
            deleteSchedule(scheduleObj);
            Toast.show(`Deleted ${scheduleObj.date} at ${scheduleObj.startTime}`, {
              duration: Toast.durations.SHORT,
              animations: true,
              hideOnPress: true,
            });
            navigation.navigate("Schedule")
          }}
          title="Delete Schedule Entry"
          color="#841584"
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
  button: {
    margin: 10,
  },
});

export default EditSchedule;
