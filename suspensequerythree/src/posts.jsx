// posts.jsx
import React from "react";

const Posts = ({ data }) => {
  return (
    <div>
      <h1>Todos</h1>
      <ul>
        {data?.slice(0, 10).map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Posts;
