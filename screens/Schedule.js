import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FlatList } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import Toast from "react-native-root-toast";

import EditSchedule from "./EditSchedule";
import {
  initDB,
  setupScheduleListener,
  updateSchedule,
  deleteSchedule,
} from "../helpers/fb_helper";

const ScheduleStack = createNativeStackNavigator();

const ScheduleStackScreen = ({ route, navigation }) => {
  return (
    <ScheduleStack.Navigator
      initialRouteName="Schedule"
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
      <ScheduleStack.Screen name="Schedule" component={Schedule} />
      <ScheduleStack.Screen
        name="EditSchedule"
        component={EditSchedule}
        options={{ headerTitle: "Add/Edit" }}
      />
    </ScheduleStack.Navigator>
  );
};

const Schedule = ({ route, navigation }) => {
  //display heading and navigation
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("EditSchedule");
          }}
        >
          <Feather style={styles.navButtons} name="plus" size={24} />
        </TouchableOpacity>
      ),
    });
  });

  const [scheduleSlots, setScheduleSlots] = useState([]);

  //setup firebase database
  useEffect(() => {
    try {
      initDB();
    } catch (err) {
      console.log(err);
    }
    setupScheduleListener((items) => {
      setScheduleSlots(items);
      console.log(items);
    });
  }, []);

  //write schedule slots passed from add screen
  useEffect(() => {
    if (route.params?.startTime) {
      updateSchedule(route.params);
    }
  }, [route.params?.startTime]);

  const renderItem = ({ index, item }) => {
    return (
      <TouchableHighlight
        style={styles.scheduleSlots}
        underlayColor="#fff"
        activeOpacity={0.6}
        onPress={() => {
          navigation.navigate("EditSchedule", {
            startTime: item.startTime,
            endTime: item.endTime,
            sitter: item.sitter,
            date: item.date,
            id: item.id,
          });
        }}
        onLongPress={() => {
          deleteSchedule(item);
          Toast.show(`Deleted ${item.date} at ${item.startTime}`, {
            duration: Toast.durations.SHORT,
            animations: true,
            hideOnPress: true,
          });
        }}
      >
        <View>
          <View>
            <Text style={styles.scheduleDate}>{item.date}</Text>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
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
    borderRadius: 20,
  },
  scheduleText: {
    fontWeight: "bold",
    fontSize: 18,
    margin: 5,
  },
  scheduleDate: {
    fontWeight: "bold",
    fontStyle: "italic",
    fontSize: 18,
    margin: 5,
  },
  navButtons: {
    color: "white",
    margin: 10,
  },
});

export default ScheduleStackScreen;
