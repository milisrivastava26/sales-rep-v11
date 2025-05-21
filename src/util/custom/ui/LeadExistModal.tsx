import React from "react";
import { IoClose } from "react-icons/io5";
import { useSelector } from "react-redux";
import { resetResposneforLeadCaptureByQuickAddForm } from "../../../store/lead-capture/create-lead-capture-byQuickAddForm-slice";
import store, { RootState } from "../../../store";

const LeadExistModal: React.FC = () => {
  const dispatch = store.dispatch;
  const { isLeadExistResponse } = useSelector((state: RootState) => state.addLeadCaptureByQuickAddForm);

  const isOpen = isLeadExistResponse?.isDuplicate === true;

  const handleClose = () => {
    dispatch(resetResposneforLeadCaptureByQuickAddForm());
  };

  if (!isOpen) return null;

  const { leadOwner, leadCaptureId, isNewEnquiry } = isLeadExistResponse;

  const renderMessage = () => {
    if (isNewEnquiry) {
      return (
        <>
          <h2 className="text-xl font-bold mb-4 text-center text-green-600">New Enquiry Added</h2>
          <p className="text-gray-700 mb-3">
            <strong className="text-gray-900">Lead already exists. A new lead enquiry has been added under this lead.</strong>
          </p>
        </>
      );
    } else {
      return (
        <>
          <h2 className="text-xl font-bold mb-4 text-center text-red-600">Lead Already Exists</h2>
          <p className="text-gray-700 mb-3">
            <strong className="text-gray-900">This lead is already registered with the same enquiry.</strong>
          </p>
        </>
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white max-w-md w-full rounded-xl shadow-lg p-6 relative animate-fade-in">
        {/* Close button */}
        <button className="absolute top-3 right-3 text-gray-600 hover:text-red-500 transition" onClick={handleClose}>
          <IoClose size={24} />
        </button>

        {/* Message */}
        {renderMessage()}

        {/* Common Info */}
        <p className="text-gray-700">
          <span className="font-semibold">Lead Owner:</span> {leadOwner || "N/A"}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Lead Capture ID:</span> {leadCaptureId || "N/A"}
        </p>
      </div>
    </div>
  );
};

export default LeadExistModal;
