// File: task.jsx

import { useState } from "react";
import { localSave } from "../../utils";
import { Task as TaskType } from "../App";
type TaskProps = {
  task: TaskType;
  tasks: TaskType[];
  handleCheckTask: (task: TaskType) => void;
  handleRemoveTask: (id: string) => void;
  handleRecycleTask: (task: TaskType) => void;
};
export default function Task({
  tasks,
  task,
  handleCheckTask,
  handleRemoveTask,
  handleRecycleTask,
}: TaskProps) {
  const [taskName, setTaskName] = useState(task.name);

  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    function dynamicLocalSave(
      e: React.ChangeEvent<HTMLInputElement>
    ) {
      try {
        let updated = tasks.map(item =>
          item.id === task.id
            ? {
                ...item,
                name: e.target.value,
              }
            : item
        );
        console.log("updating...");
        localSave(updated);
        console.log("local save completed");
      } catch (error) {
        throw new Error("faileddddd");
      }
    }
    setTaskName(e.target.value);
    setTimeout(() => {
      dynamicLocalSave(e);
    }, 0);
  }

  return (
    <div
      className={` flex flex-wrap gap-2 rounded-sm border border-slate-300 p-2 shadow-sm shadow-slate-200 dark:border-slate-900 dark:shadow-slate-500 dark:hover:bg-slate-600  ${
        task.complete
          ? " bg-slate-100 opacity-90 dark:bg-slate-900 dark:text-gray-200 hover:dark:bg-slate-700 "
          : "bg-slate-200  hover:bg-slate-300 dark:bg-slate-700 "
      } ${
        task.recycle
          ? "  dark:bg-[#113333] hover:dark:bg-[#224343] "
          : " "
      }${
        task.recycle && task.complete
          ? " dark:bg-[#111111] dark:shadow-lime-950 "
          : " "
      }`}
    >
      <div className="flex w-2/3 flex-1 items-center gap-1">
        <input
          className=" cursor-pointer"
          type="checkbox"
          checked={task.complete ? true : false}
          name=""
          id=""
          onChange={() => handleCheckTask(task)}
        />
        <input
          className={
            "w-full bg-inherit " +
            (task.complete ? "line-through" : "")
          }
          value={taskName}
          onChange={handleNameChange}
        />
      </div>
      <button
        className="rounded  border border-black bg-red-400 bg-opacity-70 p-1 text-sm tracking-tighter hover:bg-opacity-100 
        active:bg-red-200 "
        onClick={() => handleRemoveTask(task.id)}
      >
        Remove
      </button>
      <button
        className=" rounded border border-black bg-emerald-400 bg-opacity-70 p-1 text-sm tracking-tighter  hover:bg-emerald-300 hover:bg-opacity-100
        active:bg-red-200 dark:hover:bg-opacity-80 "
        onClick={() => handleRecycleTask(task)}
      >
        Recycle
      </button>
    </div>
  );
}
