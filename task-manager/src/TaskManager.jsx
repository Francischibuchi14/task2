import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { FaBars, FaMoon, FaSun } from "react-icons/fa";
import "./styles.css";


const initialTasks = [
  { id: "1", text: "Complete Redux setup", status: "todo" },
  { id: "2", text: "Design task UI", status: "inProgress" },
  { id: "3", text: "Optimize performance", status: "done" },
];

const TaskManager = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [taskText, setTaskText] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const addTask = () => {
    if (!taskText.trim()) return;
    setTasks([...tasks, { id: Date.now().toString(), text: taskText, status: "todo" }]);
    setTaskText("");
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const updatedTasks = [...tasks];
    const [movedTask] = updatedTasks.splice(result.source.index, 1);
    movedTask.status = result.destination.droppableId;
    updatedTasks.splice(result.destination.index, 0, movedTask);
    setTasks(updatedTasks);
  };

  return (
    <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"} min-h-screen p-6 flex flex-col md:flex-row`}> 
      {/* Sidebar */}
      <div className={`sidebar fixed top-0 left-0 h-full bg-gray-800 text-white p-4 transition-transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:relative md:translate-x-0 md:w-64`}>
        <button onClick={() => setSidebarOpen(false)} className="mb-4 md:hidden">close</button>
        <ul>
          <li className="mb-2">Dashboard</li>
          <li className="mb-2">Settings</li>
        </ul>
      </div>
      
      {/* Content */}
      <div className="flex flex-col w-full max-w-5xl mx-auto bg-blue-100">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <button onClick={() => setSidebarOpen(true)} className="text-2xl md:hidden">
            <FaBars />
          </button>
          <h1 className="text-3xl font-bold">Task Manager Dashboard</h1>
          <button onClick={() => setDarkMode(!darkMode)} className="text-2xl">
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>
        </div>
        
        {/* Add Task */}
        <div className="mt-6 flex gap-2 w-full max-w-md">
          <input
            type="text"
            value={taskText}
            onChange={(e) => setTaskText(e.target.value)}
            className="border p-2 flex-grow rounded"
            placeholder="Add a new task..."
          />
          <button onClick={addTask} className="bg-blue-500 text-white px-4 py-2 rounded">
            Add
          </button>
        </div>
        
        {/* Task Columns */}
        <div className="flex flex-col md:flex-row gap-4 w-full mt-6">
          <DragDropContext onDragEnd={onDragEnd}>
            {["todo", "inProgress", "done"].map((category) => (
              <Droppable key={category} droppableId={category}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="bg-white p-4 w-full md:w-1/3 min-h-[300px] shadow-lg rounded-lg"
                  >
                    <h2 className="text-xl font-semibold mb-4 capitalize">{category.replace(/([A-Z])/g, " $1")}</h2>
                    {tasks
                      .filter((task) => task.status === category)
                      .map((task, index) => (
                        <Draggable key={task.id} draggableId={task.id} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="p-3 bg-gray-200 rounded-lg mb-2 shadow flex justify-between items-center cursor-pointer"
                            >
                              {task.text}
                            </div>
                          )}
                        </Draggable>
                      ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            ))}
          </DragDropContext>
        </div>
      </div>
    </div>
  );
};

export default TaskManager;
