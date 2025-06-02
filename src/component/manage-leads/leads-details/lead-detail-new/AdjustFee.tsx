import React, { useState } from 'react';
import { Tabs, Button, Checkbox, Alert, Space } from 'antd';
import { useSelector } from 'react-redux';
import store, { RootState } from '../../../../store';
import LoadingSpinner from '../../../../util/custom/ui/LoadingSpinner';
import { useParams } from 'react-router-dom';
import { ChangeLeadEnquiryStatus } from '../../../../store/lead-merge/change-leadEnquiryStatus-by-captureId-existingEnquiryId-newActiveEnquiryId-slice';

interface AdjustFeeProps {
    newLeadEnquiryId: string;
}

const AdjustFee: React.FC<AdjustFeeProps> = ({ newLeadEnquiryId }) => {
    const { getEnquiryChangeWarningResponse, isLoading } = useSelector((state: RootState) => state.getEnquiryChangeWarning);
    const { isLoading: isLoadingForChangeEnquiry } = useSelector(
        (state: RootState) => state.changeLeadEnquiryStatus
    );

    const { responseOfLeadEnquiryDetailsById } = useSelector(
        (state: RootState) => state.getLeadEnquiryDetailsDataById
    );

    const [activeKey, setActiveKey] = useState('1');

    const [voidApplicationFee, setVoidApplicationFee] = useState(false);
    const [voidRegistrationFee, setVoidRegistrationFee] = useState(false);

    const activeEnquiry = Array.isArray(responseOfLeadEnquiryDetailsById)
        ? responseOfLeadEnquiryDetailsById.filter(
            (item: any) => item.status === "ACTIVE"
        )
        : [];

    const previousLeadEnquiryId = activeEnquiry[0].leadEnquiryId;
    const { leadCaptureId } = useParams();

    const handleContinue = () => {
        setActiveKey('2');
    };

    const handleSave = () => {
        const payload = {
            leadCaptureId: leadCaptureId,
            existingLeadEnquiryId: previousLeadEnquiryId,
            newEnquiryId: newLeadEnquiryId,
            voidApplicationFee: voidApplicationFee,
            voidRegistrationFee: voidRegistrationFee
        }

        store.dispatch(ChangeLeadEnquiryStatus(payload));
    }
    const tabItems = [
        {
            key: '1',
            label: 'Adjust Fees',
            children: (
                <Space direction="vertical" size="large" className="w-full">
                    <Alert
                        type="info"
                        message="Note"
                        description="The system adjusts both application and registration fees by default. If the enquiry has payments, they are merged automatically. To void either or both, please select accordingly."
                        showIcon
                    />
                    <Checkbox
                        checked={voidApplicationFee}
                        onChange={(e) => setVoidApplicationFee(e.target.checked)}
                    >
                        Void Application Fee
                    </Checkbox>
                    <Checkbox
                        checked={voidRegistrationFee}
                        onChange={(e) => setVoidRegistrationFee(e.target.checked)}
                    >
                        Void Registration Fee
                    </Checkbox>
                    <div className="text-right">
                        {getEnquiryChangeWarningResponse ? (
                            <Button type="primary" onClick={handleContinue}>
                                Continue
                            </Button>
                        ) : (
                            <Button type="primary" onClick={handleSave} disabled={isLoadingForChangeEnquiry}>
                                Confirm
                            </Button>
                        )}
                    </div>
                </Space>
            ),
        },
        ...(getEnquiryChangeWarningResponse
            ? [
                {
                    key: '2',
                    label: 'Confirmation',
                    children: (
                        <Space direction="vertical" size="large" className="w-full">
                            <Alert
                                type="warning"
                                message="Warning: Data Rollback Alert"
                                description={
                                    <div className="text-justify">
                                        <p className="mb-2">
                                            Changing the <b>default enquiry</b> will <b>undo all awarded scholarships</b>, recalculate the fee structure, and <b>reset the installment breakdown</b>.
                                        </p>
                                        <p className="mb-2">
                                            The student's portal will also be rolled back to the Offer Analysis step.
                                        </p>
                                        <p>
                                            <b>Are you sure you want to proceed?</b>
                                        </p>
                                    </div>
                                }
                                showIcon
                            />
                            <div className="text-right">
                                <Button type="primary" onClick={handleSave} disabled={isLoadingForChangeEnquiry}>
                                    Confirm
                                </Button>
                            </div>
                        </Space>
                    ),
                },
            ]
            : []),
    ];

    if (isLoading) {
        return (
            <LoadingSpinner
                centered={false}
                size={20}
                message="Loading..."
                mainLoading={true}
            />
        )
    }
    return (

        <div style={{ padding: '1rem' }}>
            <Tabs activeKey={activeKey} onChange={setActiveKey} items={tabItems} />
        </div>
    );
};

export default AdjustFee;
