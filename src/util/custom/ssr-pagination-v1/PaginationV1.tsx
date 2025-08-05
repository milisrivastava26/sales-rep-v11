import React, { useState } from 'react';
import { setPaginatedProps } from '../../../store/ui/ui-slice';
import store, { RootState } from '../../../store';
import { useSelector } from 'react-redux';
import { getsearchedLeads } from '../../../store/pagination-v1/get-searched-leads-slice';

const PaginationV1: React.FC = () => {
    const table = useSelector((state: RootState) => state.table);

    const { userDetails } = useSelector(
        (state: RootState) => state.getLoggedInUserData
    );
    const {
        paginationAction: { setPageSize },
    } = table;
    const fullName = userDetails?.fullName;

    // These could come from Redux state too if you want global sync
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(50);
    const { paginatedLeads } = useSelector((state: RootState) => state.getPaginatedLeads);
    const { paginatedProps, searchQuery } = useSelector((state: RootState) => state.ui);
    const { searchedLeads } = useSelector((state: RootState) => state.getsearchedLeads);

    const totalPages: number =
        searchedLeads && searchedLeads.length !== 0
            ? searchedLeads.totalPageCount
            : paginatedLeads?.totalPageCount || 0;

    const handleSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newSize = parseInt(e.target.value);
        setPageSize(newSize);
        setSize(newSize);
        setPage(0); // Reset to page 1 when size changes
        store.dispatch(setPaginatedProps({ pageNumber: 0, pageSize: newSize }));
        if (searchQuery !== "") {
            const payload = {
                currentSalesrepFullName: fullName,
                searchString: searchQuery,
                pageNumber: paginatedProps.pageNumber,
                pageSize: newSize
            }

            store.dispatch(getsearchedLeads(payload));
        }
    };

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
        store.dispatch(setPaginatedProps({ pageNumber: newPage, pageSize: size }));
        if (searchQuery !== "") {
            const payload = {
                currentSalesrepFullName: fullName,
                searchString: searchQuery,
                pageNumber: newPage,
                pageSize: paginatedProps.pageSize
            }

            store.dispatch(getsearchedLeads(payload));
        }
    };

    return (
        <div className="flex gap-x-7 justify-between items-center">
            <div className="flex items-center gap-x-2">
                <label htmlFor="">Size</label>
                <div className="flex gap-x-2">
                    <div className="select-container">
                        <select
                            className="__custom-select"
                            value={size}
                            onChange={handleSizeChange}
                        >
                            {[50, 100, 150, 200, 250].map((size) => (
                                <option key={size} value={size}>
                                    {size}
                                </option>
                            ))}
                        </select>
                        <i className="fas fa-chevron-down dropdown-icon text-[14px]"></i>
                    </div>
                </div>
            </div>

            <div className="flex justify-between gap-x-1 sm:gap-x-2  ">
                <div className="flex justify-center w-full items-center sm:gap-x-1">
                    {/* Previous button */}
                    <button
                        className={`py-1 px-2 border ${page + 1 === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
                        onClick={() => page > 0 && handlePageChange(page - 1)}
                        disabled={page + 1 === 0}
                    >
                        <i className="fa fa-chevron-left" aria-hidden="true"></i>
                    </button>

                    {/* Page indicator */}
                    <div className="text-gray-600 text-nowrap">
                        {page + 1} / {totalPages || 0}
                    </div>

                    {/* Next button */}
                    <button
                        className={`py-1 px-2 border ${page + 1 === totalPages ? "opacity-50 cursor-not-allowed" : ""}`}
                        onClick={() => totalPages > 0 && page + 1 < totalPages && handlePageChange(page + 1)}
                        disabled={page + 1 === totalPages}
                    >
                        <i className="fa fa-chevron-right" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaginationV1;
