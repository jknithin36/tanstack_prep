import React, { useEffect, useRef, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";

const BASE = "https://jsonplaceholder.typicode.com";

async function getPosts({ pageParam = 0, limit = 10 }) {
  const res = await fetch(`${BASE}/posts?_start=${pageParam}&_limit=${limit}`);
  if (!res.ok) throw new Error("Failed to fetch data");
  const data = await res.json();

  return {
    items: data,
    nextCursor: data.length === limit ? pageParam + limit : undefined,
  };
}

function useIntersection(options) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, options);

    observer.observe(element);
    return () => observer.disconnect();
  }, [options]);

  return { ref, isVisible };
}

const LIMIT = 10;

const InfiniteScroll = () => {
  const {
    data,
    error,
    status,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
  } = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: ({ pageParam = 0 }) => getPosts({ pageParam, limit: LIMIT }),
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialPageParam: 0,
  });

  const { ref, isVisible } = useIntersection({ threshold: 1 });

  useEffect(() => {
    if (isVisible && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [isVisible, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (status === "pending") return <p>Loading...</p>;
  if (status === "error") return <p>{error.message}</p>;

  return (
    <div style={{ maxWidth: "700px", margin: "20px auto", padding: "0 16px" }}>
      <h2>Infinite Scrolling Example</h2>

      {data.pages.map((page, index) => (
        <React.Fragment key={index}>
          {page.items.map((post) => (
            <div
              key={post.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "10px",
                margin: "10px 0",
                padding: "12px 16px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
              }}
            >
              <h4>
                {post.id}. {post.title}
              </h4>
              <p>{post.body}</p>
            </div>
          ))}
        </React.Fragment>
      ))}

      {hasNextPage ? (
        <button
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
          style={{
            padding: "8px 16px",
            borderRadius: "8px",
            border: "1px solid #ddd",
            cursor: "pointer",
            display: "block",
            margin: "12px auto",
          }}
        >
          {isFetchingNextPage ? "Loading more..." : "Load More"}
        </button>
      ) : (
        <p style={{ textAlign: "center" }}>No more posts 🎉</p>
      )}

      {hasNextPage && <div ref={ref} style={{ height: "1px" }}></div>}

      {isFetching && !isFetchingNextPage && (
        <p style={{ textAlign: "center" }}>Updating...</p>
      )}
    </div>
  );
};

export default InfiniteScroll;
