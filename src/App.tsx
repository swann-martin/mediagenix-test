import { useState, useEffect } from 'react';
import './App.css';
import FormComponent from './components/FormComponent';
import { DataType } from './utils/types';
import { Button, Spin } from 'antd';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Search from './components/SearchComponent';
import TableComponent from './components/TableComponent';
import { fetchEvents } from './api/queriesFonctions';

function App() {
  const [isFormOpen, setFormOpen] = useState<boolean>(false);
  const [events, setEvents] = useState<DataType[]>([]);

  useEffect(() => {
    try {
      fetchEvents().then((res: DataType[]) => {
        !!res && setEvents(res);
      });
    } catch (err) {
      console.error(err);
    }
  }, []);

  // const queryClient = new QueryClient();

  return (
    // <QueryClientProvider client={queryClient}>
    <div className="app">
      <div className="app-header">
        <Search data={events} />
        <Button
          type="default"
          style={{
            backgroundColor: '#4d4d4d',
            color: '#fff',
          }}
          onClick={() => {
            console.log('clicked on button');
            setFormOpen(!isFormOpen);
          }}
        >
          Create
        </Button>
      </div>

      <TableComponent events={events} setEvents={setEvents} />

      <FormComponent
        isFormOpen={isFormOpen}
        setFormOpen={setFormOpen}
        setEvents={setEvents}
        events={events}
      />
    </div>
    // <ReactQueryDevtools initialIsOpen={true} />
    // </QueryClientProvider>
  );
}

export default App;
