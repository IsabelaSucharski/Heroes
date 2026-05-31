import { Container, ThemeProvider } from '@mui/material';
import { HeroesList } from './pages/HeroesList';
import { theme } from './theme/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <HeroesList />
      </Container>
    </ThemeProvider>
  );
}

export default App;