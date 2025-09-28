import { Error, ExpandMore, Warning } from "@mui/icons-material";
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Button,
  Checkbox,
  Chip,
  Divider,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { useDeleteTodo } from "src/hooks/useDeleteTodo";
import { useUpdateTodo } from "src/hooks/useUpdateTodo";
import { useTodosContext } from "src/modules/contexts/TodoContext";
import { Todo, TodoStatus } from "../../modules/Todo/Todo.types";
import { formatDate, isDueTomorrow, isOverDue } from "../../modules/Todo/utils";

export interface TodoListItemProps {
  todo: Todo;
}

export function TodoListItem({ todo }: TodoListItemProps) {
  const { updateTodo } = useUpdateTodo();
  const { setTodos } = useTodosContext();

  const onChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();

    // optimistic update
    setTodos((prev) => {
      return prev.map((t) => {
        if (t.id !== todo.id) {
          return t;
        }
        return {
          ...t,
          status: event.target.checked
            ? TodoStatus.COMPLETED
            : TodoStatus.ACTIVE,
        };
      });
    });

    // persist to db
    updateTodo({
      ...todo,
      status: event.target.checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE,
    }); // TODO snackbar on error
  };

  const dueTomorrow = isDueTomorrow(todo.status, todo.dueDate);
  const overdue = isOverDue(todo.status, todo.dueDate);

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Stack direction="row" alignItems="center" width="100%" gap={1}>
          <Checkbox
            checked={todo.status === TodoStatus.COMPLETED}
            onChange={onChecked}
            onClick={(event) => {
              event.stopPropagation();
            }}
          />
          <Typography sx={{ flex: 1 }} variant="body1">
            {todo.title}
          </Typography>
          {overdue && (
            <Tooltip title="Overdue">
              <Chip
                label={<Error sx={{ height: "18px" }} />}
                sx={{ backgroundColor: "red", color: "white" }}
              />
            </Tooltip>
          )}
          {dueTomorrow && (
            <Tooltip title="Due tomorrow">
              <Chip
                label={<Warning sx={{ height: "18px" }} />}
                sx={{ backgroundColor: "orange", color: "white" }}
              />
            </Tooltip>
          )}
        </Stack>
      </AccordionSummary>
      <AccordionDetails>
        <Stack gap={1} px={2}>
          <Typography variant="body2">{todo.description}</Typography>
          <Divider sx={{ mt: 2 }} />
          <Typography fontSize={12} variant="subtitle2" color="#A9A9A9">
            Created on {formatDate(todo.createdDate)}
          </Typography>
          {todo.dueDate && (
            <Typography
              fontSize={12}
              variant="subtitle2"
              color={dueTomorrow || overdue ? "red" : "#A9A9A9"}
            >
              Due on {formatDate(todo.dueDate)}
            </Typography>
          )}
        </Stack>
      </AccordionDetails>
      <AccordionActions>
        <TodoListActions todo={todo} />
      </AccordionActions>
    </Accordion>
  );
}

interface TodoListActionsProps {
  todo: Todo;
}
export function TodoListActions({ todo }: TodoListActionsProps) {
  const { deleteTodo } = useDeleteTodo();
  const { setTodos } = useTodosContext();

  const onDelete = () => {
    deleteTodo(todo); // TODO snackbar on error
    setTodos((prev) => {
      return prev.filter((t) => t.id !== todo.id);
    });
  };

  return (
    <Stack direction="row" spacing={2} pb={2}>
      <Button sx={{ color: "red" }} onClick={onDelete}>
        Delete
      </Button>
    </Stack>
  );
}

export default TodoListItem;
