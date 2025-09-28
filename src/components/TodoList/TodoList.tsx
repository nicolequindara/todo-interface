import {
  Button,
  Card,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import { Todo, TodoStatus } from "../../modules/Todo/Todo.types";

import { Add } from "@mui/icons-material";
import { useMemo, useState } from "react";
import { useTodosContext } from "src/modules/contexts/TodoContext";
import { isOverDue } from "../../utils";
import { AddTodoModal } from "../AddTodoModal/AddTodoModal";
import { FilterMode, FunctionBar } from "../FunctionBar/FunctionBar";
import TodoListItem from "./TodoListItem";

export function TodoList() {
  const { todos, loading } = useTodosContext();

  const [addTodoModalOpen, setAddTodoModalOpen] = useState<boolean>(false);
  const openAddTodoModal = () => {
    setAddTodoModalOpen(true);
  };
  const closeAddTodoModal = () => {
    setAddTodoModalOpen(false);
  };

  const [filterMode, setFilterMode] = useState<FilterMode>(FilterMode.None);
  const filteredTodos = useMemo(() => {
    console.log(todos);
    switch (filterMode) {
      case FilterMode.Active:
        return todos.filter((t) => t.status === TodoStatus.ACTIVE);
      case FilterMode.Completed:
        return todos.filter((t) => t.status === TodoStatus.COMPLETED);
      case FilterMode.Overdue:
        return todos.filter((t) => isOverDue(t.status, t.dueDate));
      case FilterMode.None:
      default:
        return todos;
    }
  }, [todos, filterMode]);

  return (
    <Stack gap={2} p={4} width="80%">
      <TodoListHeader
        onAddTodo={openAddTodoModal}
        setFilterMode={(mode: FilterMode) => {
          setFilterMode(mode);
        }}
        filterMode={filterMode}
      />
      <TodoListInner loading={loading} todos={filteredTodos} />
      <AddTodoModal open={addTodoModalOpen} handleClose={closeAddTodoModal} />
    </Stack>
  );
}

interface TodoListInnerProps {
  todos: Todo[];
  loading: boolean;
}

function TodoListInnerEmptyState() {
  return (
    <Card>
      <Stack p={8} alignItems="center" justifyContent="center">
        <Typography>No Tasks</Typography>
      </Stack>
    </Card>
  );
}
function TodoListInner({ todos, loading }: TodoListInnerProps) {
  console.log("TodosListInner", todos);
  if (loading) {
    return (
      <Stack p={4} alignContent="center" alignItems="center">
        <CircularProgress />
      </Stack>
    );
  }

  if (todos.length === 0) {
    return <TodoListInnerEmptyState />;
  }
  return (
    <Stack spacing={1}>
      {todos.map((todo) => (
        <TodoListItem todo={todo} />
      ))}
    </Stack>
  );
}

interface TodoListHeaderProps {
  onAddTodo: () => void;
  filterMode: FilterMode;
  setFilterMode: (mode: FilterMode) => void;
}

function TodoListHeader({
  onAddTodo,
  filterMode,
  setFilterMode,
}: TodoListHeaderProps) {
  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between">
      <Typography variant="h5" fontWeight={"bold"}>
        Task List
      </Typography>
      <Stack direction="row" alignItems="center" spacing={2}>
        <FunctionBar filterMode={filterMode} setFilterMode={setFilterMode} />
        <Button startIcon={<Add />} variant="contained" onClick={onAddTodo}>
          Add
        </Button>
      </Stack>
    </Stack>
  );
}

export default TodoList;
