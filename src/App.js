import Table from './components/Table';
import AppProvider from './context/AppProvider';

export default function App() {
  return (
    <AppProvider>
      <Table />
    </AppProvider>
  );
}
