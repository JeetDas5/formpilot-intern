// "use client";

// import { useState } from "react";
// import { create, get, update, remove } from "jeet-kiit-crud";

// export default function Home() {
//   const [value, setValue] = useState("");
//   const [todos, setTodos] = useState<any[]>([]);
//   const [message, setMessage] = useState("");
//   const [messageType, setMessageType] = useState<"success" | "error">(
//     "success"
//   );

//   const handleCreate = async () => {
//     if (!value.trim()) {
//       setMessage("Please enter a task");
//       setMessageType("error");
//       return;
//     }

//     try {
//       const txHash = crypto.randomUUID(); // demo only
//       const res = await create({ value, txHash });
//       setTodos([...todos, { id: res.id, value, txHash }]);
//       setValue("");
//       setMessage("✅ Todo added!");
//       setMessageType("success");
//     } catch (err: any) {
//       setMessage(err?.response?.data?.error || "Something went wrong");
//       setMessageType("error");
//       console.error("Error creating todo:", err);
//     }
//   };

//   const handleDelete = async (id: string) => {
//     try {
//       await remove(id);
//       setTodos(todos.filter((t) => t.id !== id));
//       setMessage("✅ Todo deleted!");
//       setMessageType("success");
//     } catch (err: any) {
//       setMessage(err?.response?.data?.error || "Error deleting todo");
//       setMessageType("error");
//       console.error("Error deleting todo:", err);
//     }
//   };

//   return (
//     <main className="p-6 max-w-lg mx-auto space-y-4">
//       <h1 className="text-2xl font-bold">📝 Todo App</h1>

//       <div className="flex space-x-2">
//         <input
//           className="border p-2 w-full rounded"
//           placeholder="New task..."
//           value={value}
//           onChange={(e) => setValue(e.target.value)}
//           onKeyDown={(e) => e.key === "Enter" && handleCreate()}
//         />

//         <button
//           onClick={handleCreate}
//           className="bg-green-400 text-white font-semibold cursor-pointer px-4 py-2 rounded hover:bg-gray-800"
//         >
//           Add Todo
//         </button>
//       </div>

//       {message && (
//         <p
//           className={`text-sm ${messageType === "error" ? "text-red-500" : "text-green-500"}`}
//         >
//           {message}
//         </p>
//       )}

//       {todos.length === 0 ? (
//         <p className="text-gray-500 text-center py-4">
//           No todos yet. Add one above!
//         </p>
//       ) : (
//         <ul className="space-y-2">
//           {todos.map((todo) => (
//             <li
//               key={todo.id}
//               className="border p-3 rounded flex items-center justify-between"
//             >
//               <span>{todo.value}</span>
//               <button
//                 className="text-red-500 hover:text-red-700"
//                 onClick={() => handleDelete(todo.id)}
//               >
//                 Delete
//               </button>
//             </li>
//           ))}
//         </ul>
//       )}
//     </main>
//   );
// }
"use client";
import CrudeLibrary from "jeet-kiit-crud";

const Home = () => {
  const handleCreate = async () => {
    const data = { value: "test", txHash: "1234" };
    const result = await CrudeLibrary.create(data);
    console.log(result);
  };

  return (
    <button className="bg-cyan-900 cursor-pointer" onClick={handleCreate}>
      Create
    </button>
  );
};

export default Home;  
