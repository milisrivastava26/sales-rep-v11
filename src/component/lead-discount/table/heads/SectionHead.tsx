import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import store, { AppDispatch, RootState } from "../../../../store";
import { postDiscountToPs, resetResponseForPostDiscountToPs } from "../../../../store/lead-discount/postDiscountToPsSlice";
import { getDiscountAudits } from "../../../../store/lead-discount/getDiscountAuditsSlice";
import { getLeadsForDiscountAudit } from "../../../../store/ui/ui-slice";
import { exportDiscountedLead } from "../../../../store/lead-discount/export-leadDiscount-slice";

interface SectionHeadPropsType {
  isMode: "unprocessed" | "processed";
}

const SectionHead: React.FC<SectionHeadPropsType> = ({ isMode }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, responseOfPostDiscountToPs } = useSelector((state: RootState) => state.postDiscountToPs);
  const { discountAuditLeads, processedDiscountLead } = useSelector((state: RootState) => state.ui);

  const { responseOfGetDiscountAudits } = useSelector((state: RootState) => state.getDiscountAudits);
  const { responseOfGetProcessedDiscountAudits } = useSelector((state: RootState) => state.getProcessedDiscountAudits);

  const [selectedAction, setSelectedAction] = useState<any>(null);

  // 🔹 Options for react-select
  const actionOptions = [
    { value: "post", label: "Post" },
    { value: "export", label: "Export" },
    { value: "bulkExport", label: "Bulk Export" },
  ];

  const processedActionOptions = [
    { value: "export", label: "Export" },
    { value: "bulkExport", label: "Bulk Export" },
  ];

  // 🔹 Handle Post
  const handlePost = () => {
    const payload = discountAuditLeads.map((item: any) => ({
      employeeId: item.psEmployeeId,
      amount: item.totalDiscount,
      transactionType: "Discount",
      captureId: item.leadCaptureId.toString(),
    }));
    dispatch(postDiscountToPs(payload));
  };

  // 🔹 Handle Export
  const handleExport = () => {
    if (isMode === "unprocessed") {
      store.dispatch(exportDiscountedLead(discountAuditLeads));
    } else {
      store.dispatch(exportDiscountedLead(processedDiscountLead));
    }
  };

  const handleBulkExport = () => {
    if (isMode === "unprocessed") {
      store.dispatch(exportDiscountedLead(responseOfGetDiscountAudits));
    } else {
      store.dispatch(exportDiscountedLead(responseOfGetProcessedDiscountAudits));
    }
  };

  // 🔹 Handle dropdown change
  const handleActionChange = (selectedOption: any) => {
    console.log(selectedOption);
    setSelectedAction(selectedOption);

    if (selectedOption?.value === "post") {
      handlePost();
    } else if (selectedOption?.value === "export") {
      handleExport();
    } else if (selectedOption?.value === "bulkExport") {
      handleBulkExport();
    }

    // reset dropdown after action
    setSelectedAction(null);
  };

  useEffect(() => {
    if (responseOfPostDiscountToPs !== "") {
      dispatch(resetResponseForPostDiscountToPs());
      dispatch(getDiscountAudits());
      dispatch(getLeadsForDiscountAudit([]));
    }
  }, [responseOfPostDiscountToPs, dispatch]);

  return (
    <div className="w-full border-b border-gray-200 mb-3 flex justify-end items-center pb-3">
      <div className="flex gap-3 items-center justify-end">
        {isMode === "unprocessed" && discountAuditLeads.length !== 0 && (
          <div className="min-w-[180px]">
            <Select value={selectedAction} onChange={handleActionChange} options={actionOptions} placeholder="Select Action" isDisabled={isLoading} isClearable />
          </div>
        )}

        {isMode === "processed" && processedDiscountLead.length !== 0 ? (
          <Select value={selectedAction} onChange={handleActionChange} options={processedActionOptions} placeholder="Select Action" isDisabled={isLoading} isClearable />
        ) : null}
      </div>
    </div>
  );
};

export default SectionHead;
