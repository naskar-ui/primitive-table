import { PageInformation } from "./PageInformation";
import { PaginationProps } from "./type";

export const Pagination = (props: PaginationProps) => {
  const { total, pageSize } = props;

  return (
    <div>
      <PageInformation total={total} pageSize={pageSize} />
    </div>
  );
};
