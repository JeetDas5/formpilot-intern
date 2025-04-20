"use client";

import { useState, useEffect, useRef } from "react";
import * as Crublibrary from "jeet-kiit-crud";
import toast, { Toaster } from "react-hot-toast";

export default function Home() {
  const [todos, setTodos] = useState<any[]>([]);
  const [value, setValue] = useState("");
  const [editId, setEditId] = useState<string | null>(null);
  const [credits, setCredits] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input on load and when switching to edit mode
  useEffect(() => {
    inputRef.current?.focus();
  }, [editId]);

  //Get Credits
  const refreshCredits = async () => {
    try {
      const res = await Crublibrary.getCredits();
      setCredits(res.requestCount);
    } catch (err: any) {
      toast.error(err?.response?.data?.error || "Error fetching credits");
    }
  };

  useEffect(() => {
    refreshCredits();
  }, []);

  // Fetch all todos on load
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await Crublibrary.getAll();
        setTodos(res);
      } catch (err: any) {
        toast.error(err?.response?.data?.error || "Error fetching todos");
      }
    };
    fetchTodos();
  }, []);

  const handleCreate = async () => {
    if (!value.trim()) return toast.error("Please enter a todo.");
    try {
      const txHash = Math.random().toString(36).substring(2);
      const res = await Crublibrary.create({ value, txHash });
      const newTodo = { id: res.id, value, txHash };
      const updated = [...todos, newTodo];

      setTodos(updated);

      setValue("");
      toast.success("Todo created!");
    } catch (err: any) {
      toast.error(err?.response?.data?.error || "Error creating todo");
    }
    await refreshCredits();
  };

  const handleUpdate = async () => {
    if (!value.trim()) return toast.error("Please enter a todo.");
    try {
      await Crublibrary.update(editId!, { value });
      const updated = todos.map((t) => (t.id === editId ? { ...t, value } : t));
      setTodos(updated);
      setValue("");
      setEditId(null);
      toast.success("Todo updated!");
    } catch {
      toast.error("Error updating todo");
    }
    await refreshCredits();
  };

  const handleDelete = async (id: string) => {
    try {
      await Crublibrary.remove(id);
      const updated = todos.filter((t) => t.id !== id);
      setTodos(updated);
      toast.success("Todo deleted!");
    } catch (error: any) {
      toast.error(error.message);
    }
    await refreshCredits();
  };

  const handleEdit = (id: string, current: string) => {
    setEditId(id);
    setValue(current);
  };

  return (
    <main className="min-h-screen px-6 py-10 max-w-md mx-auto bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white transition">
      <Toaster position="top-right" />
      <h1 className="text-3xl font-bold mb-8 text-center">
        📝 FormPilot Todos
      </h1>

      <div className="flex gap-2">
        <input
          ref={inputRef}
          className="flex-1 border border-zinc-300 dark:border-zinc-700 bg-transparent px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Write a task..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button
          onClick={editId ? handleUpdate : handleCreate}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition cursor-pointer"
        >
          {editId ? "Update" : "Add"}
        </button>
      </div>

      <div>
        <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm mt-4">
          🔋 Requests Used: {credits}/4
        </span>
      </div>

      <ul className="mt-6 space-y-3">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="border border-zinc-300 dark:border-zinc-700 rounded px-4 py-2 flex justify-between items-center"
          >
            <span className="truncate max-w-[60%]">{todo.value}</span>
            <div className="flex gap-2 text-sm">
              <button
                className="text-blue-500 hover:underline cursor-pointer"
                onClick={() => handleEdit(todo.id, todo.value)}
              >
                Edit
              </button>
              <button
                className="text-red-500 hover:underline cursor-pointer"
                onClick={() => handleDelete(todo.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
