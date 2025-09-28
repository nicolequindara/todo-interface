import { BaseTodo, Todo } from "../modules/Todo/Todo.types";
import { useApi } from "./useApi";

export const useCreateTodo = () => {
  const { fetchData, data, loading, error } = useApi<Todo, BaseTodo>();

  const createTodo = (todo: BaseTodo) => {
    return fetchData(`/api/todos/`, "POST", todo);
  };

  return { createTodo, data, loading, error };
};
