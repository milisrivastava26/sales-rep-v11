import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import store, { RootState } from "../../../store";
import { IoCall } from "react-icons/io5";
import { makeCallRequest } from "../../../store/lead-contact-phone/make-call-slice";
import toast from "react-hot-toast";
import { getLeadContactDetailsById } from "../../../store/lead-attribute-update/get-leadContactDetails-byId-slice";

interface Lead {
  leadContactPhoneId: number;
  contactName: string;
  contactRelation: string;
  contactNumber: string;
  primary: boolean;
}

const CallingLeads: React.FC = () => {
  const { leadCaptureId } = useParams<{ leadCaptureId: string }>();
  useEffect(() => {
    store.dispatch(getLeadContactDetailsById(leadCaptureId));
  }, [leadCaptureId]);

  const { isLoading, responseOfLeadContactDetailsById } = useSelector(
    (state: RootState) => state.getLeadContactDetailsDataById
  );
  const { userDetails } = useSelector(
    (state: RootState) => state.getLoggedInUserData
  );
  const { phone: executiveNum } = userDetails;

  const [leads, setLeads] = useState<Lead[]>([]);

  useEffect(() => {
    if (Array.isArray(responseOfLeadContactDetailsById)) {
      setLeads(responseOfLeadContactDetailsById);
    }
  }, [responseOfLeadContactDetailsById]);

  const handleCall = (phoneNumber: string) => {
    const leadSourceId = leadCaptureId;
    const leadStageId = 1;
    const leadNum = phoneNumber;
    if (leadStageId) {
      store.dispatch(
        makeCallRequest({ executiveNum, leadNum, leadSourceId, leadStageId })
      );
    } else {
      toast("Sorry 😔,This Lead is not able to make call.", {
        duration: 6000,
      });
    }
  };

  return (
    <>
      {responseOfLeadContactDetailsById !== null && !isLoading && (
        <div className="bg-white rounded-lg pb-4 px-4">
          <div className="overflow-x-auto">
            <table className="w-full text-left shadow-sm rounded-lg">
              <thead>
                <tr className="text-gray-800 text-sm uppercase tracking-wider">
                  <th className="px-4 pb-2 border-b text-nowrap">Name</th>
                  <th className="px-4 pb-2 border-b text-nowrap">Relation</th>
                  <th className="px-4 pb-2 border-b text-nowrap">
                    Phone Number
                  </th>
                  <th className="px-4 pb-2 border-b text-nowrap">Primary</th>
                  <th className="px-4 pb-2 border-b text-nowrap">Action</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead) => (
                  <tr
                    key={lead.leadContactPhoneId}
                    className="bg-gray-50 hover:bg-gray-100 transition duration-200"
                  >
                    <td className="px-4 py-2  border-b text-nowrap">
                      {lead.contactName}
                    </td>
                    <td className="px-4 py-2 border-b text-nowrap">
                      {lead.contactRelation}
                    </td>
                    <td className="px-4 py-2 border-b text-nowrap">
                      {lead.contactNumber}
                    </td>
                    <td className="px-4 py-2 border-b text-nowrap">
                      {lead.primary ? "Yes" : "No"}
                    </td>
                    <td className="px-4 py-2 border-b text-center text-nowrap">
                      <button
                        onClick={() => handleCall(lead.contactNumber)}
                        className="p-1 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-200 shadow-md"
                      >
                        <IoCall size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default CallingLeads;
