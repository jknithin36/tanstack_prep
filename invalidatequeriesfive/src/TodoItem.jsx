import { useState } from "react";

export default function TodoItem({ todo, onToggle, onDelete, onRename }) {
  const [editing, setEditing] = useState(false);
  const [val, setVal] = useState(todo.title);

  function save() {
    const next = val.trim();
    if (next && next !== todo.title) onRename(next);
    setEditing(false);
  }

  return (
    <li style={{ border: "1px solid #ddd", borderRadius: 8, padding: 12 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <input type="checkbox" checked={todo.done} onChange={onToggle} />
        {editing ? (
          <input
            autoFocus
            value={val}
            onChange={(e) => setVal(e.target.value)}
            onBlur={save}
            onKeyDown={(e) => e.key === "Enter" && save()}
            style={{ flex: 1, padding: 6 }}
          />
        ) : (
          <span
            style={{
              textDecoration: todo.done ? "line-through" : "none",
              flex: 1,
            }}
            title="Double-click to rename"
            onDoubleClick={() => setEditing(true)}
          >
            {todo.title}
          </span>
        )}
        <button onClick={onDelete}>Delete</button>
      </div>
    </li>
  );
}
