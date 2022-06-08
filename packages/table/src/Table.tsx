import React, { PropsWithChildren, useCallback, useMemo } from "react";
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
import { separateBySpace } from "../utils";
import TopRow from "./components/Sections/TopRow";
import "./styles/table.scss";

export type TableType<T> = {
  data: T[];
};

const Table = <T,>({ data }: PropsWithChildren<TableType<T>>): JSX.Element => {
  const columns: Column[] = useMemo(
    () =>
      Object.keys(data[0]).map((key): Column => {
        if (typeof data[key as any] === "object") {
        }
        return {
          accessor: key,
          Header: separateBySpace(key),
          id: key,
          sortDescFirst: true,
          filter: "text",
        };
      }),
    [data]
  );

  const table = useTable(
    { columns, data },
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
                    <th
                      className={"th"}
                      key={key}
                      {...rest}
                      style={{
                        width: `calc(100% / ${Object.keys(data[0])} `,
                      }}
                    >
                      <div className="header">
                        <span {...columnHeader.getGroupByToggleProps()}>
                          {columnHeader.render("Header")}
                        </span>
                        <span {...columnHeader.getSortByToggleProps()}>
                          {columnHeader.isSorted ? (
                            columnHeader.isSortedDesc ? (
                              <span className="icon">&#8964;</span>
                            ) : (
                              <span className="icon">&#8963;</span>
                            )
                          ) : (
                            <span className="icon">&#8250;</span>
                          )}
                        </span>
                      </div>
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
                    <td
                      className={"td"}
                      key={key}
                      {...rest}
                      style={{
                        width: `calc(100% / ${Object.keys(data[0])} `,
                      }}
                    >
                      {cell.render("Cell")}
                      {cell.isGrouped && !row.isExpanded && (
                        <span className="icon">&#8250;</span>
                      )}
                      {row.isExpanded ? (
                        <span className="icon">&#8964;</span>
                      ) : (
                        ""
                      )}
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
