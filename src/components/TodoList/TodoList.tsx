import { CreateTodoRequest, Todo, TodoStatus } from "../../modules/Todo/Todo.types";
import {  Button, CircularProgress, Stack, Typography } from "@mui/material";

import TodoListItem from "./TodoListItem";
import { useApi } from "../../hooks/useApi";
import { Add } from "@mui/icons-material";
import { useEffect, useMemo, useState } from "react";
import { AddTodoModal } from "../AddTodoModal/AddTodoModal";
import { FilterMode, FunctionBar } from "../FunctionBar/FunctionBar";
import { isOverDue } from "../../utils";


export function TodoList() {
    const {data, loading, refetch} =  useApi<Todo[]>(`/api/todos`);
    const [ todos, setTodos ] = useState<Todo[]>([]);
    useEffect(() => {
        setTodos(data ?? [])
    }, [data])

    const [addTodoModalOpen, setAddTodoModalOpen ] = useState<boolean>(false);
    const openAddTodoModal = () => { setAddTodoModalOpen(true); }
    const closeAddTodoModal = () => {setAddTodoModalOpen(false); }
    const onAddTodo = (request: CreateTodoRequest) => {
        var todo: Todo = {
            id: -1,
            title: request.title,
            description: request.description,
            createdDate: request.createdDate,
            dueDate: request.dueDate,
            status: TodoStatus.ACTIVE,
        }
        setTodos(todos.concat(todo));
        closeAddTodoModal();
    }
    

    const [filterMode, setFilterMode] = useState<FilterMode>(FilterMode.None);
    const useFilter = (filterMode: FilterMode) => useMemo(() => {
        console.log("Filter by", filterMode);
        switch(filterMode) {
            case FilterMode.Completed:
                return todos.filter(t => t.status == TodoStatus.COMPLETED);
            case FilterMode.Overdue:
                return todos.filter(t => isOverDue(t.status, t.dueDate));
            case FilterMode.None:
            default:
                return todos;
        }
    }, [todos, filterMode])

    const useUpdateTodo = (todo: Todo) => {
        console.log('update', JSON.stringify(todo))
        try {
            const {loading} = useApi<Todo[]>(`/api/todos/${todo.id}`, {method: 'PUT', body: JSON.stringify(todo)});
            refetch();
        } catch(err) {
        } 
    }

    return (
        <Stack gap={2} p={4} width="80%">
            <TodoListHeader onAddTodo={openAddTodoModal} setFilterMode={(mode: FilterMode) => { setFilterMode(mode)}} filterMode={filterMode} />
            <TodoListInner loading={loading} todos={useFilter(filterMode)} onUpdateTodo={useUpdateTodo} />
            <AddTodoModal open={addTodoModalOpen} handleClose={closeAddTodoModal} handleSubmit={onAddTodo}/>
        </Stack>
    )

}

interface TodoListInnerProps {
    todos: Todo[]
    loading: boolean,
    onUpdateTodo: (todo: Todo) => void;
}
function TodoListInner({todos, loading, onUpdateTodo} : TodoListInnerProps) {
    if (loading) { return <Stack p={4} alignContent="center" alignItems="center"><CircularProgress /></Stack> }
    return (
        <Stack spacing={1}>
            {todos.map(todo => (<TodoListItem todo={todo} onUpdateTodo={onUpdateTodo} />))}
        </Stack>
    )
}

interface TodoListHeaderProps {
    onAddTodo: () => void;
    filterMode: FilterMode;
    setFilterMode: (mode: FilterMode) => void;
}

function TodoListHeader({ onAddTodo, filterMode, setFilterMode } : TodoListHeaderProps) {
    return (
        <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography variant="h5" fontWeight={"bold"}>Task List</Typography>
            <Stack direction="row" alignItems="center" spacing={2}>
                <FunctionBar filterMode={filterMode} setFilterMode={setFilterMode}/>
                <Button startIcon={<Add />} variant="contained" onClick={onAddTodo}>Add</Button>
            </Stack>
        </Stack>
    )
}



export default TodoList;