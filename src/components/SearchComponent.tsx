// import { UserOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { AutoComplete, Input, TableProps } from 'antd';
import { SorterResult } from 'antd/es/table/interface';
import { useState } from 'react';
import { fetchEvents, fetchEventsFilter } from '../api/queriesFonctions';
import { DataType } from '../utils/types';

enum typeOfEvent {
  holiday = 'holiday',
  competitor = 'holiday',
  generic = 'generic',
  content = 'content',
}

const Search = () => {
  const [filter, setFilter] = useState('');

  const { status, data, isFetching, error, failureCount, refetch } = useQuery({
    queryKey: ['events'],
    queryFn: fetchEvents,
  });
  const [options, setOptions] = useState<{ value: string; label: string }[]>(
    [],
  );

  const handleSearch = (value: string) => {
    console.log('value searched', value);
    let res: { value: string; label: string }[] = [];

    data?.forEach((item: DataType) => {
      if (item.title.toLowerCase().includes(value.toLowerCase())) {
        res = [...res, { label: item.title, value: item.title }];
      } else if (item.description.toLowerCase().includes(value.toLowerCase())) {
        res = [...res, { label: item.description, value: item.description }];
      }
    });

    setOptions([...new Set(res)]);
  };

  return (
    <AutoComplete
      popupClassName="certain-category-search-dropdown"
      dropdownMatchSelectWidth={500}
      style={{ width: 250 }}
      options={options}
      onSearch={handleSearch}
      onSelect={(value: string) => {
        setFilter(value),
          fetchEventsFilter(filter).then((res) => console.log(res));
      }}
    >
      <Input.Search size="middle" placeholder="Search events" enterButton />
    </AutoComplete>
  );
};

export default Search;
