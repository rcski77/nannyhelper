import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import { Input } from "react-native-elements";
import { Feather } from "@expo/vector-icons";
//import DropDownPicker from "react-native-dropdown-picker";

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
          placeholder="Set baby sitter"
          value={scheduleObj.sitter}
          onChangeText={(val) => {
            updateScheduleObj({ sitter: val });
          }}
        />
        <Input
          placeholder="Set date"
          value={scheduleObj.date}
          onChangeText={(val) => {
            updateScheduleObj({ date: val });
          }}
        />
        <Text> id: {scheduleObj.id}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default EditSchedule;
