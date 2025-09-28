import { Alert, Card, CircularProgress, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { Todo } from "../../modules/Todo/Todo.types";
import TodoListItem from "./TodoListItem";

interface TodoListInnerProps {
  todos: Todo[];
  loading: boolean;
  error?: Error | null;
}

export function TodoListInnerEmptyState() {
  return (
    <Card>
      <Stack p={8} alignItems="center" justifyContent="center">
        <Typography>No Tasks</Typography>
      </Stack>
    </Card>
  );
}
function TodoListInner({ todos, loading, error }: TodoListInnerProps) {
  if (error) {
    return <Alert severity="error">{error.message}</Alert>;
  }
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

export default TodoListInner;
