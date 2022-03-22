import Routes from './routes';
import { BrowserRouter } from 'react-router-dom';

// import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

function App() {
  return (
    <BrowserRouter>
        <Routes />
    </BrowserRouter>
  );
}

export default App;
