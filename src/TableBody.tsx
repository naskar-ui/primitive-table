import React from "react";
import { InitRecordType, TableBodyProps } from "./type";

export const TableBody = <RecordType extends InitRecordType>(
  props: TableBodyProps<RecordType>
) => {
  const { columns, dataSource, tableId, isFetching } = props;

  return (
    <tbody id={`${tableId}-body`}>
      {isFetching && (
        <tr>
          <td colSpan={columns.length}>loading...</td>
        </tr>
      )}

      {!isFetching &&
        dataSource.map((record) => {
          return (
            <tr key={record.key}>
              {columns.map((column, index) => {
                return (
                  <td key={index} className={column.className}>
                    {column.fnDataIndex(record)}
                  </td>
                );
              })}
            </tr>
          );
        })}
    </tbody>
  );
};
