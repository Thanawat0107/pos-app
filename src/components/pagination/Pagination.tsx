import * as React from 'react';
import { View } from 'react-native';
import { DataTable, Provider as PaperProvider } from 'react-native-paper';

interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange }: Props) => {
   const from = (currentPage - 1) * 4 + 1; // pageSize = 4
  const to = Math.min(currentPage * 4, totalPages * 4); // แสดง item ถึงแค่ total data จริงๆ

  return (
     <PaperProvider>
      <View>
        <DataTable.Pagination
          page={currentPage - 1}
          numberOfPages={totalPages}
          onPageChange={(page) => onPageChange(page + 1)}
          label={`${from}-${to} of ${totalPages * 4}`} // ถ้ามี meta.totalRecords ก็ใช้มันแทน
          showFastPaginationControls
          numberOfItemsPerPage={0}
          numberOfItemsPerPageList={[]}
        />
      </View>
    </PaperProvider>
  );
};

export default Pagination;
