import { Pagination } from "./pagination/Pagination";
import { TableBody } from "./TableBody";
import { TableHeader } from "./TableHeader";
import { InitRecordType, TableProps } from "./type";
import { useApplyPagination } from "./utils/pagination";

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

  /** pagination functionality */
  const { currentPage, dataInPage, pageSize, setCurrentPage, setPageSize } =
    useApplyPagination(dataSource);

  return (
    <div>
      <table border={1} className={className}>
        <TableHeader columns={columns} tableId={tableId} />
        <TableBody
          columns={columns}
          dataSource={dataInPage}
          tableId={tableId}
          isFetching={isFetching}
        />
      </table>

      <Pagination
        total={dataSource.length}
        currentPage={currentPage}
        onChangeCurrentPage={setCurrentPage}
        pageSize={pageSize}
        onChangePageSize={setPageSize}
      />
    </div>
  );
};
