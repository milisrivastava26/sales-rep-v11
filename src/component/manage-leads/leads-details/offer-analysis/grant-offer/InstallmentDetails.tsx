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
  console.log("packageDeal", packageDeal);
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

  console.log(installments);
  useEffect(() => {
    console.log("inside effect");
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

    console.log(installment);

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

    console.log("isValid", isValid);

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

      console.log("finalInstallmentPayload", finalInstallmentPayload);
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
    console.log(deletedInstallment);
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
                    <tr className="w-full">
                      <th className="w-[25%] min-w-[135px] border px-1 py-1.5 text-nowrap">
                        Installment Number
                      </th>
                      <th className="w-[25%] min-w-[135px] border px-1 py-1.5 text-nowrap">
                        Due Date
                      </th>
                      <th className="w-[25%] min-w-[135px] border px-1 py-1.5 text-nowrap">
                        Amount(Rs)
                      </th>
                      <th className="w-[25%] min-w-[135px] border px-1 py-1.5 text-nowrap">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {installments.map((installment, index) => (
                      <tr key={installment.installmentSequence}>
                        <td className="px-1 py-1 text-nowrap border h-[29px]">
                          {installment.installmentSequence}
                        </td>
                        <td className="px-1 py-1 text-nowrap border h-[29px]">
                          {editingId === installment.installmentSequence ? (
                            <DatePicker
                              value={tempDate ? dayjs(tempDate) : null}
                              onChange={(_, dateString) =>
                                setTempDate(dateString)
                              }
                              disabledDate={disabledDate}
                              style={{ width: "100%" }}
                              className="border-remove-date-picker"
                            />
                          ) : (
                            dayjs(installment.dueDate).format("YYYY-MM-DD")
                          )}
                        </td>

                        <td className="px-1 py-1 text-nowrap border h-[29px]">
                          {editingId === installment.installmentSequence ? (
                            <input
                              type="text"
                              className="w-full max-w-[95%] focus:outline-none"
                              value={tempAmount || ""}
                              onChange={(e) =>
                                setTempAmount(parseInt(e.target.value) || 0)
                              }
                            />
                          ) : (
                            installment.installmentAmount
                          )}
                        </td>
                        <td className="px-1 py-1 text-nowrap border h-[29px]">
                          {editingId === installment.installmentSequence ? (
                            <div className="flex">
                              <button
                                className="px-2 py-0.5   text-green-600 border-green-600"
                                onClick={handleOk}
                              >
                                <FaCheck size={18} />
                              </button>
                              <button
                                className="px-2 py-0.5    text-red-500 border-red-500"
                                onClick={handleCancel}
                              >
                                <RxCross2 size={18} />
                              </button>
                            </div>
                          ) : index === installments.length - 1 ? (
                            <div className="flex">
                              <button
                                className="px-2 py-0.5    text-blue-500 border-blue-500"
                                onClick={() =>
                                  handleEditClick(
                                    installment.installmentSequence
                                  )
                                }
                              >
                                <MdModeEditOutline size={18} />
                              </button>
                              <button
                                className="px-2 py-0.5   text-red-500 border-red-500"
                                onClick={() =>
                                  handleDelete(installment.installmentSequence)
                                }
                              >
                                <MdDelete size={18} />
                              </button>
                            </div>
                          ) : null}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {((isAllOfferStatusVoid || isNewOffer) && newInstallmentDetailsResponse.length !== 0) && (
        <div className="mt-5 flex justify-end">
          <button
            className={` bg-blue-600  text-white px-4 py-2 rounded `}
            onClick={handleLockOffer}
            disabled={isLoadingForLockOffer}
          >
            Lock Offer
          </button>
        </div>
      )}
    </>
  );
};

export default InstallmentDetails;
