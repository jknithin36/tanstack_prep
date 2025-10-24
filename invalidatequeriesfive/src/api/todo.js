import supabase from "../utils/supabase";

export async function getTodos() {
  const { data, error } = await supabase
    .from("todos")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.log(error);
    throw new Error("something went wrong");
  }
  return data || [];
}

export async function createTodo(title) {
  const { data, error } = await supabase
    .from("todos")
    .insert({ title })
    .select()
    .single();

  if (error) throw error;
  return data;
}

// update edit title

export async function updateTitle(id, title) {
  const { data, error } = await supabase
    .from("todos")
    .update({ title })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function toggleTodoDone(id) {
  const { data: cur, error: e1 } = await supabase
    .from("todos")
    .select("done")
    .eq("id", id)
    .single();
  if (e1) throw e1;

  const { data, error } = await supabase
    .from("todos")
    .update({ done: !cur.done })
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteTodo(id) {
  const { error } = await supabase.from("todos").delete().eq("id", id);
  if (error) throw error;
  return true;
}
