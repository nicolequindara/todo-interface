import { CreateTodoRequest, Todo } from "../../modules/Todo/Todo.types";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

export interface AddTodoModalProps {
    open: boolean;
    handleClose: () => void;
    handleSubmit: (todo: CreateTodoRequest) => void;
}
export function AddTodoModal({ open, handleClose, handleSubmit }: AddTodoModalProps) {
    const onSubmit = () => {
        var todo: CreateTodoRequest = {
            title: 'New Todo',
            createdDate: new Date().toUTCString(),
        }
        handleSubmit(todo)
    }
    return (
        <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Add Todo
        </DialogTitle>
        <DialogContent>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={onSubmit} autoFocus>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    )
}