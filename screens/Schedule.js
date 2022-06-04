import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";

const Schedule = ({ route, navigation }) => {

  //display heading and navigation
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
        >
          <Feather
            style={styles.navButtons}
            name="plus"
            size={24}
          />
        </TouchableOpacity>
      )
    });
  });

  const [scheduleSlots, setScheduleSlots] = useState([]);

  const testSchedule = [
    {
      startTime: "8:00am",
      endTime: "11:00am",
      sitter: "Ali",
    },
    {
      startTime: "1:00pm",
      endTime: "5:00pm",
      sitter: "Haley",
    },
  ];

  useEffect(() => {
    setScheduleSlots(testSchedule);
  }, []);

  const renderItem = ({ index, item }) => {
    return (
      <TouchableHighlight
        style={styles.scheduleSlots}
        underlayColor="#fff"
        activeOpacity={0.6}
        onPress={() => {
          console.log("You pressed a button");
        }}
      >
        <View>
          <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between" }}>
            <Text style={styles.scheduleText}>
              {item.startTime} - {item.endTime}
            </Text>
            <Text style={styles.scheduleText}>{item.sitter}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <FlatList data={scheduleSlots} renderItem={renderItem} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scheduleSlots: {
    width: "98%",
    backgroundColor: "#ffdd80",
    alignSelf: "center",
    padding: 20,
    marginTop: 10,
    borderRadius: 10,
  },
  scheduleText: {
    fontWeight: "bold",
    fontSize: 18,
    margin: 5,
  },
  navButtons: {
    color: "white",
    margin: 10,
  }
});

export default Schedule;
