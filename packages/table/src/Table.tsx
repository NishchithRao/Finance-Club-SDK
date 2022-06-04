import React, { PropsWithChildren, useMemo } from "react";
import {
  useTable,
  Column,
  useGlobalFilter,
  useFilters,
  useSortBy,
  useGroupBy,
  useExpanded,
  useResizeColumns,
  useBlockLayout,
} from "react-table";
import TopRow from "./components/Sections/TopRow";

export type TableType<T> = {
  data: T[];
};

const Table = <T,>({ data }: PropsWithChildren<TableType<T>>): JSX.Element => {
  const capitalize = (str: string) => {
    return str[0].toUpperCase() + str.slice(1);
  };

  const columns: Column[] = useMemo(
    () =>
      Object.keys(data[0]).map((key): Column => {
        return {
          accessor: key,
          Header: capitalize(key),
          id: key,
          sortDescFirst: true,
          filter: "text",
        };
      }),
    [data]
  );
  const defaultColumn = useMemo(
    () => ({
      minWidth: 10,
      maxWidth: 500,
    }),
    []
  );

  const table = useTable(
    { columns, data, defaultColumn },
    useFilters,
    useGlobalFilter,
    useGroupBy,
    useSortBy,
    useExpanded,
    useBlockLayout,
    useResizeColumns
  );

  const {
    headerGroups,
    getTableProps,
    rows,
    prepareRow,
    getTableBodyProps,
    preGlobalFilteredRows,
    state: { globalFilter },
    setGlobalFilter,
  } = table;

  return (
    <div className={"table"}>
      <TopRow
        searchProps={{
          preGlobalFilteredRows,
          setGlobalFilter,
          globalFilter,
        }}
      />
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => {
            const { key, ...rest } = headerGroup.getHeaderGroupProps();
            return (
              <tr {...rest} key={key}>
                {headerGroup.headers.map((columnHeader) => {
                  const { key, ...rest } = columnHeader.getHeaderProps();
                  return (
                    <th className={"th"} key={key}>
                      {columnHeader.render("Header")}
                      <span {...columnHeader.getGroupByToggleProps()}>
                        {columnHeader.isSortedDesc ? (
                          <span>&#8964;</span>
                        ) : (
                          <span>&#8963;</span>
                        )}
                      </span>
                      <span
                        className={"resize"}
                        {...columnHeader.getResizerProps()}
                      ></span>
                    </th>
                  );
                })}
              </tr>
            );
          })}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows?.map((row) => {
            prepareRow(row);
            const { key, ...rest } = row.getRowProps();
            return (
              <tr
                className={`${"tr"} ${row.isExpanded && "expanded"}`}
                {...{ ...rest, ...row.getToggleRowExpandedProps() }}
                key={key}
              >
                {row.cells.map((cell) => {
                  const { key, ...rest } = cell.getCellProps();
                  return (
                    <td className={"td"} key={key} {...rest}>
                      {cell.render("Cell")}
                      {cell.isGrouped && ` ( ${row.subRows.length} rows) `}
                      {row.isExpanded ? "true" : ""}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
