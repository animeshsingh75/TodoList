import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
export const ADD_TASK = "ADD_TASK";
export const DELETE_TASK = "DELETE_TASK";
export const EDIT_TASK = "EDIT_TASK";
export const TOGGLE_COMPLETE_TASK = "TOGGLE_COMPLETE_TASK";

export function addTask(taskDetails) {
  return {
    type: ADD_TASK,
    payload: {
      id: uuidv4(),
      ...taskDetails,
    },
  };
}

export const deleteTask = (taskId) => ({
  type: DELETE_TASK,
  payload: taskId,
});

export const editTask = (task) => ({
  type: EDIT_TASK,
  payload: task,
});

export const toggleCompleteTask = (taskId) => ({
  type: TOGGLE_COMPLETE_TASK,
  payload: taskId,
});
