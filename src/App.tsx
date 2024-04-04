// File: App.jsx

import { useEffect, useReducer, useState } from "react";
import Task from "./components/Task.js";
import TaskForm from "./components/TaskForm.js";
import shiaUrl from "./assets/shia.png";
import tasksReducer from "./tasksReducer.ts";
import { localSave } from "../utils.js";
import Header from "./components/Header.tsx";
import { appContext } from "./AppContext.ts";
import { Reorder } from "framer-motion";
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
    dispatch({
      type: "recycle_all",
    });
  }
  let tasksDisplayed;

  //filter if needed
  if (hideDone) {
    tasksDisplayed = tasks.filter(item => item.complete != true);
  } else {
    tasksDisplayed = [...tasks];
  }

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

        <section className="w-full p-4">
          <Reorder.Group
            values={tasksDisplayed}
            onReorder={tasks =>
              dispatch({ type: "set_tasks", tasks: tasks })
            }
            className="m-auto grid grid-cols-1 gap-2   sm:w-3/4"
          >
            {tasksDisplayed.map(task => {
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
            })}
          </Reorder.Group>
          <button
            className="m-auto mt-3 block  rounded border  border-black bg-emerald-400 bg-opacity-70 p-1 tracking-tighter   hover:bg-emerald-300 hover:bg-opacity-100
        active:bg-red-200 dark:border-slate-400 dark:hover:bg-opacity-80 "
            onClick={handleRecycleAll}
          >
            Recycle Tasks
          </button>
        </section>
        <div className="absolute top-1 -z-10 opacity-50 ">
          <img className=" max-w-xs" src={shiaUrl} alt="" />
        </div>
      </main>
    </div>
  );
}
