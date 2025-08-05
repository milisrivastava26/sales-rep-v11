import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { CustomDetailsTable } from '../../util/custom/leadsFormat/CustomDetailsTable';
import { Spin, Empty } from 'antd'; // Use AntD spinner and empty state
import Search from '../../util/custom/customSearchPagination/Search';
import Pagination from '../../util/custom/customSearchPagination/Pagination';
import { getDocumentReviewColumns } from './DocumentReviewColumn';

const VerifiedDocument: React.FC = () => {
    const { leadForDocumentReview, isLoading } = useSelector(
        (state: RootState) => state.getLeadForDocumentReview
    );

    const hasData = Array.isArray(leadForDocumentReview) && leadForDocumentReview.length > 0;

    const { userDetails } = useSelector(
            (state: RootState) => state.getLoggedInUserData
          );
          const role = userDetails?.authority;
    
        const documentReviewColumns = getDocumentReviewColumns(role)

    return (
        <div className="m-3">
            <div className="bg-white py-6 h-screen overflow-x-hidden">
                <h3 className="text-base sm:text-[22px] font-medium px-6">Manage Verified Documents</h3>

                <div className="px-6 pt-4">
                    {isLoading ? (
                        <div className="flex justify-center items-center h-[300px]">
                            <Spin size="large" />
                        </div>
                    ) : hasData ? (
                        <div>
                            <div className='flex justify-between gap-10 items-center mb-5'>
                                <Search />
                                <Pagination />
                            </div>
                            <CustomDetailsTable
                                columns={documentReviewColumns}
                                data={leadForDocumentReview}
                                isMode="documentReview"
                            />
                        </div>
                    ) : (
                        <div className="flex justify-center items-center h-[300px]">
                            <Empty description="No data found" />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default VerifiedDocument;
