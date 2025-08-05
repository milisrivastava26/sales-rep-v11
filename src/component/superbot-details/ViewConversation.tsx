import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Modal, Spin } from "antd";
import { FaUser, FaRobot } from "react-icons/fa";
import store, { RootState } from "../../store";
import {
    getSuperbotConversationByPhone,
    resetSuperbotConversation,
} from "../../store/superbot-details/get-superbotConversation-slice";
import { FaBookOpen, FaGraduationCap } from "react-icons/fa6";

interface convoProps {
    phone: string;
}

const ViewConversation: React.FC<convoProps> = ({ phone }) => {
    const [openModal, setOpenModal] = useState(false);

    const handleView = () => {
        setOpenModal(true);
        store.dispatch(resetSuperbotConversation());
        store.dispatch(getSuperbotConversationByPhone(phone));
    };

    const handleClose = () => {
        setOpenModal(false);
    };

    const { conversation, isLoading } = useSelector(
        (state: RootState) => state.getSuperbotConvo
    );

    return (
        <div>
            <button
                className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-1 text-sm rounded-md font-medium"
                onClick={handleView}
            >
                View
            </button>

            <Modal
                open={openModal}
                onCancel={handleClose}
                footer={null}
                centered
                title="Superbot Conversation"
                width={750}
            >
                {isLoading ? (
                    <div className="flex justify-center items-center h-40">
                        <Spin tip="Loading..." size="large" />
                    </div>
                ) : conversation ? (
                    <div className="space-y-4">
                        {/* Career Info */}
                        <div className="bg-gray-100 px-4 py-2 rounded-md flex items-center gap-2">
                            <FaGraduationCap className="text-gray-500 text-lg" />
                            <p className="text-sm text-gray-500">Career:</p>
                            <p className="font-medium text-sm">{conversation.career}</p>
                        </div>

                        {/* Program Info */}
                        <div className="bg-gray-100 px-4 py-2 rounded-md flex items-center gap-2">
                            <FaBookOpen className="text-gray-500 text-[15px]" />
                            <p className="text-sm text-gray-500">Program:</p>
                            <p className="font-medium text-sm">{conversation.program}</p>
                        </div>


                        {/* Chat Conversation */}
                        <div className="bg-white p-4 border rounded-md">
                            <p className="text-sm text-gray-500 mb-2">Conversation</p>
                            <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
                                {conversation.conversation.map((line: string, index: number) => {
                                    const isUser = line.startsWith("user:");
                                    const message = line.replace(/^(superbot:|user:)\s*/, "");

                                    return (
                                        <div
                                            key={index}
                                            className={`flex ${isUser ? "justify-end" : "justify-start"}`}
                                        >
                                            <div className="flex mt-3 items-start gap-2 max-w-[75%]">
                                                {/* ICON */}
                                                <div className="mt-1">
                                                    {isUser ? (
                                                        <div className="w-8 h-8 rounded-full bg-gray-50 border flex justify-center items-center"><FaUser className="text-blue-500 text-[16px]" /></div>
                                                    ) : (
                                                        <div className="w-8 h-8 rounded-full bg-gray-50 border flex justify-center items-center"><FaRobot className="text-green-500 text-xl" /></div>
                                                    )}
                                                </div>

                                                {/* MESSAGE */}
                                                <div
                                                    className={`px-4 py-2 rounded-lg ${isUser
                                                        ? "bg-blue-100 text-blue-800"
                                                        : "bg-green-100 text-green-800"
                                                        }`}
                                                >
                                                    {message}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                ) : (
                    <p className="text-center text-gray-500">No conversation found.</p>
                )}
            </Modal>
        </div>
    );
};

export default ViewConversation;
