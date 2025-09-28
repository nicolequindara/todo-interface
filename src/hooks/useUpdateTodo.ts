import { Todo } from "../modules/Todo/Todo.types";
import { useApi } from "./useApi";

export const useUpdateTodo = () => {
  const { fetchData, data, loading, error } = useApi<Todo, Todo>();

  const updateTodo = (todo: Todo) => {
    return fetchData(`/api/todos/${todo.id}`, "PUT", todo);
  };

  return { updateTodo, data, loading, error };
};
