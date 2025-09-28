
import { Error, ExpandMore, Warning, WashRounded } from "@mui/icons-material";
import { Todo, TodoStatus } from "../../modules/Todo/Todo.types";
import { Stack, Accordion, AccordionSummary, Checkbox, Typography, AccordionDetails, AccordionActions, Button, Badge, Chip, Divider, useColorScheme, Tooltip } from "@mui/material";
import { formatDate, isDueTomorrow, isOverDue } from "../../utils";
import { useUpdateTodo } from "src/hooks/useUpdateTodo";
import { useTodosContext } from "src/modules/contexts/TodoContext";

export interface TodoListItemProps {
    todo: Todo,
}

export function TodoListItem({todo} : TodoListItemProps) {
    const {updateTodo, data } = useUpdateTodo();
    const { setTodos } = useTodosContext();

    const onChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.stopPropagation();

        // optimistic update
        setTodos((prev) => {
            return prev.map(t => {
                if (t.id != todo.id) { return t; }
                return {
                    ...t,
                    status: event.target.checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE,
                }
            })
        })

        // persist to db
        updateTodo({
            ...todo, 
            status: event.target.checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE,
        });
    }

    const dueTomorrow = isDueTomorrow(todo.status, todo.dueDate)
    const overdue = isOverDue(todo.status, todo.dueDate)

    return (
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMore />}>
                    <Stack  direction="row" alignItems="center" width="100%" gap={1}>
                        <Checkbox 
                            checked={todo.status === TodoStatus.COMPLETED} 
                            onChange={onChecked} 
                            onClick={(event) => { event.stopPropagation(); } }
                        />
                        <Typography sx={{flex: 1 }} variant="body1">{todo.title}</Typography>
                        {overdue && (
                            <Tooltip title="Overdue"><Chip label={<Error sx={{height:"18px"}}/>} sx={{backgroundColor: "red", color: "white"}}/></Tooltip>
                        )}
                        {dueTomorrow && (
                            <Tooltip title="Due tomorrow"><Chip label={<Warning sx={{height:"18px"}}/>}sx={{backgroundColor: "orange", color: "white"}}/></Tooltip>
                        )}
                    </Stack>
                </AccordionSummary>
            <AccordionDetails>
                <Stack gap={1} px={2}>
                    <Typography variant="body2" >{todo.description}</Typography>
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