import { useQuery } from "@tanstack/react-query";
import "./App.css";

type Todo = { userId: number; id: number; title: string; completed: boolean };

const getTodos = async (): Promise<Todo[]> => {
  await new Promise((r) => setTimeout(r, 1500)); // simulate delay
  const res = await fetch("https://jsonplaceholder.typicode.com/todos");
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
};

export default function App() {
  const { data, isLoading, isError, error, isFetching, refetch } = useQuery<
    Todo[],
    Error
  >({
    queryKey: ["todos"],
    queryFn: getTodos,
    retry: 0,
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <p className="center">Loading...</p>;
  if (isError) return <p className="center">Error: {error.message}</p>;

  return (
    <div className="layout">
      <div className="todo-panel">
        <h2>To-Do List {isFetching && <small>(Refreshing…)</small>}</h2>
        <ul className="todo-list">
          {data?.slice(0, 10).map((todo) => (
            <li key={todo.id} className="todo-item">
              <span>{todo.title}</span>
              <span className={todo.completed ? "done" : "pending"}>
                {todo.completed ? "✅" : "⏳"}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="side-panel">
        <h3>Status Panel</h3>
        <p>Total Todos: {data?.length}</p>
        <p>Completed: {data?.filter((t) => t.completed).length}</p>
        <p>Pending: {data?.filter((t) => !t.completed).length}</p>
        <button onClick={() => refetch()} disabled={isFetching}>
          {isFetching ? "Refetching…" : "Refetch"}
        </button>
      </div>
    </div>
  );
}
