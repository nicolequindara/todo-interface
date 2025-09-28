import { BaseTodo, Todo } from "../modules/Todo/Todo.types";
import { useApi } from "./useApi";

export const useDeleteTodo = () => {
  const { fetchData, data, loading, error } = useApi<Todo, BaseTodo>();

  const deleteTodo = (todo: Todo) => {
    return fetchData(`/api/todos/${todo.id}`, 'DELETE', todo);
  };

  return { deleteTodo, data, loading, error };
};