/* eslint-disable @typescript-eslint/no-explicit-any */


"use client";

import { useState, useEffect, useRef } from "react";
import {CrudLibrary} from "jeet-kiit-crud";
import toast, { Toaster } from "react-hot-toast";

export default function TodoPage() {
  const [todos, setTodos] = useState<any[]>([]);
  const [value, setValue] = useState("");
  const [editId, setEditId] = useState<string | null>(null);
  const [credits, setCredits] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const apiKey = sessionStorage.getItem("api-key")!;
  const apiUrl = sessionStorage.getItem("api-url")!;

  const crud = CrudLibrary({ apiKey, apiUrl });

  // Focus input on load and when switching to edit mode
  useEffect(() => {
    inputRef.current?.focus();
  }, [editId]);

  //Get Credits
  const refreshCredits = async () => {
    try {
      const res = await crud.getCredits();
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
        const res = await crud.getAll();
        setTodos(res);
      } catch (err: any) {
        // if(err?.response?.status == 429){
        //   toast.error("Request limit exceeded. Please recharge credits.");
        // }
        toast.error(err?.response?.data?.error || "Error fetching todos");
      }
    };
    fetchTodos();
  }, []);

  const handleCreate = async () => {
    if (!value.trim()) return toast.error("Please enter a todo.");
    try {
      const txHash = Math.random().toString(36).substring(2);
      const res = await crud.create({ value, txHash });
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
      await crud.update(editId!, { value });
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
      await crud.remove(id);
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
    <main className="min-h-screen px-6 py-10 max-w-md mx-auto bg-gradient-to-br from-blue-50 via-white to-green-50 text-zinc-900 transition shadow-xl rounded-3xl border border-blue-100">
      <Toaster position="top-right" />

      <h1 className="text-4xl font-extrabold mb-10 text-center text-blue-700 drop-shadow-sm">
        📝 FormPilot Todos
      </h1>

      <div className="flex gap-3 mb-6">
        <input
          ref={inputRef}
          className="flex-1 border border-blue-200 bg-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 text-base shadow-sm transition"
          placeholder="Write a task..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button
          onClick={editId ? handleUpdate : handleCreate}
          className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-5 py-3 rounded-xl font-semibold shadow-md transition cursor-pointer"
        >
          {editId ? "Update" : "Add"}
        </button>
      </div>

      <div className="mb-4 text-center">
        <span className="inline-block bg-blue-100 text-blue-800 px-4 py-1.5 rounded-full text-sm shadow-sm">
          🔋 Requests Used: {credits}/4
        </span>
      </div>

      <ul className="mt-6 space-y-3">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="border border-zinc-200 rounded-xl px-5 py-4 flex justify-between items-center bg-white shadow-md transition duration-200 hover:bg-blue-50"
          >
            <span className="truncate max-w-[60%] text-lg text-zinc-800 font-medium">
              {todo.value}
            </span>
            <div className="flex gap-3 text-sm font-medium">
              <button
                className="text-blue-500 hover:text-blue-700 transition cursor-pointer"
                onClick={() => handleEdit(todo.id, todo.value)}
              >
                Edit
              </button>
              <button
                className="text-red-500 hover:text-red-700 transition cursor-pointer"
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
