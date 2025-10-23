const fetchTodos = async () => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const res = await fetch(`https://jsonplaceholder.typicode.com/todos`);

  if (!res.ok) throw new Error("Some thing went wrong");

  return res.json();
};

export default fetchTodos;
