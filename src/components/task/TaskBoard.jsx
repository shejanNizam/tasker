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
    priority: "High",
    isFavourite: true,
  };

  const [tasks, setTasks] = useState([initialTask]);
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [taskToUpdate, setTaskToUpdate] = useState(null);
  // console.log(taskToUpdate);

  const handleAddEditTask = (newTask, isAdd) => {
    if (isAdd) {
      setTasks([...tasks, newTask]);
    } else {
      setTasks(
        tasks.map((task) => {
          if (task.id === newTask.id) {
            return newTask;
          } else {
            return task;
          }
        })
      );
    }
    setShowAddTaskModal(false);
  };

  const handleEditTask = (task) => {
    setTaskToUpdate(task);
    setShowAddTaskModal(true);
  };

  const handleDeleteTask = (id) => {
    const tasksAfterDelete = tasks.filter((task) => task.id !== id);
    setTasks(tasksAfterDelete);
  };

  const handleCloseClick = () => {
    setShowAddTaskModal(false);
    setTaskToUpdate(null);
  };

  const handleFavourite = (id) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          return { ...task, isFavourite: !task.isFavourite };
        } else {
          return task;
        }
      })
    );
  };

  const handleSearch = (searchTerm) => {
    const filteredTasks = tasks.filter((task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setTasks([...filteredTasks]);
  };

  return (
    <>
      <section className="mb-20" id="tasks">
        {showAddTaskModal && (
          <AddTaskModal
            onSave={handleAddEditTask}
            taskToUpdate={taskToUpdate}
            onCloseClick={handleCloseClick}
          />
        )}

        <div className="container">
          <div className="p-2 flex justify-end">
            <SearchTask onSearch={handleSearch} />
          </div>

          <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
            {/* task actions */}
            <TaskActions onAddTask={() => setShowAddTaskModal(true)} />

            {/* task lists */}
            <TaskList
              tasks={tasks}
              onEdit={handleEditTask}
              onDelete={handleDeleteTask}
              onFav={handleFavourite}
            />
          </div>
        </div>
      </section>
    </>
  );
}
