// File: task.jsx

import { Task as TaskType } from "../App";
import { ActionType } from "../tasksReducer";
type TaskProps = {
  task: TaskType;
  dispatch: React.Dispatch<ActionType>;
  handleCheckTask: (task: TaskType) => void;
  handleRemoveTask: (task: TaskType) => void;
  handleRecycleTask: (task: TaskType) => void;
};
export default function Task({
  task,
  handleCheckTask,
  handleRemoveTask,
  handleRecycleTask,
  dispatch,
}: TaskProps) {
  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    const updatedTask = {
      ...task,
      name: e.target.value,
    };
    dispatch({ type: "updated_task_name", task: updatedTask });
  }
  const backgroundClasses =
    task.recycle && task.complete
      ? "bg-emerald-100   dark:shadow-lime-950  dark:bg-[#162c2c]   "
      : task.complete
        ? "bg-slate-100 opacity-90 dark:bg-slate-800 dark:text-gray-200 "
        : task.recycle
          ? "bg-emerald-200 hover:bg-emerald-300   dark:bg-[#224343]  hover:dark:bg-[#316161]"
          : "shadow-slate-200  dark:shadow-slate-500 dark:hover:bg-slate-600 dark:bg-slate-700 bg-slate-200 hover:bg-slate-300";
  return (
    <div
      className={`shadow-sm p-2 flex border-slate-300 flex-wrap gap-2 dark:border-slate-900 rounded-sm border ${backgroundClasses}`}
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
          value={task.name}
          onChange={handleNameChange}
        />
      </div>
      <button
        className="rounded  border border-black bg-red-400 bg-opacity-70 p-1 text-sm tracking-tighter hover:bg-opacity-100 
        active:bg-red-200 "
        onClick={() => handleRemoveTask(task)}
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
