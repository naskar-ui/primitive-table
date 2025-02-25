import { useMemo } from "react";
import { PaginationProps } from "./type";

type PageInformationProps = Pick<PaginationProps, "total" | "pageSize">;

export const PageInformation = (props: PageInformationProps) => {
  const { total, pageSize } = props;

  const showedItem = useMemo(() => {
    return total <= pageSize ? total : pageSize;
  }, [pageSize, total]);

  return (
    <div className="antialiased flex-2">
      {showedItem} of {total} items
    </div>
  );
};
