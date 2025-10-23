import React, { Suspense } from "react";
import Todos from "./Todos";
import Loading from "./loading";

export default function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Todos />
    </Suspense>
  );
}
