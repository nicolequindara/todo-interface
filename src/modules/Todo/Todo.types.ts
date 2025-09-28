export enum TodoStatus {
    ACTIVE = 0,
    COMPLETED = 1,
}

export interface Todo {
    id: number;
    title: string;
    description?: string;
    createdDate: string;
    dueDate?: string;
    status: TodoStatus;
}

export interface CreateTodoRequest {
    title: string;
    description?: string;
    createdDate: string;
    dueDate?: string;
    status?: TodoStatus;
}