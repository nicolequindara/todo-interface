
import { ExpandMore } from "@mui/icons-material";
import { Todo, TodoStatus } from "../../modules/Todo/Todo.types";
import { Stack, Accordion, AccordionSummary, Checkbox, Typography, AccordionDetails, AccordionActions, Button, Badge, Chip, Divider } from "@mui/material";
import { useState } from "react";
import { formatDate, isDueTomorrow, isOverDue } from "../../utils";

export interface TodoListItemProps {
    todo: Todo,
    onUpdateTodo: (todo: Todo) => void;
}

export function TodoListItem({todo, onUpdateTodo} : TodoListItemProps) {
    const dueTomorrow = isDueTomorrow(todo.status, todo.dueDate)
    const overdue = isOverDue(todo.status, todo.dueDate)

    return (
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMore />}>
                    <Stack  direction="row" alignItems="center" width="100%" gap={1}>
                        <Checkbox 
                            checked={todo.status === TodoStatus.COMPLETED} 
                            onChange={(event) => { event.stopPropagation(); onUpdateTodo({...todo, status: event.target.checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE}) }} 
                            onClick={(event) => { event.stopPropagation(); } }
                        />
                        <Typography sx={{flex: 1 }}>{todo.title}</Typography>
                        {overdue && (
                            <Chip label="Overdue" sx={{backgroundColor: "red", color: "white"}}/>
                        )}
                        {dueTomorrow && (
                            <Chip label="Due Tomorrow" sx={{backgroundColor: "orange", color: "white"}}/>
                        )}
                    </Stack>
                </AccordionSummary>
            <AccordionDetails>
                <Stack gap={1} px={2}>
                    <Typography variant="body1" >{todo.description}</Typography>
                    <Divider sx={{mt:2}} />
                    <Typography fontSize={12} variant="subtitle2" color="#A9A9A9">
                        Created on {formatDate(todo.createdDate)}
                    </Typography>
                    {todo.dueDate && (<Typography fontSize={12} variant="subtitle2" color={(dueTomorrow || overdue) ? "red" :  "#A9A9A9"} >
                        Due on {formatDate(todo.dueDate)}
                    </Typography>)}
                </Stack>
            </AccordionDetails>
            <AccordionActions>
                <Stack direction="row" spacing={2} pb={2}>
                    <Button variant="contained">Edit</Button>
                    <Button sx={{color: "red"}}>Delete</Button>
                </Stack>
            </AccordionActions>
            </Accordion>
    )

}

export default TodoListItem;