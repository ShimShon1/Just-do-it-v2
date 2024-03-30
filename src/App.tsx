// File: App.jsx

import { useEffect, useReducer, useState } from "react";
import Task from "./components/Task.js";
import TaskForm from "./components/TaskForm.js";
import shiaUrl from "./assets/shia.png";
import tasksReducer from "./tasksReducer.ts";
import { localSave } from "../utils.js";
import Header from "./components/Header.tsx";
import { appContext } from "./AppContext.ts";
export type Task = {
  name: string;
  complete: boolean;
  id: string;
  recycle: boolean;
};

export default function App() {
  //initial variables and state
  const [tasks, dispatch] = useReducer(
    tasksReducer,
    JSON.parse(localStorage.getItem("tasks")!) || []
  );
  const [hideDone, setHideDone] = useState<boolean>(
    JSON.parse(localStorage.getItem("hideDone")!) || false
  );
  const [keepText, setKeepText] = useState<boolean>(
    JSON.parse(localStorage.getItem("keepText")!) || false
  );

  function handleHideDone() {
    setHideDone(!hideDone);
  }
  function handleKeepText() {
    setKeepText(!keepText);
  }
  function handleAddTask(
    e: React.FormEvent<HTMLFormElement>,
    name: string
  ) {
    e.preventDefault();
    dispatch({
      type: "add_task",
      taskName: name,
    });
  }

  function handleRemoveTask(task: Task) {
    dispatch({
      type: "remove_task",
      task: task,
    });
  }
  function handleCheckTask(task: Task) {
    dispatch({
      type: "check_task",
      task: task,
    });
  }
  function handleRecycleTask(task: Task) {
    dispatch({
      type: "recycle_task",
      task: task,
    });
  }

  function handleRecycleAll() {
    console.log("recycle all");
    dispatch({
      type: "recycle_all",
    });
  }
  let tasksDisplayed;

  //filter if needed
  if (hideDone) {
    tasksDisplayed = tasks.filter((item) => item.complete != true);
  } else {
    tasksDisplayed = [...tasks];
  }
  const taskElems = tasksDisplayed.map((task) => {
    return (
      <Task
        key={task.id}
        task={task}
        handleRemoveTask={handleRemoveTask}
        handleCheckTask={handleCheckTask}
        handleRecycleTask={handleRecycleTask}
        dispatch={dispatch}
      />
    );
  });

  useEffect(() => {
    localSave(tasks);
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("hideDone", String(hideDone));
  }, [hideDone]);

  useEffect(() => {
    localStorage.setItem("keepText", String(keepText));
  }, [keepText]);
  return (
    <div className="relative min-h-screen w-full bg-slate-50 dark:bg-slate-900 dark:text-gray-100 ">
      <main className=" relative z-20 m-auto w-3/4 pt-4   md:w-[70%] lg:w-[65%] ">
        <section className=" p-4 text-center">
          <appContext.Provider
            value={{
              hideDone,
              keepText,
              handleHideDone,
              handleKeepText,
            }}
          >
            <Header />
            <TaskForm handleAddTask={handleAddTask} />
          </appContext.Provider>
        </section>
        <hr />
        <button className="border-2 p-2" onClick={handleRecycleAll}>
          Recycle
        </button>
        <section className="  p-4 ">
          <div className="m-auto grid grid-cols-1 gap-2   sm:w-3/4">
            {taskElems}
          </div>
        </section>
        <div className="absolute top-1 -z-10 opacity-50 ">
          <img className=" max-w-xs" src={shiaUrl} alt="" />
        </div>
      </main>
    </div>
  );
}
