import { useSuspenseQuery } from "@tanstack/react-query";
import queryClientTodos from "./queryClient";
import Posts from "./posts";

export default function Todos() {
  const { data } = useSuspenseQuery(queryClientTodos());
  return <Posts data={data} />;
}
