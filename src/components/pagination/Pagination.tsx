// import * as React from 'react';
// import { View } from 'react-native';
// import { DataTable, Provider as PaperProvider } from 'react-native-paper';

// interface Props {
//   currentPage: number;
//   totalPages: number;
//   onPageChange: (page: number) => void;
// }

// const Pagination = ({ currentPage, totalPages, onPageChange }: Props) => {
//    const from = (currentPage - 1) * 4 + 1; // pageSize = 4
//   const to = Math.min(currentPage * 4, totalPages * 4); // แสดง item ถึงแค่ total data จริงๆ

//   return (
//      <PaperProvider>
//       <View>
//         <DataTable.Pagination
//           page={currentPage - 1}
//           numberOfPages={totalPages}
//           onPageChange={(page) => onPageChange(page + 1)}
//           label={`${from}-${to} of ${totalPages * 4}`} // ถ้ามี meta.totalRecords ก็ใช้มันแทน
//           showFastPaginationControls
//           numberOfItemsPerPage={0}
//           numberOfItemsPerPageList={[]}
//         />
//       </View>
//     </PaperProvider>
//   );
// };

// export default Pagination;


// components/pagination/Pagination.tsx
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


