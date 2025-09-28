import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs, { Dayjs } from "dayjs";
import { useCreateTodo } from "../../hooks/useCreateTodo";
import { BaseTodo, Todo, TodoStatus } from "src/modules/Todo/Todo.types";
import { useTodosContext } from "src/modules/contexts/TodoContext";
import { useEffect } from "react";

export interface AddTodoModalProps {
  open: boolean;
  handleClose: () => void;
}

interface TodoFormShape {
  title: string;
  description?: string;
  dueDate?: Date;
}

export function AddTodoModal({ open, handleClose }: AddTodoModalProps) {
  const { todos, setTodos, refetch } = useTodosContext();
  const {
    control,
    handleSubmit,
  } = useForm<TodoFormShape>({
    defaultValues: { 
      title: "",
     },
    mode: "onSubmit", // validate on submit
  });
  const { createTodo, data } = useCreateTodo();

  const submitHandler: SubmitHandler<TodoFormShape> = async (data) => {
    var todo: BaseTodo = {
      ...data,
      status: TodoStatus.ACTIVE,
      createdDate: new Date(),
      dueDate: !!data.dueDate ? new Date(data.dueDate): undefined,
    }
     await createTodo(todo).then(() => { refetch(); })
    handleClose();
  };

  return (
      <Dialog
        maxWidth="lg"
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
      >
        <form onSubmit={handleSubmit(submitHandler)}>
          <DialogTitle id="alert-dialog-title">Add Todo</DialogTitle>
          <DialogContent>
            <Stack p={2} spacing={2}>
              <Controller
                name="title"
                control={control}
                rules={{ required: "Title is required" }}
                render={({ field, fieldState }) => (
                  <TextField
                    label="title"
                    {...field}
                    fullWidth
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />

              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                <TextField
                    label="description"
                    {...field}
                    fullWidth
                    multiline
                    rows={3}
                  />
                )}
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Controller
                  name="dueDate"
                  control={control}
                  render={({ field, fieldState }) => (
                    <DatePicker
                      label="due date"
                      value={field.value ? dayjs(field.value) : null}
                      onChange={(date: Dayjs | null) => {
                        field.onChange(date ? date.toISOString() : null); // store ISO string
                      }}
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          error: !!fieldState.error,
                          helperText: fieldState.error?.message,
                        },
                      }}
                    />
                  )}
                />
              </LocalizationProvider>
            </Stack>
          </DialogContent>

          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" variant="contained" autoFocus>
              Submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>
  );
}
