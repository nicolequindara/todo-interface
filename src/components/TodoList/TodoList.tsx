import { Stack } from "@mui/material";
import { TodoStatus } from "../../modules/Todo/Todo.types";

import { useMemo, useState } from "react";
import { useTodosContext } from "src/modules/contexts/TodoContext";
import { isOverDue } from "../../utils";
import { AddTodoModal } from "../AddTodoModal/AddTodoModal";
import { FilterMode } from "../FilterMenu/FilterMenu";
import TodoListHeader from "../TodoListHeader/TodoListHeader";
import TodoListInner from "./TodoListInner";

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

export default TodoList;
