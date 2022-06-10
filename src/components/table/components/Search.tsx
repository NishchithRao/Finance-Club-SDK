import React, { useState } from "react";
import { useAsyncDebounce, UseGlobalFiltersInstanceProps } from "react-table";
import "../table.scss";

export type SearchType = {
  globalFilter: string;
} & Pick<
  UseGlobalFiltersInstanceProps<{}>,
  "preGlobalFilteredRows" | "setGlobalFilter"
>;

const Search: React.FC<SearchType> = ({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) => {
  const [value, setValue] = useState(globalFilter);
  const onSearchChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);
  return (
    <div>
      <input
        className={"table-search"}
        placeholder={`Search ${preGlobalFilteredRows.length} records`}
        value={value}
        onChange={(ev) => {
          setValue(ev.target.value);
          onSearchChange(ev.target.value);
        }}
      />
    </div>
  );
};

export default Search;
