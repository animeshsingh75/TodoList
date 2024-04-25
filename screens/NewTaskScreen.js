import React, { useState } from "react";
import {
  View,
  TextInput,
  KeyboardAvoidingView,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useDispatch } from "react-redux";
import { Alert } from "react-native";
import { addTask, editTask } from "../store/actions";
import { truncateTime } from "../utils/Utils";

export default function TaskInputScreen({ route, navigation }) {
  const task = route.params?.task;
  const [name, setName] = useState(task?.name || "");
  const [description, setDescription] = useState(task?.description || "");
  const [dueDate, setDueDate] = useState(new Date(task?.dueDate || new Date()));
  const [category, setCategory] = useState(task?.category || "");
  const [showDatePicker, setShowDatePicker] = useState(false);

  const dispatch = useDispatch();

  const handleAddTask = () => {
    if (!name.trim()) {
      Alert.alert("Error", "Name cannot be empty.");
      return;
    }
    if (!description.trim()) {
      Alert.alert("Error", "Description cannot be empty.");
      return;
    }
    const currentDate = truncateTime(new Date());
    const truncatedDueDate = truncateTime(dueDate);
    if (truncatedDueDate < currentDate) {
      Alert.alert("Error", "Due date cannot be in the past.");
      return;
    }
    if (task) {
      // Editing existing task
      dispatch(
        editTask({
          id: task.id,
          name,
          description,
          dueDate: dueDate.toISOString(),
          category,
          isCompleted: task.isCompleted,
        })
      );
    } else {
      dispatch(
        addTask({
          name,
          description,
          dueDate: dueDate.toISOString(),
          category,
          isCompleted: false,
        })
      );
    }

    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.writeTaskWrapper}
      >
        <TextInput
          style={styles.input}
          placeholder={"Write a task"}
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
          multiline={true}
          numberOfLines={3}
        />
      </KeyboardAvoidingView>
      <View style={styles.picker}>
        <Picker
          selectedValue={category}
          onValueChange={(itemValue) => setCategory(itemValue)}
          mode="dropdown"
        >
          <Picker.Item label="Work" value="Work" />
          <Picker.Item label="Personal" value="Personal" />
          <Picker.Item label="Shopping" value="Shopping" />
          <Picker.Item label="Others" value="Others" />
        </Picker>
      </View>
      <TouchableOpacity
        onPress={() => setShowDatePicker(true)}
        style={styles.input}
      >
        <Text>{dueDate.toLocaleDateString()}</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={dueDate}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            setDueDate(selectedDate || dueDate);
          }}
        />
      )}
      <TouchableOpacity
        style={styles.submit}
        title="Add Task"
        onPress={handleAddTask}
      >
        <Text style={styles.submitText}>Add Task</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8EAED",
  },
  writeTaskWrapper: {
    paddingTop: 80,
    width: "100%",
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: "#FFF",
    borderRadius: 20,
    marginHorizontal: 20,
    borderColor: "#C0C0C0",
    borderWidth: 1,
    marginBottom: 20,
  },
  picker: {
    height: 50,
    paddingHorizontal: 15,
    backgroundColor: "#FFF",
    borderRadius: 20,
    marginHorizontal: 20,
    borderColor: "#C0C0C0",
    borderWidth: 1,
    marginBottom: 20,
  },
  submit: {
    position: "absolute",
    bottom: 60,
    left: 20,
    right: 20,
    backgroundColor: "#007AFF",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  submitText: {
    color: "white",
    fontSize: 18,
  },
});
