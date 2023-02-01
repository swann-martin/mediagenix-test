import { useState, useEffect } from 'react';
import './App.css';
import FormComponent from './components/FormComponent';
import { DataType } from './utils/types';
import { Button, Spin } from 'antd';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import Search from './components/SearchComponent';
import TableComponent from './components/TableComponent';

function App() {
  const [isFormOpen, setFormOpen] = useState<boolean>(false);
  const [data, setData] = useState<DataType[] | []>([]);

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="app">
        <div className="app-header">
          <Search data={data} />
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

        <TableComponent />

        <FormComponent isFormOpen={isFormOpen} setFormOpen={setFormOpen} />
      </div>
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  );
}

export default App;
