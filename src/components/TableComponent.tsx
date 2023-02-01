import React, { useState } from 'react';
import { DataType } from '../utils/types';
import { Button, Table, Tag, TableProps, Spin } from 'antd';
import type { ColumnsType, SorterResult } from 'antd/es/table/interface';

const TableComponent = ({ data }: { data: DataType[] | [] }) => {
  const [sortedInfo, setSortedInfo] = useState<SorterResult<DataType>>({});

  const handleChange: TableProps<DataType>['onChange'] = (filters, sorter) => {
    console.log('Various parameters', filters, sorter);
    setSortedInfo(sorter as SorterResult<DataType>);
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
        let color = getColor(type);
        return (
          <Tag color={color} key={`${type}${id}`}>
            {getTypeName(type)}
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

  return data?.length > 0 ? (
    <Table columns={columns} dataSource={data} onChange={handleChange} />
  ) : (
    <Spin tip="Loading" size="large">
      <div className="spin-content" />
    </Spin>
  );
};
export default TableComponent;
