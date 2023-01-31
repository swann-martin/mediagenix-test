// import { UserOutlined } from '@ant-design/icons';
import { AutoComplete, Input } from 'antd';
import { useState } from 'react';
import { DataType } from '../utils/types';

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
      <Input.Search size="large" placeholder="Search" />
    </AutoComplete>
  );
};

export default Search;
