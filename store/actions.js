import AsyncStorage from "@react-native-async-storage/async-storage";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

export const FETCH_TASKS = "FETCH_TASKS";
export const ADD_TASK = "ADD_TASK";
export const DELETE_TASK = "DELETE_TASK";
export const EDIT_TASK = "EDIT_TASK";
export const TOGGLE_COMPLETE_TASK = "TOGGLE_COMPLETE_TASK";

export const fetchTasks = () => async (dispatch) => {
  const storedTasks = await AsyncStorage.getItem("tasks");
  const tasks = storedTasks ? JSON.parse(storedTasks) : [];
  dispatch({ type: FETCH_TASKS, payload: tasks });
};

export const addTask = (taskDetails) => async (dispatch) => {
  console.log("newTask", newTask);
  const newTask = { id: uuidv4(), ...taskDetails };
  const storedTasks = await AsyncStorage.getItem("tasks");
  const tasks = storedTasks ? JSON.parse(storedTasks) : [];
  tasks.push(newTask);
  await AsyncStorage.setItem("tasks", JSON.stringify(tasks));
  console.log("newTask", newTask);
  dispatch({ type: ADD_TASK, payload: newTask });
};

export const deleteTask = (taskId) => async (dispatch) => {
  const storedTasks = await AsyncStorage.getItem("tasks");
  const tasks = storedTasks ? JSON.parse(storedTasks) : [];
  const filteredTasks = tasks.filter((task) => task.id !== taskId);
  await AsyncStorage.setItem("tasks", JSON.stringify(filteredTasks));
  dispatch({ type: DELETE_TASK, payload: taskId });
};

export const editTask = (updatedTask) => async (dispatch) => {
  const storedTasks = await AsyncStorage.getItem("tasks");
  const tasks = storedTasks ? JSON.parse(storedTasks) : [];
  const newTasks = tasks.map((task) =>
    task.id === updatedTask.id ? { ...task, ...updatedTask } : task
  );
  await AsyncStorage.setItem("tasks", JSON.stringify(newTasks));
  dispatch({ type: EDIT_TASK, payload: updatedTask });
};

export const toggleCompleteTask = (taskId) => async (dispatch) => {
  const storedTasks = await AsyncStorage.getItem("tasks");
  const tasks = storedTasks ? JSON.parse(storedTasks) : [];
  const newTasks = tasks.map((task) =>
    task.id === taskId ? { ...task, completed: !task.completed } : task
  );
  await AsyncStorage.setItem("tasks", JSON.stringify(newTasks));
  dispatch({ type: TOGGLE_COMPLETE_TASK, payload: taskId });
};
