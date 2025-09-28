import { useCallback, useEffect } from "react";
import { Todo } from "../modules/Todo/Todo.types";
import { useApi } from "./useApi";

export const useFetchTodos = () => {
  const { fetchData, data, loading, error } = useApi<Todo[], undefined>();

  const refetch = useCallback(() => {
    fetchData(`/api/todos`);
  }, [fetchData]);
  useEffect(() => {
    refetch();
  }, [refetch]);

  return { data, loading, error, refetch };
};
