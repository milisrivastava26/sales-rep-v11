import React, { useEffect, useState } from 'react';
import { getAllWhatsappTemplate } from '../../../store/whatsapp -messenger/get-allWhatsappTemplate-slice';
import store, { RootState } from '../../../store';
import { useSelector } from 'react-redux';
import { getWhatsapptemplateByTemplateId, resetWhatsappTemplateById } from '../../../store/whatsapp -messenger/get-whatsappTemplate-by-templateId-slice';
import { IoLogoWhatsapp } from 'react-icons/io';
import Select from 'react-select';
import { useParams } from 'react-router-dom';
import { SingleValue } from 'react-select';
import { sendWhatsappByTemplateId } from '../../../store/whatsapp -messenger/send-whatsapp-slice';


const WhatsAppMessenger: React.FC = () => {
    const { leadCaptureId } = useParams();
    const { userDetails } = useSelector(
        (state: RootState) => state.getLoggedInUserData
    );
    const fullName = userDetails?.fullName;


    useEffect(() => {
        store.dispatch(getAllWhatsappTemplate());
    }, []);

    const { responseOfLeadEnquiryDetailsById } = useSelector(
        (state: RootState) => state.getLeadEnquiryDetailsDataById
    );
    const activeEnquiry = Array.isArray(responseOfLeadEnquiryDetailsById)
        ? responseOfLeadEnquiryDetailsById.filter(
            (item: any) => item.status === "ACTIVE"
        )
        : [];

    const leadEnquiryId = activeEnquiry[0]?.leadEnquiryId;
    console.log("activeEnquiry", activeEnquiry)
    const { leadPropertiesDataById } = useSelector(
        (state: RootState) => state.getLeadPropertiesDataById
    );

    const [templateId, setTemplateId] = useState<number>(-1);

    const { isLoading: isLoadingForAlltemplates, whatsappTemplates } = useSelector(
        (state: RootState) => state.getAllWhatsappTemplate
    );

    const { isLoading: isLoadingForTemplateData, whatsappTemplateById } = useSelector((state: RootState) => state.getWhatsappTemplateByTemplateId);
    const {isLoading: isLoadingSendWhatsapp} = useSelector((state:RootState) => state.sendWhatsapp)

    const handleTemplateChange = (
        selectedOption: SingleValue<{ value: string; label: string; id: number }>,
    ) => {
        if (selectedOption?.value) {
            setTemplateId(selectedOption.id);
            store.dispatch(resetWhatsappTemplateById());
            store.dispatch(getWhatsapptemplateByTemplateId(selectedOption.value));
        }
    };

    const templateOptions = whatsappTemplates.map((template) => ({
        value: template.vendorTemplateId,
        label: template.displayName,
        id: template.templateId,
    }));

    const handleSend = () => {
        const payload = {
            toNumber: leadPropertiesDataById.phone,
            templateId: templateId,
            leadCaptureId: leadCaptureId,
            salesrep: fullName,
            leadEnquiryId: leadEnquiryId,
        };

        store.dispatch(sendWhatsappByTemplateId(payload));
    }


    return (
        <div className=" flex items-center justify-center px-10">
            <div className="w-full">
                {/* Header */}
                <div className="flex flex-col items-center text-center space-y-2">
                    <IoLogoWhatsapp className="text-green-600" size={36} />
                    <h2 className="text-xl font-semibold text-gray-800">WhatsApp Message Sender</h2>
                </div>

                {/* Form */}
                <form className="space-y-6 mb-12">
                    {/* Template Select */}
                    <div className="space-y-2">
                        <label className="block text-gray-700 text-sm font-medium">Choose Template</label>
                        <Select
                            options={templateOptions}
                            onChange={handleTemplateChange}
                            isLoading={isLoadingForAlltemplates}
                            isClearable
                            placeholder="-- Select Template --"
                            className="text-sm"
                            classNamePrefix="react-select"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-gray-700 text-sm font-medium">Template Preview</label>
                        {isLoadingForTemplateData ? (
                            <div className="text-sm text-gray-500">Loading template content...</div>
                        ) : whatsappTemplateById !== "" ? (
                            <textarea
                                value={whatsappTemplateById}
                                readOnly
                                rows={8}
                                className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm bg-gray-50 resize-none"
                            />
                        ) : (
                            <div className="text-sm text-gray-400 italic">No template selected.</div>
                        )}
                    </div>
                    {/* Submit Button */}
                    <div className="text-center absolute right-2 bottom-4">
                        <button
                            type="button"
                            onClick={handleSend}
                            disabled={isLoadingSendWhatsapp || whatsappTemplateById === ""}
                            className={`${isLoadingSendWhatsapp || whatsappTemplateById === "" ? "bg-opacity-50" : "hover:bg-blue-700"} inline-flex items-center gap-2 bg-blue-600 text-white font-medium px-4 py-2 rounded-md transition-colors`}
                        >
                            Send
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default WhatsAppMessenger;
