import React, { useEffect, useState } from "react";
import { transformInstallmentTypePayload } from "../../../../../util/actions/transformInstallmentFormPayload";
import store, { RootState } from "../../../../../store";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { lockLeadOffer } from "../../../../../store/offer-details/lead-offer-lock-slice";
import dayjs from "dayjs";
import { DatePicker } from "antd";
import { FaCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { MdDelete, MdModeEditOutline } from "react-icons/md";
import LoadingSpinner from "../../../../../util/custom/ui/LoadingSpinner";
import toast from "react-hot-toast";
import { getTodayDate } from "../../../../../util/actions/getTodayDate";

type Installment = {
  installmentSequence: number;
  dueDate: string;
  installmentAmount: number;
};

interface propsType {
  isNewOffer: boolean;
  isAllOfferStatusVoid: boolean;
}

const InstallmentDetails: React.FC<propsType> = ({
  isNewOffer,
  isAllOfferStatusVoid,
}) => {
  const { leadCaptureId } = useParams();
  const { packageDeal } = useSelector((state: RootState) => state.ui);
  const dispatch = store.dispatch;
  const { FeeDetailsV2Response } = useSelector(
    (state: RootState) => state.getFeeDetailsV2
  );

  const { responseOfLeadEnquiryDetailsById } = useSelector(
    (state: RootState) => state.getLeadEnquiryDetailsDataById
  );

  const { scholarshipData } = useSelector((state: RootState) => state.ui);
  const leadScholarshipDetailsId = "";
  const {
    isLoading: isLoadingForInstallmentCalculation,
    newInstallmentDetailsResponse,
  } = useSelector((state: RootState) => state.getInstallmentCalculation);

  const activeEnquiry = Array.isArray(responseOfLeadEnquiryDetailsById)
    ? responseOfLeadEnquiryDetailsById.filter(
      (item: any) => item.status === "ACTIVE"
    )
    : [];
  const leadEnquiryId =
    activeEnquiry.length > 0 ? activeEnquiry[0].leadEnquiryId : null;

  const { isLoading: isLoadingForLockOffer } = useSelector(
    (state: RootState) => state.lockLeadOffer
  );

  const [lastSelectedDate, setLastSelectedDate] = useState<string | null>(null);
  const [installments, setInstallments] = useState<Installment[]>(
    newInstallmentDetailsResponse
  );

  useEffect(() => {
    setInstallments(newInstallmentDetailsResponse);
  }, [newInstallmentDetailsResponse]);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [tempAmount, setTempAmount] = useState<number | null>(null);
  const [tempDate, setTempDate] = useState<string | null | any>(null);

  // Function to disable dates: previous dates and any previously selected dates
  const disabledDate = (current: any) => {
    const today = dayjs(); // Get today's date
    // Disable any date before today, any previously selected date, and any date before the last selected date
    if (lastSelectedDate) {
      return (
        current.isBefore(dayjs(lastSelectedDate), "day") ||
        current.isSame(dayjs(lastSelectedDate), "day") ||
        current.isBefore(today, "day")
      );
    }
    return current.isBefore(today, "day"); // If no date selected yet, just disable previous dates
  };

  const handleEditClick = (id: number) => {
    setEditingId(id);
    const installment = installments.find(
      (inst) => inst.installmentSequence === id
    );

    if (installment) {
      setTempAmount(installment.installmentAmount);
      setTempDate(installment.dueDate); // Ensure this is a valid date string
    }
  };



  const handleCancel = () => {
    setEditingId(null);
    setTempAmount(null);
    setTempDate(null);
  };

  const handleLockOffer = () => {
    const isValid = installments.every(
      (item: any, index: number, arr: any[]) => {
        if (index === 0) return true; // skip first item
        const prevDate = dayjs(arr[index - 1].dueDate);
        const currentDate = dayjs(item.dueDate);

        if (!currentDate.isAfter(prevDate)) {
          toast.error(
            `Installment date at position ${index + 1
            } must be after the previous one.`
          );
          return false;
        }

        return true;
      }
    );


    if (isValid === false) {
      return;
    } else {
      const finalInstallmentPayload = transformInstallmentTypePayload(
        FeeDetailsV2Response,
        leadCaptureId,
        leadEnquiryId,
        scholarshipData,
        leadScholarshipDetailsId,
        installments,
        packageDeal
      );

      dispatch(lockLeadOffer(finalInstallmentPayload));
    }
  };

  const handleOk = () => {
    if (editingId === null || tempAmount === null || tempDate === null) return;
    if (tempAmount === 0) {
      toast.error("Amount cannot be 0");
      return;
    }
    if (tempDate === "") {
      toast.error("Please select a date");
      return;
    }

    const date = getTodayDate();
    if (tempDate === date) {
      toast.error("Date cannot be today's date");
      return;
    }

    const installmentToEdit = installments.find(
      (inst) => inst.installmentSequence === editingId
    );
    if (!installmentToEdit) return;

    if (tempAmount > installmentToEdit.installmentAmount) {
      toast.error(
        "Amount cannot be greater than the current installment amount."
      );
      return;
    }

    const updatedInstallments = installments.map((installment) => {
      if (installment.installmentSequence === editingId) {
        return {
          ...installment,
          installmentAmount: tempAmount,
          dueDate: tempDate,
        };
      }
      return installment;
    });

    const initialTotalAmount = installments.reduce(
      (sum, inst) => sum + inst.installmentAmount,
      0
    );
    const currentTotalAmount = updatedInstallments.reduce(
      (sum, inst) => sum + inst.installmentAmount,
      0
    );
    let remainingAmount = initialTotalAmount - currentTotalAmount;

    const currentInstallmentCount = updatedInstallments.length;

    if (remainingAmount > 0) {
      // Check if we can add at least one new installment without exceeding the limit
      if (currentInstallmentCount >= 4) {
        toast.error("Installment count cannot be more than 4.");
        return;
      }

      const newInstallments: Installment[] = [];
      let nextId = currentInstallmentCount + 1;

      while (
        remainingAmount > 0 &&
        newInstallments.length + currentInstallmentCount < 4
      ) {
        const newInstallmentAmount = Math.min(remainingAmount);
        newInstallments.push({
          installmentSequence: nextId,
          dueDate: new Date().toISOString().split("T")[0],
          installmentAmount: newInstallmentAmount,
        });
        nextId++;
        remainingAmount -= newInstallmentAmount;
      }

      // If there's still remaining amount but we reached the limit
      if (remainingAmount > 0) {
        toast.error("Cannot split amount because installment count exceeds 4.");
        return;
      }

      setInstallments([...updatedInstallments, ...newInstallments]);
    } else {
      setInstallments(updatedInstallments);
    }

    setLastSelectedDate(tempDate);
    setEditingId(null);
    setTempAmount(null);
    setTempDate(null);
  };

  const handleDelete = (id: number) => {
    if (installments.length < 3) {
      toast.error("Installment count must be at least 2.");
      return;
    }
    const deletedInstallment = installments.find(
      (inst) => inst.installmentSequence === id
    );
    if (!deletedInstallment) return;

    const remainingAmount = deletedInstallment.installmentAmount;

    // Find the index of the deleted installment
    const deletedIndex = installments.findIndex(
      (inst) => inst.installmentSequence === id
    );

    // Remove the deleted installment from the array
    let updatedInstallments = installments.filter(
      (inst) => inst.installmentSequence !== id
    );

    // Add the deleted amount to the previous installment if possible
    if (deletedIndex > 0) {
      const prevInstallment = updatedInstallments[deletedIndex - 1];

      const updatedPrevInstallment = {
        ...prevInstallment,
        installmentAmount: prevInstallment.installmentAmount + remainingAmount,
      };

      updatedInstallments = [
        ...updatedInstallments.slice(0, deletedIndex - 1),
        updatedPrevInstallment,
        ...updatedInstallments.slice(deletedIndex),
      ];
    } else {
      updatedInstallments = [
        ...updatedInstallments,
        {
          installmentSequence: updatedInstallments.length + 1,
          dueDate: new Date().toISOString().split("T")[0],
          installmentAmount: remainingAmount,
        },
      ];
    }

    setInstallments(updatedInstallments);
  };

  return (
    <>
      <div className="bg-white">
        <h1 className="text-xl px-4 font-semibold text-[#3b82f6]">
          Installment Details
        </h1>
        {/* installment details */}
        {isLoadingForInstallmentCalculation && (
          <LoadingSpinner
            centered={false}
            size={20}
            message="Calculationg Installments"
            mainLoading={false}
          />
        )}

        <div className="w-full mt-5 lg:mt-0 px-5">
          <div className="border h-[calc(100%-40px)]">
            <div className="w-full px-3 py-3">
              <div className="w-full overflow-x-auto ">
                <table
                  className="text-sm"
                  border={1}
                  style={{ width: "100%", textAlign: "left" }}
                >
                  <thead>
                    <tr id="installment_table_header">
                      <th id="installment_number" className="w-[25%] min-w-[135px] border px-1 py-1.5 text-nowrap">
                        Installment Number
                      </th>
                      <th id="due_date_header" className="w-[25%] min-w-[135px] border px-1 py-1.5 text-nowrap">
                        Due Date
                      </th>
                      <th id="amount_header" className="w-[25%] min-w-[135px] border px-1 py-1.5 text-nowrap">
                        Amount (₹)
                      </th>
                      <th id="actions_header" className="w-[25%] min-w-[135px] border px-1 py-1.5 text-nowrap">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody id="installment_table_body">
                    {installments.map((installment, index) => {
                      const isEditing = editingId === installment.installmentSequence;
                      return (
                        <tr
                          key={installment.installmentSequence}
                          id={`installment_row_${installment.installmentSequence}`}
                          className="border"
                        >
                          <td id={`installment_number_${installment.installmentSequence}`} className="border px-1 py-2">
                            {installment.installmentSequence}
                          </td>
                          <td id={`due_date_cell_${installment.installmentSequence}`} className="border px-1 py-2">
                            {isEditing ? (
                              <DatePicker
                                id={`datepicker_${installment.installmentSequence}`}
                                value={dayjs(tempDate)}
                                disabledDate={disabledDate}
                                onChange={(date) =>
                                  setTempDate(date ? date.format("YYYY-MM-DD") : null)
                                }
                              />
                            ) : (
                              dayjs(installment.dueDate).format("DD/MM/YYYY")
                            )}
                          </td>
                          <td id={`amount_cell_${installment.installmentSequence}`} className="border px-1 py-2">
                            {isEditing ? (
                              <input
                                id={`input_amount_${installment.installmentSequence}`}
                                type="number"
                                value={tempAmount ?? ""}
                                onChange={(e) => setTempAmount(Number(e.target.value))}
                                className="border rounded px-1 py-1 w-[90px]"
                              />
                            ) : (
                              `₹ ${installment.installmentAmount}`
                            )}
                          </td>
                          <td id={`actions_cell_${installment.installmentSequence}`} className="border px-1 py-2">
                            {isEditing ? (
                              <div id={`edit_actions_${installment.installmentSequence}`} className="flex gap-2 items-center">
                                <button
                                  id={`ok_button_${installment.installmentSequence}`}
                                  onClick={handleOk}
                                  className="text-green-600"
                                >
                                  <FaCheck />
                                </button>
                                <button
                                  id={`cancel_button_${installment.installmentSequence}`}
                                  onClick={handleCancel}
                                  className="text-red-500"
                                >
                                  <RxCross2 />
                                </button>
                              </div>
                            ) : (
                              <div id={`view_actions_${installment.installmentSequence}`} className="flex gap-2 items-center">
                                <button
                                  id={`edit_button_${installment.installmentSequence}`}
                                  onClick={() => handleEditClick(installment.installmentSequence)}
                                  className="text-blue-500"
                                >
                                  <MdModeEditOutline />
                                </button>
                                {index !== 0 && (
                                  <button
                                    id={`delete_button_${installment.installmentSequence}`}
                                    onClick={() => handleDelete(installment.installmentSequence)}
                                    className="text-red-500"
                                  >
                                    <MdDelete />
                                  </button>
                                )}
                              </div>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>

                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {((isAllOfferStatusVoid || isNewOffer) && newInstallmentDetailsResponse.length !== 0) && (
        <div id="installment_lock_button_wrapper" className="flex justify-end px-5 py-3">
          <button
            id="lock_offer_button"
            onClick={handleLockOffer}
            disabled={isLoadingForLockOffer}
            className={`rounded bg-blue-500 text-white px-3 py-2 hover:bg-blue-600 disabled:bg-gray-300`}
          >
            {isLoadingForLockOffer ? "Locking..." : "Lock Offer"}
          </button>
        </div>
      )}
    </>
  );
};

export default InstallmentDetails;
