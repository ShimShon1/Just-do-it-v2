// File: taskReducer.js
import { Task } from "./App";
import { v4 } from "uuid";
import { sortTasks } from "../utils";

export default function tasksReducer(state: Task[], action: any) {
  switch (action.type) {
    case "check_task": {
      //check/uncheck
      let updated = state.map(task =>
        action.task.id === task.id
          ? { ...task, complete: !task.complete }
          : task
      );
      //update
      return sortTasks(updated);
    }
    case "recycle_task": {
      //recycle
      console.log("recyclinggggggg");
      let updated = state.map(task =>
        action.task.id === task.id
          ? { ...task, recycle: !task.recycle }
          : task
      );
      //update
      return sortTasks(updated);
    }

    case "recycle_all": {
      let updated = state.map(task =>
        task.recycle ? { ...task, complete: false } : task
      );
      return sortTasks(updated);
    }

    case "add_task": {
      let newTask = {
        name: action.taskName,
        complete: false,
        id: v4(),
        recycle: false,
      };
      const newTasks = sortTasks([...state, newTask]);
      return newTasks;
    }
    case "remove_task": {
      console.log("removingggg nowwwww");
      state = state.filter(item => item.id !== action.taskId);
      return state;
    }
  }
  return state;
}
