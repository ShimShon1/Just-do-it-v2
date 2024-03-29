// File: taskForm.jsx

import { useState } from "react";
import { useAppContext } from "../AppContext";
type FormProps = {
  handleAddTask: (
    e: React.FormEvent<HTMLFormElement>,
    name: string
  ) => void;
};

export default function TaskForm({ handleAddTask }: FormProps) {
  let { keepText } = useAppContext();
  const [taskName, setTaskName] = useState("");

  return (
    <form
      onSubmit={d => {
        handleAddTask(d, taskName);
        if (!keepText) {
          setTaskName("");
        }
      }}
      className="m-auto mt-2 grid grid-cols-[1fr,auto]   gap-2 overflow-hidden sm:w-3/4 "
    >
      <input
        onChange={e => setTaskName(e.target.value)}
        value={taskName}
        placeholder="Your task here..."
        type="text"
        className="w-full rounded border border-black py-1  pl-2 dark:border-slate-200 dark:bg-slate-500 "
      />
      <button className="w-full rounded border border-black bg-slate-200 px-3 py-1 hover:bg-slate-300 dark:border-gray-600 dark:bg-slate-800 ">
        add
      </button>
    </form>
  );
}
