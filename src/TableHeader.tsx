import React from "react";
import { InitRecordType, TableHeaderProps } from "./type";

export const TableHeader = <RecordType extends InitRecordType>(
  props: TableHeaderProps<RecordType>
) => {
  const { columns, tableId } = props;

  return (
    <thead id={`${tableId}-header`}>
      <tr>
        {columns.map((column, index) => {
          return (
            <th key={index} className={column.className}>
              {column.label}
            </th>
          );
        })}
      </tr>
    </thead>
  );
};
