import { useState } from "react";

export default function AddTaskModal({ onSave, taskToUpdate, onCloseClick }) {
  const [task, setTask] = useState(
    taskToUpdate || {
      id: crypto.randomUUID(),
      title: "",
      description: "",
      tags: [],
      priority: "",
      isFavourite: false,
    }
  );

  const [isAdd, setIsAdd] = useState(Object.is(taskToUpdate, null));
  console.log(setIsAdd);

  const handleChange = (e) => {
    const name = e.target.name;
    let value = e.target.value;

    if (name === "tags") {
      value = value.split(",");
    }

    setTask({
      ...task,
      [name]: value,
    });
  };

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/30 bg-opacity-70 z-40"></div>

      {/* Modal */}
      <form
        className="fixed z-50 top-1/2 left-1/2 w-full max-w-185
        -translate-x-1/2 -translate-y-1/2
        rounded-xl border border-[#FEFBFB]/36 bg-[#191D26]
        p-9 max-md:px-4 lg:p-11"
      >
        <h2 className="mb-9 text-center text-2xl font-bold text-white lg:text-[28px]">
          {isAdd ? "Add New Task" : "Edit Task"}
        </h2>

        <div className="space-y-9 text-white">
          <div>
            <label htmlFor="title">Title</label>
            <input
              className="block w-full rounded-md bg-[#2D323F] px-3 py-2.5"
              type="text"
              id="title"
              name="title"
              value={task.title}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="description">Description</label>
            <textarea
              className="block min-h-30 w-full rounded-md bg-[#2D323F] px-3 py-2.5"
              id="description"
              name="description"
              value={task.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="tags">Tags</label>
              <input
                className="block w-full rounded-md bg-[#2D323F] px-3 py-2.5"
                type="text"
                id="tags"
                name="tags"
                value={task.tags}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label htmlFor="priority">Priority</label>
              <select
                className="block w-full rounded-md bg-[#2D323F] px-3 py-2.5"
                id="priority"
                name="priority"
                value={task.priority}
                onChange={handleChange}
                required
              >
                <option value="">Select Priority</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
          </div>
        </div>

        <div className="mt-10 flex justify-between">
          <button
            className="rounded bg-red-600 px-6 py-2 text-white hover:opacity-80 cursor-pointer"
            onClick={onCloseClick}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded bg-blue-600 px-6 py-2 text-white hover:opacity-80 cursor-pointer"
            onClick={() => onSave(task, isAdd)}
          >
            Save
          </button>
        </div>
      </form>
    </>
  );
}
