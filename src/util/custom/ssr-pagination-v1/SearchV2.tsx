import React, { useEffect } from 'react';
import store, { RootState } from '../../../store';
import { useSelector } from 'react-redux';
import { getsearchedLeads, resetsearchedLeads } from '../../../store/pagination-v1/get-searched-leads-slice';
import { setSearchQuery } from '../../../store/ui/ui-slice';

const SearchV2: React.FC = () => {
    const { paginatedProps } = useSelector((state: RootState) => state.ui);
    const { searchQuery } = useSelector((state: RootState) => state.ui);
    const { userDetails } = useSelector(
        (state: RootState) => state.getLoggedInUserData
    );

    useEffect(() => {
        if (searchQuery === "") {
            store.dispatch(resetsearchedLeads());
        }
    }, [searchQuery])

    const fullName = userDetails?.fullName;

    const handleSearch = () => {

        const payload = {
            currentSalesrepFullName: fullName,
            searchString: searchQuery,
            pageNumber: paginatedProps.pageNumber,
            pageSize: paginatedProps.pageSize,
        }

        store.dispatch(getsearchedLeads(payload));
    };

    return (
        <div className='flex items-center gap-2 py-4 rounded-md w-full'>


            <div className="flex items-center w-full">

                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => store.dispatch(setSearchQuery(e.target.value))}
                    placeholder="Search..."
                    className="flex-1 px-3 py-2 border rounded-r-md text-sm"
                />

            </div>
            <button
                onClick={handleSearch}
                className="px-4 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
                Search
            </button>
        </div>
    );
};

export default SearchV2;
