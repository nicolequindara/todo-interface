import { FilterAlt } from "@mui/icons-material";
import { Button, Menu, MenuItem, Stack } from "@mui/material";
import { useState } from "react";

export enum FilterMode {
  None,
  Active,
  Overdue,
  Completed,
}

export enum SortMode {
  None,
  Alphabetically,
  ByCreated,
}

export interface FilterMenuProps {
  filterMode: FilterMode;
  setFilterMode: (mode: FilterMode) => void;
}

export function FilterMenu({ filterMode, setFilterMode }: FilterMenuProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const FILTER_MODE_DISPLAY_TEXT: Record<FilterMode, String> = {
    [FilterMode.None]: "Filter",
    [FilterMode.Completed]: "Completed",
    [FilterMode.Overdue]: "Overdue",
    [FilterMode.Active]: "Active",
  };

  return (
    <Stack direction="row">
      <Button
        variant="text"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        endIcon={<FilterAlt />}
      >
        {FILTER_MODE_DISPLAY_TEXT[filterMode]}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          list: {
            "aria-labelledby": "basic-button",
          },
        }}
      >
        <MenuItem onClick={() => setFilterMode(FilterMode.None)}>None</MenuItem>
        <MenuItem onClick={() => setFilterMode(FilterMode.Active)}>
          {FILTER_MODE_DISPLAY_TEXT[FilterMode.Active]}
        </MenuItem>
        <MenuItem onClick={() => setFilterMode(FilterMode.Completed)}>
          {FILTER_MODE_DISPLAY_TEXT[FilterMode.Completed]}
        </MenuItem>
        <MenuItem onClick={() => setFilterMode(FilterMode.Overdue)}>
          {FILTER_MODE_DISPLAY_TEXT[FilterMode.Overdue]}
        </MenuItem>
      </Menu>
    </Stack>
  );
}

export default FilterMenu;
