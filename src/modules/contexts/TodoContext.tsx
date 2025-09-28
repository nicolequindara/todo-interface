import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from "react";
import { Todo } from "../Todo/Todo.types";
import { useApi } from "../../hooks/useApi";

type TodosContextType = {
  todos: Todo[];
  loading: boolean;
  error: Error | null;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

const TodosContext = createContext<TodosContextType | undefined>(undefined);

export const TodosProvider = ({ children }: { children: ReactNode }) => {
  const { fetchData, data, loading, error } = useApi<Todo[]>();

  const [todos, setTodos] = useState<Todo[]>([]);

  const refetch = useCallback(() => {
    fetchData(`/api/todos`);
  }, [fetchData]);

  // keep local state in sync with fetch
  useEffect(() => {
    if (data) {
      setTodos(data);
    }
  }, [data]);

  // fetch on mount
  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <TodosContext.Provider value={{ todos, loading, error, setTodos }}>
      {children}
    </TodosContext.Provider>
  );
};

export const useTodosContext = () => {
  const ctx = useContext(TodosContext);
  if (!ctx) {
    throw new Error("useTodosContext must be used within a TodosProvider");
  }
  return ctx;
};
