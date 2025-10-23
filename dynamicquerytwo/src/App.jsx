import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import "./App.css";

const fetchPost = async (id) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  if (!res.ok) throw new Error("Something went wrong");
  return res.json();
};

export default function App() {
  const [postId, setPostId] = useState(1);

  const { data, isLoading, isError, error, isFetching, refetch } = useQuery({
    queryKey: ["post", postId],
    queryFn: () => fetchPost(postId),
    enabled: !!postId,
    keepPreviousData: true,
    staleTime: 10_000,
    refetchOnWindowFocus: false,
  });

  const handlePrev = () => setPostId((p) => Math.max(1, p - 1));
  const handleNext = () => setPostId((p) => Math.min(100, p + 1));

  if (isLoading) return <p className="loading">Loading post {postId}…</p>;
  if (isError) return <p className="error">Error: {error.message}</p>;

  return (
    <div className="container">
      <div className="card">
        <h2>
          {data?.title}{" "}
          {isFetching && <small className="subtle"> (refreshing…)</small>}
        </h2>

        <div className="post">
          <p className="subtle">{data?.body}</p>
        </div>

        <div className="toolbar">
          <button
            className="btn"
            onClick={handlePrev}
            disabled={postId === 1 || isFetching}
          >
            Prev
          </button>
          <button
            className="btn"
            onClick={() => refetch()}
            disabled={isFetching}
          >
            {isFetching ? "Refetching…" : "Refetch"}
          </button>
          <button
            className="btn"
            onClick={handleNext}
            disabled={postId === 100 || isFetching}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
