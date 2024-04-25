import React, { useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Task from "../components/Task";
import { fetchTasks } from "../store/actions";

export default function MainScreen({ navigation }) {
  const dispatch = useDispatch();

  const tasks = useSelector((state) => state.tasks.tasks);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.tasksWrapper}>
          <Text style={styles.sectionTitle}>ToDo</Text>
          <View style={styles.items}>
            {tasks.map((task, index) => {
              return <Task key={index} navigation={navigation} task={task} />;
            })}
          </View>
        </View>
      </ScrollView>
      <View style={styles.writeTaskWrapper}>
        <TouchableOpacity onPress={() => navigation.navigate("NewTask")}>
          <View style={styles.addWrapper}>
            <Text>+</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8EAED",
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  items: {
    marginTop: 30,
  },
  writeTaskWrapper: {
    position: "absolute",
    bottom: 60,
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: "#FFF",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#C0C0C0",
    borderWidth: 1,
    marginRight: 20,
  },
});
