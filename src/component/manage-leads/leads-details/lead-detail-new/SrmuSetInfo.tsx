import React, { useEffect, useState } from "react";
import { MdOutlineEdit } from "react-icons/md";
import { RxCheck, RxCross2 } from "react-icons/rx";
import { useSelector } from "react-redux";
import store, { RootState } from "../../../../store";
import dayjs from "dayjs";
import { saveSrmuSetOptionById } from "../../../../store/srmuset/save-srmuset-option-slice";
import { getSrmusetOptionDetails } from "../../../../store/srmuset/get-srmuSetOption-detail-slice";
import { getLeadApplicationStatusByLeadId } from "../../../../store/lead-applicationStatus/get-lead-application-status-by-lead-capture-id-slice";
import { getMaxActiveAppStatus } from "../../../../store/scholarship-services/get-max-active-application-status-slice";
import { useParams } from "react-router-dom";

const SrmuSetInfo: React.FC = () => {
    const { leadCaptureId } = useParams();
  const [isEditing, setEditing] = useState(false);
  const [isOpted, setIsOpted] = useState<"yes" | "no" | "">("no");
  const [examDate, setExamDate] = useState<string>("");
  const [dateError, setDateError] = useState<string>("");

  const { isLoading, srmusetOptionDetails } = useSelector(
    (state: RootState) => state.getSrmusetOptionDetails
  );


  const { isLoading: isLoadingForSave, responseOfSaveSrmuSetOption } = useSelector(
    (state: RootState) => state.saveSrmuSetOption
  );

  useEffect(() => {
    if (!isLoading) {
      if (srmusetOptionDetails) {
        setIsOpted(srmusetOptionDetails.isSrmuSetOpted === true ? "yes" : "no");
        setExamDate(
          dayjs(srmusetOptionDetails.preferedDate || "").format("YYYY-MM-DD")
        );
      } else {
        setIsOpted("");
        setExamDate("");
      }
    }
  }, [srmusetOptionDetails, isLoading]);
  const { responseOfLeadEnquiryDetailsById } = useSelector(
    (state: RootState) => state.getLeadEnquiryDetailsDataById
  );
  const activeEnquiry = Array.isArray(responseOfLeadEnquiryDetailsById)
    ? responseOfLeadEnquiryDetailsById.filter(
        (item: any) => item.status === "ACTIVE"
      )
    : [];
  const leadEnquiryId = activeEnquiry[0].leadEnquiryId;

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleRadioChange = (value: "yes" | "no") => {
    setIsOpted(value);
    setDateError("");
    if (value === "no") setExamDate("");
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = e.target.value;
    const today = new Date().toISOString().split("T")[0]; // format: YYYY-MM-DD

    if (selectedDate < today) {
      setDateError("Exam date cannot be earlier than today.");
    } else {
      setDateError("");
    }

    setExamDate(selectedDate);
  };

  const handleSubmit = () => {
    if (dateError === "") {
      const payload = {
        leadEnquiryId: leadEnquiryId,
        leadSrmuSetOptionId: srmusetOptionDetails
          ? srmusetOptionDetails.leadSrmuSetOptionId
          : null,
        isSrmuSetOpted: isOpted === "yes" ? true : false,
        preferedDate: examDate === "" ? null : examDate,
      };

      setEditing(false);
      store.dispatch(saveSrmuSetOptionById(payload));
    }
  };

  useEffect(() => {
    if(responseOfSaveSrmuSetOption!==null) {
      const leadEnquiryId = activeEnquiry[0].leadEnquiryId;
      const payloadForApplicationStatus = {
        leadCaptureId: leadCaptureId,
        leadEnquiryId: leadEnquiryId,
      };
      store.dispatch(getLeadApplicationStatusByLeadId(payloadForApplicationStatus));
      store.dispatch(getMaxActiveAppStatus(payloadForApplicationStatus));
    }
  }, [responseOfSaveSrmuSetOption])

  const handleCancel = () => {
    store.dispatch(getSrmusetOptionDetails(leadEnquiryId));
    setEditing(false);
  };

  return (
    <>
      <div className="bg-white relative  mt-5  pb-1">
        <div className="flex justify-between items-center h-[50px] relative bg-blue-100 ">
          <h1 className="text-lg font-semibold px-4">Opted For SRMUSET</h1>
          {!isEditing && (
            <button
              className=" px-6 py-1.5  font-medium rounded-lg"
              onClick={handleEditClick}
            >
              <MdOutlineEdit size={20} />
            </button>
          )}
          {isEditing && (
            <div className="flex gap-4 mr-5">
              <button
                type="button"
                className=" py-1.5 font-medium rounded"
                onClick={handleCancel}
              >
                <RxCross2 size={22} color="red" />
              </button>
              <button
                type="button"
                className=" py-1.5 font-medium rounded"
                onClick={handleSubmit}
                disabled={isLoadingForSave}
              >
                <RxCheck size={22} color="green" />
              </button>
            </div>
          )}
        </div>

        <div className="">
          <div className="px-5 py-4 space-y-4">
            <div className="flex items-center gap-2">
              <label className="block text-[16px] font-medium mb-2 mr-4 text-gray-700">
                Do you want to opt for SRMUSET Scholarship?
              </label>
              <div className="flex gap-6">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="srmuSetScholarship"
                    className="scale-125"
                    value="yes"
                    checked={isOpted === "yes"}
                    onChange={() => handleRadioChange("yes")}
                    disabled={!isEditing}
                  />
                  Yes
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="srmuSetScholarship"
                    className="scale-125"
                    value="no"
                    checked={isOpted === "no"}
                    onChange={() => handleRadioChange("no")}
                    disabled={!isEditing}
                  />
                  No
                </label>
              </div>
            </div>

            {/* Conditional Exam Date Input */}
            {isOpted === "yes" && (
              <div>
                <div className="flex gap-2 items-center">
                  <label
                    htmlFor="examDate"
                    className="block font-medium mb-1 flex-nowrap text-nowrap text-gray-700"
                  >
                    Prefferd Exam Date :
                  </label>
                  <input
                    type="date"
                    id="examDate"
                    name="examDate"
                    value={examDate}
                    disabled={!isEditing}
                    onChange={handleDateChange}
                    className="border border-gray-400 rounded px-3 py-1 w-48"
                  />
                </div>
                {dateError && (
                  <p className="text-sm text-red-500 mt-1">{dateError}</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SrmuSetInfo;
