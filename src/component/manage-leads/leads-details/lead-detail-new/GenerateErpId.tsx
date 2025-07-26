import React from 'react'
import store, { RootState } from '../../../../store';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { syncDataToPs } from '../../../../store/crm-to-ps-integration/sync-data-to-ps-slice';
import { FaExclamationTriangle } from 'react-icons/fa';

const GenerateErpId: React.FC = () => {
    const { leadCaptureId } = useParams();
    const { isLoading: isLoadingSyncData } = useSelector((state: RootState) => state.syncDataToPs);
    const { getPsEmplIdResponse, isError } = useSelector((state: RootState) => state.getEmplId);
    const { responseOfLeadEnquiryDetailsById } = useSelector(
        (state: RootState) => state.getLeadEnquiryDetailsDataById
    );

    const applicationstatusData =
        Array.isArray(responseOfLeadEnquiryDetailsById) &&
            responseOfLeadEnquiryDetailsById.length > 0
            ? responseOfLeadEnquiryDetailsById[0].leadApplicationStatusDTOS
            : [];
    const generalInfoStatus = applicationstatusData.find(
        (item: any) => item.name === "General Information"
    )?.status || null;

    const basicDetailsStatus = applicationstatusData.find(
        (item: any) => item.name === "Basic Details"
    )?.status || null;

    const handleGenerateErpId = () => {
        store.dispatch(syncDataToPs(leadCaptureId));
    }

    return (
        <div>
            <div className="flex justify-between items-center  h-[50px] relative px-4 bg-blue-100 ">
                <h1 className="text-lg font-semibold">ERP ID</h1>
            </div>

            {/* Display the warning message if either General Info or Basic Details status is false */}
            {(!generalInfoStatus || !basicDetailsStatus) && (

                <div className="mt-3 mx-4 flex items-start gap-3 px-2 py-3 w-[56%] bg-yellow-100 border-l-4 border-yellow-500 text-red-900 rounded-md shadow-md">
                            <FaExclamationTriangle className="w-4 h-4 text-yellow-600" />
                            <p className="font-medium text-xs">
                              Please fill the General Information and Basic Details step before proceeding to generate ERP ID.
                            </p>
                          </div>
            )}

            <div className="px-4 flex items-center mt-3 gap-2">
                <input type="text" value={getPsEmplIdResponse} disabled className="px-4 rounded-md border py-1.5 w-[50%]" />
                <button className={`${!generalInfoStatus || !basicDetailsStatus || isLoadingSyncData || (getPsEmplIdResponse !== "" && isError !== "") ? "bg-opacity-50" : "hover:bg-blue-700"} bg-blue-600 px-2 py-1.5 cursor-pointer text-sm rounded-md text-white font-medium`} disabled={!generalInfoStatus || !basicDetailsStatus || isLoadingSyncData || (getPsEmplIdResponse !== "" && isError !== "")} onClick={handleGenerateErpId}>Generate</button>
            </div>

            
        </div >
    )
}

export default GenerateErpId