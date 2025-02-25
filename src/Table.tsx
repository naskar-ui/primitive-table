import { TableBody } from "./TableBody";
import { TableHeader } from "./TableHeader";
import { InitRecordType, TableProps } from "./type";

export const Table = <RecordType extends InitRecordType>(
  props: TableProps<RecordType>
) => {
  const {
    columns = [],
    dataSource = [],
    tableId,
    isFetching = false,
    className,
  } = props;

  return (
    <div>
      <table border={1} className={className}>
        <TableHeader columns={columns} tableId={tableId} />
        <TableBody
          columns={columns}
          dataSource={dataSource}
          tableId={tableId}
          isFetching={isFetching}
        />
      </table>
    </div>
  );
};
