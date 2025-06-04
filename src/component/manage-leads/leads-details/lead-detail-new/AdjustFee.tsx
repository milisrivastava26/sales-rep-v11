import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Checkbox } from 'antd';
import { useParams } from 'react-router-dom';
import store, { RootState } from '../../../../store';
import { resetVoidFeeStatusResponse, voidFeeStatus } from '../../../../store/lead-merge/void-feeStatus-slice';
import { getLeadApplicationStatusByLeadId } from '../../../../store/lead-applicationStatus/get-lead-application-status-by-lead-capture-id-slice';
import { getMaxActiveAppStatus } from '../../../../store/scholarship-services/get-max-active-application-status-slice';
import { getLeadEnquiryDetailsById } from '../../../../store/lead-attribute-update/get-leadEnquiryDetails-slice';

interface PropsType {
    setVoidFeeModal: (e: any) => void;
}

const AdjustFee: React.FC<PropsType> = ({ setVoidFeeModal }) => {
    const { leadCaptureId } = useParams();
    const [voidApplicationFee, setVoidApplicationFee] = useState(false);
    const [voidRegistrationFee, setVoidRegistrationFee] = useState(false);

    const { responseOfLeadEnquiryDetailsById } = useSelector(
        (state: RootState) => state.getLeadEnquiryDetailsDataById
    );

    const { isLoading, voidFeeStatusResponse } = useSelector(
        (state: RootState) => state.voidFeeStatus
    );

    const currentActiveEnquiry = Array.isArray(responseOfLeadEnquiryDetailsById)
        ? responseOfLeadEnquiryDetailsById.filter((item: any) => item.status === 'ACTIVE')
        : [];

    const activeEnquiry = currentActiveEnquiry[0];

    const academicCareerName = activeEnquiry?.careerName;
    const academicProgramName = activeEnquiry?.programName;

    const applicationFeeStatus = activeEnquiry?.leadApplicationStatusDTOS.find(
        (item: any) => item.name === 'Application Fee'
    )?.status;

    const registrationFeeStatus = activeEnquiry?.leadApplicationStatusDTOS.find(
        (item: any) => item.name === 'Registration Fee'
    )?.status;

    const handleSave = () => {
        const coreApplicationStatusIds = [];
        if (voidApplicationFee) coreApplicationStatusIds.push(3);
        if (voidRegistrationFee) coreApplicationStatusIds.push(5);

        const payload = {
            leadEnquiryId: activeEnquiry?.leadEnquiryId,
            leadCaptureId,
            coreApplicationStatusIds,
            applicationPaymentTypeId: voidApplicationFee ? 1 : null,
            registrationPaymentTypeId: voidRegistrationFee ? 6 : null,
        };

        store.dispatch(voidFeeStatus(payload));
    };

    useEffect(() => {
        if (voidFeeStatusResponse !== '' && !isLoading) {
            setVoidFeeModal(false);
            store.dispatch(resetVoidFeeStatusResponse());
            const payloadForApplicationStatus = {
                leadCaptureId,
                leadEnquiryId: activeEnquiry?.leadEnquiryId,
            };
            store.dispatch(getLeadEnquiryDetailsById(leadCaptureId));
            store.dispatch(getMaxActiveAppStatus(payloadForApplicationStatus));
            store.dispatch(getLeadApplicationStatusByLeadId(payloadForApplicationStatus));
        }
    }, [voidFeeStatusResponse]);

    return (
        <div className="space-y-6">
            {/* Header Info */}
            <div className="border border-gray-300 bg-white rounded-md p-4 shadow-sm">
                <h2 className="text-base font-semibold text-gray-700 mb-2">Enquiry Details</h2>
                <div className="text-sm text-gray-600 space-y-1">
                    <p><strong>Enquiry ID:</strong> {activeEnquiry?.leadEnquiryId || 'N/A'}</p>
                    <p><strong>Career:</strong> {academicCareerName || 'N/A'}</p>
                    <p><strong>Program:</strong> {academicProgramName || 'N/A'}</p>
                </div>
            </div>

            {/* Warning Message */}
            <div className="border-l-4 border-yellow-400 bg-yellow-50 p-4 rounded-md">
                <h3 className=" font-semibold text-yellow-800 mb-1 text-lg">⚠️ Important Notice</h3>
                <p className="text-sm text-yellow-700">
                    Once the fee is voided, it will no longer be linked to the enquiry but will remain associated to the lead capture ID.
                    Any future changes related to this fee can only be handled through the backend team.
                    <br />
                    <br />
                    <span className='font-medium'>Kindly ensure accuracy and double-check your selections before proceeding.</span>
                </p>
            </div>

            {/* Fee Options */}
            <div className="bg-gray-50 border border-gray-200 rounded-md p-4">
                <h2 className="text-base font-semibold text-gray-700 mb-3">Select Fees to Void</h2>
                <div className="space-y-3 flex flex-col">
                    {applicationFeeStatus && (
                        <Checkbox
                            checked={voidApplicationFee}
                            onChange={(e) => setVoidApplicationFee(e.target.checked)}
                        >
                            Void Application Fee
                        </Checkbox>
                    )}
                    {registrationFeeStatus && (
                        <Checkbox
                            checked={voidRegistrationFee}
                            onChange={(e) => setVoidRegistrationFee(e.target.checked)}
                        >
                            Void Registration Fee
                        </Checkbox>
                    )}
                    {!applicationFeeStatus && !registrationFeeStatus && (
                        <p className="text-gray-500 text-sm italic">
                            No applicable fees found for the active enquiry.
                        </p>
                    )}
                </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
                <Button
                    type="primary"
                    loading={isLoading}
                    disabled={(!voidApplicationFee && !voidRegistrationFee) || isLoading}
                    onClick={handleSave}
                >
                    Confirm Void
                </Button>
            </div>
        </div>
    );
};

export default AdjustFee;
