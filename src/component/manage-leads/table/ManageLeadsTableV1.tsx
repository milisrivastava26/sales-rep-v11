import React, { useEffect, useState } from "react";
import TableHead from "./heads/TableHead";
import SectionHead from "./heads/SectionHead";
import FilterHeadV1 from "./heads/FilterHeadV1";
import ViewFilterLeadsData from "../ViewFilterLeadsData";
import { sectionHeadData } from "../../../data/manage-leads/sectionHeadData";
import { filterInputData } from "../../../data/manage-leads/filter-head-data";

const ManageLeadsTableV1: React.FC = () => {
  const initialPayload = sessionStorage.getItem("filterpayload");
  const [filterpayload, setFilterPayload] = useState<Record<string, { key: string; value: string }>>(
    initialPayload ? JSON.parse(initialPayload) : {}
  );

  // Load filter from localStorage on initial mount
  useEffect(() => {
    const savedPayload = sessionStorage.getItem("filterpayload");
    if (savedPayload) {
      setFilterPayload(JSON.parse(savedPayload));
    }
  }, []);


  return (
    <div className="my-4 mx-3 sm:mx-5 px-3 py-3 sm:px-6 sm:py-6 shadow-md rounded-md bg-white">
      <div className="overflow-x-auto">
        <SectionHead sectionHeadData={sectionHeadData} />
        <div className="relative -mt-8 top-8 ">
          <TableHead />
        </div>
        <div className="overflow-hidden pt-2">
          <div className={`w-full __fliter_gradient pt-1 mt-[24px] relative`}>
            <FilterHeadV1 filterpayload={filterpayload} setFilterPayload={setFilterPayload} inputData={filterInputData} />
            <ViewFilterLeadsData />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageLeadsTableV1;
