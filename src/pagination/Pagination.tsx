import { PageInformation } from "./PageInformation";
import { PageSize } from "./PageSize";
import { PaginationProps } from "./type";

export const Pagination = (props: PaginationProps) => {
  const { total, pageSize, onChangePageSize } = props;

  return (
    <div>
      <PageInformation total={total} pageSize={pageSize} />

      <PageSize pageSize={pageSize} onChangePageSize={onChangePageSize} />
    </div>
  );
};
