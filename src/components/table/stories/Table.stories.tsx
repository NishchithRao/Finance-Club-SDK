import { Table } from "..";
import { TableType } from "../Table";
import { colorData, userData } from "./data/Table.data";

export default {
  component: Table,
  title: "components/table",
};

export const basic = (args: TableType<any>) => <Table {...args} />;
basic.args = {
  data: userData,
} as TableType<any>;

export const colors = (args: TableType<{ [key: string]: string }>) => (
  <Table data={colorData} />
);
