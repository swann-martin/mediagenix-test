import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';
import FormComponent from './components/Form';
import { DataType } from './utils/types';
import { Button, Table, Tag, TableProps } from 'antd';
import type { ColumnsType, SorterResult } from 'antd/es/table/interface';

import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import Search from './components/Search';

function App() {
  const [formIsOpen, setFormIsOpen] = useState<boolean>(false);
  const [data, setData] = useState<DataType[] | []>([]);
  const [sortedInfo, setSortedInfo] = useState<SorterResult<DataType>>({});

  const handleChange: TableProps<DataType>['onChange'] = (filters, sorter) => {
    console.log('Various parameters', filters, sorter);
    setSortedInfo(sorter as SorterResult<DataType>);
  };

  const columns: ColumnsType<DataType> = [
    {
      title: 'TITLE',
      dataIndex: 'title',
      key: 'key',
      render: (text: string) => <a>{text}</a>,
      sorter: (a, b) => a.title.length - b.title.length,
      sortOrder: sortedInfo.columnKey === 'type' ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: 'TYPE',
      dataIndex: 'type',
      key: 'key',
      render: (_, { type, id }) => {
        let color = type === 'generic' ? '#a0a0a0' : '#e2001a';
        return (
          <Tag color={color} key={`${type}${id}`}>
            {type.toUpperCase()}
          </Tag>
        );
      },
      sorter: (a, b) => a.type.length - b.type.length,
      sortOrder: sortedInfo.columnKey === 'type' ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: 'START DATE',
      dataIndex: 'startDate',
      key: 'key',
      sorter: (a, b) => a.startDate.length - b.startDate.length,
      sortOrder: sortedInfo.columnKey === '' ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: 'END DATE',
      dataIndex: 'endDate',
      key: 'key',
      sorter: (a, b) => a.endDate.length - b.endDate.length,
      sortOrder: sortedInfo.columnKey === '' ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: 'DESCRIPTION',
      dataIndex: 'description',
      key: 'key',
    },
  ];

  const getData = async () =>
    fetch('http://localhost:5100/data', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json());

  useEffect(() => {
    getData().then((data) => {
      setData(data);
      console.log(data);
    });
  }, []);

  return (
    <div className="App">
      <div className="App-header">
        <Search data={data} />
        <Button
          type="default"
          onClick={() => {
            console.log('clicked on button');
            setFormIsOpen(!formIsOpen);
          }}
        >
          Create
        </Button>
      </div>
      <Table columns={columns} dataSource={data} onChange={handleChange} />
      {formIsOpen && <FormComponent />}
    </div>
  );
}

export default App;
