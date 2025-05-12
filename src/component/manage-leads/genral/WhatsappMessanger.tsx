import React, { useEffect } from 'react';

import { FaWhatsapp, FaCommentDots } from 'react-icons/fa';
import { getAllWhatsappTemplate } from '../../../store/whatsapp -messenger/get-allWhatsappTemplate-slice';
import store, { RootState } from '../../../store';
import { useSelector } from 'react-redux';
import { getWhatsapptemplateByTemplateId } from '../../../store/whatsapp -messenger/get-whatsappTemplate-by-templateId-slice';

const WhatsAppMessenger: React.FC = () => {

    useEffect(() => {
        store.dispatch(getAllWhatsappTemplate());
    }, [])

    const { whatsappTemplates } = useSelector((state: RootState) => state.getAllWhatsappTemplate)

    const handleTemplateChange = (e: any) => {
        const templateId = e.target.value;
        store.dispatch(getWhatsapptemplateByTemplateId(templateId))

    };

    return (
        <div className=" flex items-center justify-center bg-gradient-to-br from-blue-400 via-blue-500 to-blue-700 p-6">
            <div className="w-full bg-white p-12 rounded-3xl shadow-2xl border border-blue-200">
                <div className="flex flex-col items-center justify-center mb-8">
                    <FaCommentDots className="text-blue-700 w-10 h-10 mb-2" />
                    <h2 className="text-4xl font-extrabold text-blue-800 tracking-tight text-center">WhatsApp Message Sender</h2>
                    <p className="text-sm text-blue-500 mt-1">Choose a template and send a quick message to your leads.</p>
                </div>

                <form className="">
                    <div>
                        <label className="block text-blue-900 font-medium mb-3 text-lg">Choose Template</label>
                        <select
                            // value={}
                            onChange={handleTemplateChange}
                            className="w-full border border-blue-300 p-4 rounded-xl bg-blue-50 text-blue-900 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                        >
                            <option value="">-- Select Template --</option>

                            {whatsappTemplates.map((template) => (
                                <option key={template.vendorTemplateId} value={template.displayName}>{template.displayName}</option>

                            ))}
                        </select>
                    </div>

                    {/* {message && (
                        <div className="bg-blue-50 border border-blue-300 p-6 rounded-2xl text-blue-900 shadow-inner">
                            <strong className="block mb-3 text-xl">📨 Message Preview</strong>
                            <p className="text-md leading-relaxed">{message}</p>
                        </div>

                    )} */}

                    <div className="text-center">
                        <button

                            type="button"

                            className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-bold px-10 py-4 rounded-full shadow-lg transition duration-300 text-lg flex items-center justify-center gap-2 mx-auto"
                        >
                            <FaWhatsapp className="w-6 h-6" /> Send via WhatsApp
                        </button>
                    </div>
                </form>
            </div>
        </div>

    );

};

export default WhatsAppMessenger;
