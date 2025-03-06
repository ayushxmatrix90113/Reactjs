import { useEffect, useState } from 'react';
import { TodoProvider } from './contexts';
import TodoForm from './components/Todoform';
import TodoItem from './components/Todoitem';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev]);
  };

  const updateTodo = (id, todo) => {
    setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === id ? { ...todo, id } : prevTodo)));
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === id ? { ...prevTodo, completed: !prevTodo.completed } : prevTodo
      )
    );
  };

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem('todos'));
    if (todos && todos.length > 0) {
      setTodos(todos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  return (
    <TodoProvider value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}>
      <div className="bg-[#0f172a] min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-2xl bg-[#1e293b] text-white shadow-lg rounded-lg p-8 space-y-6">
          <h1 className="text-4xl font-extrabold text-center">🚀 Todo List</h1>
          <TodoForm />
          <div className="mt-4 space-y-4 max-h-[60vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
            {todos.length ? (
              todos.map((todo) => <TodoItem key={todo.id} todo={todo} />)
            ) : (
              <p className="text-center text-gray-400">No todos yet! Start by adding one above. ✨</p>
            )}
          </div>
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;
