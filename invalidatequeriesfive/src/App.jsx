import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import {
  createTodo,
  deleteTodo,
  getTodos,
  toggleTodoDone,
  updateTitle,
} from "./api/todo";
import TodoItem from "./TodoItem";

const App = () => {
  const qc = useQueryClient();

  const [title, setTitle] = useState("");
  const { data } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
    initialData: [],
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  // use mutation

  // create

  const createMutation = useMutation({
    mutationFn: (t) => createTodo(t),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["todos"] }),
  });

  // updateTitle
  const renameMut = useMutation({
    mutationFn: ({ id, title }) => updateTitle(id, title),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["todos"] }),
  });

  // update: toggle
  const toggleMut = useMutation({
    mutationFn: (id) => toggleTodoDone(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["todos"] }),
  });

  // Delete todo
  const deleteMut = useMutation({
    mutationFn: (id) => deleteTodo(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["todos"] }),
  });

  // Create function

  function handleAddTodo(e) {
    e.preventDefault();
    if (!title.trim()) return;
    createMutation.mutate(title);
    setTitle("");
  }
  console.log(data);
  return (
    <div>
      <h1>Hi Nithin!</h1>

      <form onSubmit={handleAddTodo}>
        <label htmlFor="title">
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Enter Wany tou want to do"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <button type="submit" disabled={createMutation.isPending}>
          {createMutation.isPending ? "…" : "Add"}
        </button>
      </form>
      <div>
        <ul style={{ display: "grid", gap: 8 }}>
          {data?.map((t) => (
            <TodoItem
              key={t.id}
              todo={t}
              onToggle={() => toggleMut.mutate(t.id)}
              onDelete={() => deleteMut.mutate(t.id)}
              onRename={(newTitle) =>
                renameMut.mutate({ id: t.id, title: newTitle })
              }
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
