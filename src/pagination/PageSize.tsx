import { defaultPaginationOptions, PaginationProps } from "./type";

type PageSizeProps = Pick<PaginationProps, "pageSize" | "onChangePageSize">;

export const PageSize = (props: PageSizeProps) => {
  const { pageSize, onChangePageSize } = props;

  const defaultPageSize = defaultPaginationOptions[0];

  return (
    <div className="flex items-center flex-2">
      <div className="mr-4 antialiased">Show</div>

      <div>
        <select
          defaultValue={defaultPageSize}
          value={pageSize}
          onChange={(e) => {
            onChangePageSize(Number(e.target.value));
          }}
        >
          {defaultPaginationOptions.map((item) => {
            return (
              <option key={item} value={item}>
                {item}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
};
