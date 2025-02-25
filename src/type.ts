import { JSX } from "react";

export type ValueType = string | number | boolean;

/** set each record must has a key */
export interface InitRecordType {
  key: string | number;
}

/** Generic Core Interface which is used on the body & header */
export interface CoreTable {
  /** table id */
  tableId: string;
  /** define the fetching status */
  isFetching?: boolean;
  /** table class names */
  className?: string;
}

/** Table Column */
export interface TableColumn<RecordType extends InitRecordType> {
  /** set the className of the column */
  className?: string;
  /** access the value from the `fnDataIndex` attribute */
  fnDataIndex: (item: RecordType) => ValueType;
  /** set the title of column */
  label: string | JSX.Element;
}

/** Table Header Props */
export interface TableHeaderProps<RecordType extends InitRecordType>
  extends CoreTable {
  /** Table column */
  columns: TableColumn<RecordType>[];
}

/** Define the exposed props for the table component */
type ExposedTableHeaderProps<RecordType extends InitRecordType> = Pick<
  TableHeaderProps<RecordType>,
  "columns"
>;

/** Table Body Props */
export interface TableBodyProps<RecordType extends InitRecordType>
  extends CoreTable,
    ExposedTableHeaderProps<RecordType> {
  /** Table Data Source */
  dataSource: RecordType[];
  /** empty text */
  emptyText?: string;
}

/** Exposed table body props */
export type ExposedTableBodyProps<RecordType extends InitRecordType> = Pick<
  TableBodyProps<RecordType>,
  "dataSource" | "emptyText"
>;

export interface RowProps<RecordType extends InitRecordType> {
  /** Record for each column */
  record: RecordType;
  /** Table column */
  columns: TableColumn<RecordType>[];
}

/** Table Component Props */
export type TableProps<RecordType extends InitRecordType> =
  ExposedTableHeaderProps<RecordType> &
    CoreTable &
    ExposedTableBodyProps<RecordType>;
