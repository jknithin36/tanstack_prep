import {
  keepPreviousData,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import React, { useEffect, useState } from "react";

async function getTodos(page, limit) {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}`
  );
  if (!res.ok) throw new Error("Something went wrong");

  const total = Number(res.headers.get("x-total-count") ?? "0");

  const data = await res.json();
  return { data, total };
}

const App = () => {
  const qc = useQueryClient();
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["todos", { page, limit }],
    queryFn: () => getTodos(page, limit),
    placeholderData: keepPreviousData,
    staleTime: 5000,
  });

  const total = data?.total ?? 0;
  const pageCount = Math.max(1, Math.ceil(total / limit));

  // Prefetch next page
  useEffect(() => {
    if (page < pageCount) {
      qc.prefetchQuery({
        queryKey: ["todos", { page: page + 1, limit }],
        queryFn: () => getTodos(page + 1, limit),
      });
    }
  }, [page, pageCount, limit, qc]);

  if (isPending && !data) return <p>....loading</p>;
  if (isError)
    return (
      <p>
        ....Error: {error instanceof Error ? error.message : "Unknown error"}
      </p>
    );

  return (
    <div>
      <h2>Paginated posts</h2>

      <ul>
        {data?.data?.map((p) => (
          <li
            key={p.id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              marginBottom: "5px",
            }}
          >
            <strong>{p.title}</strong>
            <p>{p.body}</p>
          </li>
        ))}
      </ul>

      <div>
        <button
          disabled={page === 1}
          onClick={() => setPage((prev) => Math.max(1, prev - 1))}
        >
          Prev
        </button>
        <span style={{ margin: "0 8px" }}>
          {page} / {pageCount}
        </span>
        <button
          disabled={page === pageCount}
          onClick={() => setPage((prev) => Math.min(pageCount, prev + 1))}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default App;

// import React, { useEffect, useState } from "react";
// import {
//   keepPreviousData,
//   useQuery,
//   useQueryClient,
// } from "@tanstack/react-query";

// /* ----------------------------- Fetch function ----------------------------- */
// async function getTodos(page, limit) {
//   const res = await fetch(
//     `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}`
//   );
//   if (!res.ok) throw new Error("Something went wrong");
//   const total = Number(res.headers.get("x-total-count") ?? "0");
//   const data = await res.json();
//   return { data, total };
// }

// /* ----------------------------- Skeleton Loader ----------------------------- */
// function SkeletonCard() {
//   return (
//     <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
//       <div className="mb-3 h-5 w-3/4 animate-pulse rounded bg-slate-200" />
//       <div className="mb-2 h-4 w-full animate-pulse rounded bg-slate-200" />
//       <div className="h-4 w-2/3 animate-pulse rounded bg-slate-200" />
//     </div>
//   );
// }

// /* ---------------------------------- App ---------------------------------- */
// const Pagination = () => {
//   const qc = useQueryClient();
//   const [page, setPage] = useState(1);
//   const limit = 9; // 3 per row * 3 rows

//   const { data, isPending, isError, error, isFetching, refetch } = useQuery({
//     queryKey: ["todos", { page, limit }],
//     queryFn: () => getTodos(page, limit),
//     placeholderData: keepPreviousData,
//     staleTime: 5000,
//   });

//   const total = data?.total ?? 0;
//   const pageCount = Math.max(1, Math.ceil(total / limit));

//   // Prefetch next page
//   useEffect(() => {
//     if (page < pageCount) {
//       qc.prefetchQuery({
//         queryKey: ["todos", { page: page + 1, limit }],
//         queryFn: () => getTodos(page + 1, limit),
//       });
//     }
//   }, [page, pageCount, limit, qc]);

//   if (isPending && !data) {
//     return (
//       <div className="min-h-screen bg-slate-50 px-6 py-10">
//         <h1 className="text-center text-2xl font-bold text-slate-900">
//           Loading posts...
//         </h1>
//         <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
//           {Array.from({ length: limit }).map((_, i) => (
//             <SkeletonCard key={i} />
//           ))}
//         </div>
//       </div>
//     );
//   }

//   if (isError) {
//     return (
//       <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 text-center text-slate-700">
//         <p className="text-lg font-semibold text-red-600">
//           Error: {error instanceof Error ? error.message : "Unknown error"}
//         </p>
//         <button
//           onClick={() => refetch()}
//           className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400"
//         >
//           Retry
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-slate-50 px-6 py-10 text-slate-900">
//       <div className="mx-auto max-w-6xl">
//         <h1 className="text-center text-3xl font-bold tracking-tight">
//           Paginated Posts
//         </h1>

//         {/* Cards */}
//         <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
//           {(isPending ? Array.from({ length: limit }) : data?.data)?.map(
//             (p, idx) =>
//               isPending ? (
//                 <SkeletonCard key={`s-${idx}`} />
//               ) : (
//                 <div
//                   key={p.id}
//                   className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
//                 >
//                   <h3 className="line-clamp-2 text-base font-semibold text-slate-900">
//                     {p.title}
//                   </h3>
//                   <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-600">
//                     {p.body}
//                   </p>
//                   <div className="mt-4 flex items-center justify-between">
//                     <span className="text-xs text-slate-400">#{p.id}</span>
//                     <button
//                       onClick={() => alert(`Post ${p.id}`)}
//                       className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 opacity-0 transition group-hover:opacity-100 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-300"
//                     >
//                       View
//                     </button>
//                   </div>
//                 </div>
//               )
//           )}
//         </div>

//         {/* Pagination */}
//         <div className="mt-10 flex items-center justify-center gap-3">
//           <button
//             disabled={page === 1}
//             onClick={() => setPage((prev) => Math.max(1, prev - 1))}
//             className="inline-flex h-9 items-center rounded-lg border border-slate-300 bg-white px-4 text-sm font-medium text-slate-700 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-slate-300"
//           >
//             Prev
//           </button>

//           <span className="text-sm font-semibold text-slate-700">
//             {page} / {pageCount}
//           </span>

//           <button
//             disabled={page === pageCount}
//             onClick={() => setPage((prev) => Math.min(pageCount, prev + 1))}
//             className="inline-flex h-9 items-center rounded-lg border border-slate-300 bg-white px-4 text-sm font-medium text-slate-700 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-slate-300"
//           >
//             Next
//           </button>
//         </div>

//         {/* Background Fetching Hint */}
//         {isFetching && !isPending && (
//           <p className="mt-4 text-center text-xs text-slate-400">
//             Fetching fresh data...
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Pagination;
