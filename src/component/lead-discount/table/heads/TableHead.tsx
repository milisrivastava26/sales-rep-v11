import React from "react";
import { Input, Pagination } from "antd";

interface Props {
  searchText: string;
  setSearchText: (value: string) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  total: number;
  pageSize: number;

}

const TableHead: React.FC<Props> = ({ searchText, setSearchText, currentPage, setCurrentPage, total, pageSize}) => {
  return (
    <div className="flex justify-between items-center p-2">
      {/*Search */}
      <Input
        placeholder="Search..."
        value={searchText}
        onChange={(e) => {
          setSearchText(e.target.value);
          setCurrentPage(1); // reset page on search
        }}
        style={{ width: 250 }}
      />

      {/* 🔹 Pagination */}
      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={total}
        onChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export default TableHead;
