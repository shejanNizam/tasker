import { useState } from "react";
import AddTaskModal from "./AddTaskModal";
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
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);

  const handleAddTask = (newTask) => {
    setTasks([...tasks, newTask]);
    setShowAddTaskModal(false);
    console.log("Adding a task...");
  };

  return (
    <>
      <section className="mb-20" id="tasks">
        {showAddTaskModal && <AddTaskModal onSave={handleAddTask} />}

        <div className="container">
          <div className="p-2 flex justify-end">
            <SearchTask />
          </div>

          <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
            {/* task actions */}
            <TaskActions onAddTask={() => setShowAddTaskModal(true)} />

            {/* task lists */}
            <TaskList tasks={tasks} setTasks={setTasks} />
          </div>
        </div>
      </section>
    </>
  );
}
