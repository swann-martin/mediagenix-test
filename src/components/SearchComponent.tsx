// import { UserOutlined } from '@ant-design/icons';
import { AutoComplete, Input, TableProps } from 'antd';
import { SorterResult } from 'antd/es/table/interface';
import { useState } from 'react';
import { DataType } from '../utils/types';

enum typeOfEvent {
  holiday = 'holiday',
  competitor = 'holiday',
  generic = 'generic',
  content = 'content',
}

const Search = ({ data }: { data: DataType[] }) => {
  const [options, setOptions] = useState<{ value: string; label: string }[]>(
    [],
  );

  const handleSearch = (value: string) => {
    let res: { value: string; label: string }[] = [];

    data.forEach((item) => {
      if (item.title.toLowerCase().includes(value.toLowerCase())) {
        res = [...res, { label: item.title, value: item.title }];
      }
    });
    setOptions(res);
  };

  return (
    <AutoComplete
      popupClassName="certain-category-search-dropdown"
      dropdownMatchSelectWidth={500}
      style={{ width: 250 }}
      options={options}
      onSearch={handleSearch}
    >
      <Input.Search size="middle" placeholder="Search events" enterButton />
    </AutoComplete>
  );
};

export default Search;
