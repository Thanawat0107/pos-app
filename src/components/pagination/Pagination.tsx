import React from "react";
import { DataTable } from "react-native-paper";
import { PaginationMeta } from "../../@types/responsts/PaginationMeta";

type Props = {
  meta: PaginationMeta;
  page: number;
  numberOfItemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (size: number) => void;
  numberOfItemsPerPageList?: number[];
};

const Pagination = ({
  meta,
  page,
  numberOfItemsPerPage,
  onPageChange,
  onItemsPerPageChange,
  numberOfItemsPerPageList = [2, 4, 6],
}: Props) => {
  const from = (meta.pageNumber - 1) * meta.pageSize + 1;
  const to = Math.min(meta.pageNumber * meta.pageSize, meta.totalCount);

  return (
    <DataTable.Pagination
      page={page}
      numberOfPages={meta.pageCount}
      onPageChange={onPageChange}
      label={`${from}-${to} of ${meta.totalCount}`}
      showFastPaginationControls
      numberOfItemsPerPageList={numberOfItemsPerPageList}
      numberOfItemsPerPage={numberOfItemsPerPage}
      onItemsPerPageChange={onItemsPerPageChange}
      selectPageDropdownLabel="Rows per page"
    />
  );
};

export default Pagination;


