import { Add } from "@mui/icons-material";
import { Button, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import FilterMenu, { FilterMode } from "../FilterMenu/FilterMenu";

interface TodoListHeaderProps {
  onAddTodo: () => void;
  filterMode: FilterMode;
  setFilterMode: (mode: FilterMode) => void;
}

export function TodoListHeader({
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
        <FilterMenu filterMode={filterMode} setFilterMode={setFilterMode} />
        <Button startIcon={<Add />} variant="contained" onClick={onAddTodo}>
          Add
        </Button>
      </Stack>
    </Stack>
  );
}

export default TodoListHeader;
