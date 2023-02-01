import { useState, useEffect } from 'react';
import './App.css';
import FormComponent from './components/FormComponent';
import { DataType } from './utils/types';
import { Button, Spin } from 'antd';

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

  const getData = async () =>
    fetch('http://localhost:5101/data', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json());

  useEffect(() => {
    getData().then((data) => {
      setData(data);
    });
  }, []);

  return (
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

      <TableComponent data={data} />

      <FormComponent isFormOpen={isFormOpen} setFormOpen={setFormOpen} />
    </div>
  );
}

export default App;
