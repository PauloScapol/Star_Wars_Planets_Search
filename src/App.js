import Table from './components/Table';
import Filters from './components/Filter';
import AppProvider from './context/AppProvider';

export default function App() {
  return (
    <AppProvider>
      <Filters />
      <Table />
    </AppProvider>
  );
}
