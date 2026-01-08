import { useState } from "react";
import SearchTask from "./SearchTask";
import TaskActions from "./TaskActions";
import TaskList from "./TaskList";

export default function TaskBoard() {
  const initialTask = {
    id: crypto.randomUUID(),
    title: "This is simple title This is simple title",
    description:
      "This is simple description for task This is simple description for task This is simple description for task",
    tags: ["app", "react", "native"],
    priority: "high",
    isFavourite: true,
  };

  const [tasks, setTasks] = useState([initialTask]);

  return (
    <>
      <section className="mb-20" id="tasks">
        <div className="container">
          <div className="p-2 flex justify-end">
            <SearchTask />
          </div>

          <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
            {/* task actions */}
            <TaskActions />

            {/* task lists */}
            <TaskList tasks={tasks} setTasks={setTasks} />
          </div>
        </div>
      </section>
    </>
  );
}
