import React from 'react';
import Search, { SearchType } from './Search';

type TopRowType = {
  searchProps: SearchType;
};

const TopRow: React.FC<TopRowType> = ({ searchProps }) => {
  return (
    <div className='d-flex flex-row'>
      <button>Filter</button>
      <Search {...searchProps} />
    </div>
  );
};

export default TopRow;
