export enum TodoStatus {
  ACTIVE = 0,
  COMPLETED = 1,
}

export interface BaseTodo {
  title: string;
  description?: string;
  createdDate: Date;
  dueDate?: Date;
  status: TodoStatus;
}
export interface Todo extends BaseTodo {
  id: number;
}
