export const defaultPaginationOptions = [10, 25, 50, 80, 120];

type PageSizeType = (typeof defaultPaginationOptions)[number];

export interface PaginationProps {
  isFetching?: boolean;
  total: number;
  currentPage: number;
  onChangeCurrentPage: (value: number) => void;
  pageSize: PageSizeType;
  onChangePageSize: (value: PageSizeType) => void;
}
