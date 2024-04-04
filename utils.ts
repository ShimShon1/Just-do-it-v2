// File: utils.js
import { Task } from "./src/App";

export function localSave(tasks: Task[]) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

export function sortTasks(tasks: Task[]) {
  return tasks.sort(a => (a.complete ? 1 : -1));
}
