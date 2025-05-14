import React, { useState } from 'react';
import { setPaginatedPropsForAdvanceSearch } from '../../../store/ui/ui-slice';
import store, { RootState } from '../../../store';
import { useSelector } from 'react-redux';

interface ViewLeadResponse {
    totalPageCount?: number;
    // add other properties if needed
}


const PaginationAdvance: React.FC = () => {
    const table = useSelector((state: RootState) => state.table);
    const {
        paginationAction: { setPageSize },
    } = table;

    // These could come from Redux state too if you want global sync
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(50);

    const { responseOfViewLead } = useSelector(
        (state: RootState) => state.getCoreViewLead
    ) as { responseOfViewLead: ViewLeadResponse | null };

    const totalPages: number =
        responseOfViewLead && !Array.isArray(responseOfViewLead) && typeof responseOfViewLead.totalPageCount === 'number'
            ? responseOfViewLead.totalPageCount
            : 0;

    const handleSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newSize = parseInt(e.target.value);
        setPageSize(newSize);
        setSize(newSize);
        setPage(0); // Reset to page 1 when size changes
        store.dispatch(setPaginatedPropsForAdvanceSearch({ pageNumber: 0, pageSize: newSize }));
    };

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
        store.dispatch(setPaginatedPropsForAdvanceSearch({ pageNumber: newPage, pageSize: size }))

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

export default PaginationAdvance;
