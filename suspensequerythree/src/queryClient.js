import fetchTodos from "./api";

export default function queryClientTodos() {
  return {
    queryKey: ["todos"],
    queryFn: fetchTodos,
  };
}
