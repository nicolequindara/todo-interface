import TodoList from './components/TodoList/TodoList';
import './App.css';
import { Stack } from '@mui/material';


import { createTheme, ThemeProvider } from "@mui/material/styles";
import { TodosProvider } from './modules/contexts/TodoContext';

const theme = createTheme({
  typography: {
    fontFamily: "'Lato', sans-serif",
  },
});


function App() {
  return (
    <ThemeProvider theme={theme}>
      <TodosProvider>
        <Stack className="App" alignItems="center" justifyItems="center">
        <TodoList />
        </Stack>
      </TodosProvider>
    </ThemeProvider>
  );
}

export default App;
