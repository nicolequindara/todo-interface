import { TodoStatus } from "./modules/Todo/Todo.types";

export function formatDate(date: string | number | Date | null) {
  if (!date) {
    return null;
  }
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function isDueTomorrow(
  status: TodoStatus,
  date: string | number | Date | null | undefined,
) {
  if (!date || status !== TodoStatus.ACTIVE) return false;

  const inputDate = new Date(date);
  const today = new Date();

  // Normalize both dates to remove time
  today.setHours(0, 0, 0, 0);
  inputDate.setHours(0, 0, 0, 0);

  const diffInMs = inputDate.getTime() - today.getTime();
  const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

  return diffInDays === 1;
}

export function isOverDue(
  status: TodoStatus,
  date: string | number | Date | null | undefined,
) {
  if (!date || status !== TodoStatus.ACTIVE) {
    return false;
  }
  const inputDate = new Date(date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return inputDate.getTime() < today.getTime();
}
