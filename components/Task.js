import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { deleteTask, toggleCompleteTask } from "../store/actions";
import Icon from "react-native-vector-icons/MaterialIcons";
import { formatDate, getCategoryColor } from "../utils/Utils";

const Task = ({ navigation, task }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteTask(task.id));
  };
  const handleEdit = () => {
    navigation.navigate("NewTask", { task });
  };

  const handleComplete = () => {
    dispatch(toggleCompleteTask(task.id));
  };
  return (
    <View style={styles.container}>
      {console.log(task.id)}
      <View style={styles.content}>
        <View style={styles.titleWithIcon}>
          <Text
            style={[styles.title, task.completed ? styles.strikeThrough : null]}
          >
            {task.name}
          </Text>
          <TouchableOpacity onPress={() => handleComplete()}>
            <View
              style={[
                styles.circularView,
                task.completed ? styles.circularViewCompleted : null,
              ]}
            ></View>
          </TouchableOpacity>
        </View>
        <View style={styles.titleWithIcon}>
          <View style={styles.data}>
            <Text style={styles.description}>{task.description}</Text>
            <Text style={styles.timeRange}>{formatDate(task.dueDate)}</Text>
            <Text
              style={[
                styles.category,
                { color: getCategoryColor(task.category) },
              ]}
            >
              {task.category}
            </Text>
          </View>
          <View style={styles.iconButtons}>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => handleEdit()}
            >
              <Icon name="edit" size={24} color="#55BCF6" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => handleDelete()}
            >
              <Icon name="delete" size={24} color="#E87474" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 20,
    marginBottom: 16,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
  },
  strikeThrough: {
    textDecorationLine: "line-through",
    textDecorationStyle: "solid",
  },
  completed: {
    backgroundColor: "#d3d3d3",
  },
  titleWithIcon: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 10,
  },
  timeRange: {
    fontSize: 16,
    color: "#555",
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    marginBottom: 12,
    color: "#999",
  },
  category: {
    marginRight: 8,
    borderRadius: 4,
    fontSize: 14,
    paddingVertical: 2,
  },
  iconButtons: {
    flexDirection: "row",
  },
  iconButton: {
    marginLeft: 8,
  },
  circularView: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#55BCF6",
  },
  circularViewCompleted: {
    backgroundColor: "#00FF00",
    borderWidth: 0,
  },
});

export default Task;
