import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { Todo } from "../Todo/Todo.types";
import { useFetchTodos } from "src/hooks/useFetchTodos";

type TodosContextType = {
  todos: Todo[];
  loading: boolean;
  error: Error | null;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  refetch: () => void;
};

const TodosContext = createContext<TodosContextType | undefined>(undefined);

export const TodosProvider = ({ children }: { children: ReactNode }) => {
  const { refetch, data, loading, error } = useFetchTodos();
  const [todos, setTodos] = useState<Todo[]>([]);

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
    <TodosContext.Provider value={{ todos, loading, error, setTodos, refetch }}>
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
