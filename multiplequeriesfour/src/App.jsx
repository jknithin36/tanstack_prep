import { useQueries } from "@tanstack/react-query";
import React from "react";

const fetchPosts = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  if (!res.ok) throw new Error("Failed to fetch posts");
  return res.json();
};

const fetchUsers = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json();
};

const App = () => {
  const results = useQueries({
    queries: [
      { queryKey: ["posts"], queryFn: fetchPosts },
      { queryKey: ["users"], queryFn: fetchUsers },
    ],
  });

  const [postsQuery, usersQuery] = results;

  if (postsQuery.isLoading || usersQuery.isLoading)
    return <p>Loading data...</p>;
  if (postsQuery.isError || usersQuery.isError)
    return <p>Error fetching data</p>;
  return (
    <div>
      <h2>Posts: {postsQuery.data.length}</h2>
      <h2>Users: {usersQuery.data.length}</h2>
    </div>
  );
};

export default App;
