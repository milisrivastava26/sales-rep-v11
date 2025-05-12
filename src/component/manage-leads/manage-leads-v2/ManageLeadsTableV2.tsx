import React, { useEffect, useState } from "react";
import { sectionHeadData } from "../../../data/manage-leads/sectionHeadData";
import { filterInputData } from "../../../data/manage-leads/filter-head-data";
import SectionHead from "../table/heads/SectionHead";
import FilterHeadV2 from "./FilterHeadV2";
import SearchV2 from "../../../util/custom/ssr-pagination-v1/SearchV2";
import PaginationV1 from "../../../util/custom/ssr-pagination-v1/PaginationV1";
import ViewFilterLeadsDataV2 from "./ViewFilterLeadsDatav2";

const ManageLeadsTableV2: React.FC = () => {
    const initialPayload = localStorage.getItem("filterpayload");
    const [filterpayload, setFilterPayload] = useState<Record<string, { key: string; value: string }>>(
        initialPayload ? JSON.parse(initialPayload) : {}
    );

    // Load filter from localStorage on initial mount
    useEffect(() => {
        const savedPayload = localStorage.getItem("filterpayload");
        if (savedPayload) {
            setFilterPayload(JSON.parse(savedPayload));
        }
    }, []);

    // // console.log("filterpayload", filterpayload);

    return (
        <div className="mb-4 mx-3 sm:mx-5 px-3 py-3 sm:px-6 sm:py-6 shadow-md rounded-md bg-white">
            <div className="overflow-x-auto">
                <SectionHead sectionHeadData={sectionHeadData} />
                <div className="relative -mt-8 top-8 ">
                    <div className='flex justify-between items-center'>
                        <SearchV2 />
                        <PaginationV1 />
                    </div>
                </div>
                <div className="overflow-hidden pt-2">
                    <div className={`w-full __fliter_gradient pt-1 mt-[24px] relative`}>
                        <FilterHeadV2 filterpayload={filterpayload} setFilterPayload={setFilterPayload} inputData={filterInputData} />
                        <ViewFilterLeadsDataV2 />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageLeadsTableV2;
