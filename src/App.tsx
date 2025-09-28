import TodoList from './components/TodoList/TodoList';
import './App.css';
import { Stack } from '@mui/material';


import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "'Lato', sans-serif",
  },
});


function App() {
  return (
    <ThemeProvider theme={theme}>
      <Stack className="App" alignItems="center" justifyItems="center">
      <TodoList />
      </Stack>
    </ThemeProvider>
  );
}

export default App;
