import { useState } from 'react';
import { DataType } from '../utils/types';
import { Table, Tag, TableProps, Spin, Popconfirm } from 'antd';
import type {
  ColumnsType,
  FilterValue,
  SorterResult,
  TablePaginationConfig,
} from 'antd/es/table/interface';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteEvent, fetchEvents } from '../api/queriesFonctions';

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Record<string, FilterValue>;
}

const TableComponent = () => {
  const [sortedInfo, setSortedInfo] = useState<SorterResult<DataType[]>>({});
  const queryClient = useQueryClient();
  // query
  const { isLoading, error, data } = useQuery({
    queryKey: ['events'],
    queryFn: fetchEvents,
  });

  const deletePost = useMutation(deleteEvent).mutate;

  if (isLoading)
    return (
      <Spin tip="Loading">
        <div className="spin-content" />
      </Spin>
    );

  if (error)
    return (
      <div>
        <p>{JSON.stringify(error)}</p>
      </div>
    );

  const handleChange: TableProps<DataType>['onChange'] = (filters, sorter) => {
    console.log('Various parameters', filters, sorter);
  };
  const getColor = (type: string) => {
    switch (type) {
      case 'holiday':
        return '#d9eae2';
      case 'competitor':
        return '#ecd9eb';
      case 'content':
        return '#fdeddc';
      case 'generic':
      default:
        return '#ede5de';
    }
  };

  const getTypeName = (type: string) => {
    switch (type) {
      case 'holiday':
        return 'Public Holidays';
      case 'competitor':
        return 'Competitor Event';
      case 'content':
        return 'Content Launch';
      case 'generic':
      default:
        return 'Generic Event';
    }
  };

  const handleDelete = (id: string) => {
    deletePost(id, {
      onSuccess(data, variables, context) {
        queryClient.invalidateQueries(['events']);
      },
    });
  };

  const columns: ColumnsType<DataType> = [
    {
      title: 'TITLE',
      dataIndex: 'title',
      key: 'title',
      render: (text: string) => <a>{text}</a>,
      sorter: true,
      ellipsis: true,
    },
    {
      title: 'TYPE',
      dataIndex: 'type',
      key: 'type',
      render: (_, { type, id }) => {
        let color = getColor(type);
        return (
          <Tag color={color} key={`${type}${id}`}>
            {getTypeName(type)}
          </Tag>
        );
      },
      sorter: (a, b) => a.type.length - b.type.length,
    },
    {
      title: 'START DATE',
      dataIndex: 'startDate',
      key: 'startDate',
      sorter: (a, b) => a.startDate.length - b.startDate.length,

      ellipsis: true,
    },
    {
      title: 'END DATE',
      dataIndex: 'endDate',
      key: 'endDate',
      sorter: (a, b) => a.endDate.length - b.endDate.length,
      sortOrder: sortedInfo.columnKey === '' ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: 'DESCRIPTION',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'ACTION',
      dataIndex: 'action',
      render: (_, record) =>
        !!data && data.length >= 1 ? (
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDelete(record.id)}
          >
            <a>Delete</a>
          </Popconfirm>
        ) : null,
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      onChange={handleChange}
      rowKey={(event) => event.id}
    />
  );
};
export default TableComponent;
