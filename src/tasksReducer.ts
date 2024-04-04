// File: taskReducer.js
import { Task } from "./App";
import { v4 } from "uuid";
import { sortTasks } from "../utils";

export type ActionType = {
  type:
    | "check_task"
    | "recycle_task"
    | "recycle_all"
    | "add_task"
    | "remove_task"
    | "updated_task_name"
    | "set_tasks";

  task?: Task;
  taskName?: string;
  tasks?: Task[];
};

export default function tasksReducer(
  state: Task[],
  action: ActionType
) {
  switch (action.type) {
    case "set_tasks": {
      if (action.tasks == undefined)
        throw new Error("No Task name provided to reducer");
      return action.tasks;
    }
    case "add_task": {
      if (action.taskName == undefined)
        throw new Error("No Task name provided to reducer");
      const newTask = {
        name: action.taskName,
        complete: false,
        id: v4(),
        recycle: false,
      };
      const newTasks = sortTasks([...state, newTask]);
      return newTasks;
    }

    case "check_task": {
      if (action.task == undefined) {
        throw new Error("No Task provided to reducer");
      }
      const updated = state.map(task =>
        action.task?.id === task.id
          ? { ...task, complete: !task.complete }
          : task
      );
      return sortTasks(updated);
    }
    case "recycle_task": {
      if (action.task == undefined) {
        throw new Error("No Task provided to reducer");
      }
      //recycle
      console.log("recyclinggggggg");
      const updated = state.map(task =>
        action.task?.id === task.id
          ? { ...task, recycle: !task.recycle }
          : task
      );
      //update
      return sortTasks(updated);
    }

    case "recycle_all": {
      const updated = state.map(task =>
        task.recycle ? { ...task, complete: false } : task
      );
      return sortTasks(updated);
    }

    case "remove_task": {
      if (action.task == undefined) {
        throw new Error("No Task provided to reducer");
      }
      state = state.filter(item => item.id !== action.task?.id);
      return state;
    }
    case "updated_task_name": {
      if (action.task == undefined)
        throw new Error("No task provided to reducer");

      return state.map(t => {
        return t.id === action.task?.id ? action.task : t;
      });
    }
  }
  return state;
}
