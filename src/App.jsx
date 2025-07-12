import { useState, useEffect } from 'react';
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Navbar from './components/Navbar';
import './App.css';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todo, setTodo] = useState('');
  const [ShowFinised, setShowFinised] = useState(true)
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleAdd = () => {
    if (todo.trim() === '') return;
    const newTodo = { id: uuidv4(), todo: todo, isCompleted: false };
    setTodos(prev => [...prev, newTodo]);
    setTodo('');
  };

  const handleDelete = (id) => {
    setTodos(todos.filter(t => t.id !== id));
  };

  const handleEdit = (id) => {
    const toEdit = todos.find(t => t.id === id);
    if (toEdit) {
      setTodo(toEdit.todo);
      setTodos(todos.filter(t => t.id !== id));
    }
  };

  const handleCheck = (id) => {
    const updated = todos.map(t =>
      t.id === id ? { ...t, isCompleted: !t.isCompleted } : t
    );
    setTodos(updated);
  };

  const handleFinish = (e) => {
    setShowFinised(!ShowFinised)
  }


  return (
    <>
      <Navbar />
      <div className="mx-5 md:container md:mx-auto bg-violet-100 my-5 rounded-xl p-5 min-h-[80vh] md:w-1/2">
        <div className="addTodo my-5">
          <h2 className="text-lg font-bold">Add a Todo</h2>
          <div className="flex">
            <input
              type="text"
              value={todo}
              onChange={(e) => setTodo(e.target.value)}
              className="bg-white w-3/4 p-2 rounded-md border"
            />
            <button
              onClick={handleAdd} disabled={todo.length < 3}
              className="bg-blue-400 hover:bg-blue-700 disabled:bg-blue-400 text-white p-3 py-1 ml-3 rounded-2xl hover:cursor-pointer"
            >
              Save
            </button>
          </div>
        </div>
        <input onChange={handleFinish} type="checkbox" checked={ShowFinised} className="mr-3 mb-5" />Show Finised Tasks
        <h2 className="text-lg font-bold">Your Todo's</h2>
        <div className="todos">
          {todos.map(item => (
            (ShowFinised || !item.isCompleted) && <div key={item.id} className="todo flex md:w-full justify-between mt-6">
              <div className="flex gap-5">
                <input
                  type="checkbox"
                  checked={item.isCompleted}
                  onChange={() => handleCheck(item.id)}
                />
                <div className={item.isCompleted ? 'line-through' : ''}>
                  {item.todo}
                </div>
              </div>
              <div className="buttons flex h-full">
                <button
                  onClick={() => handleEdit(item.id)}
                  className="bg-green-400 hover:bg-green-700 text-white p-3 py-1 ml-3 rounded-4xl hover:cursor-pointer"
                >
                  <FaRegEdit />
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="bg-red-400 hover:bg-red-700 size-10 rounded-full text-white p-3 py-1 ml-3 hover:cursor-pointer"
                >
                  <MdDelete />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
