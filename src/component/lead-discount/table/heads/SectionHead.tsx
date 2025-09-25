import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../store";
import { postDiscountToPs, resetResponseForPostDiscountToPs } from "../../../../store/lead-discount/postDiscountToPsSlice";
import { getDiscountAudits } from "../../../../store/lead-discount/getDiscountAuditsSlice";
import { getLeadsForDiscountAudit } from "../../../../store/ui/ui-slice";

interface SectionHeadPropsType {
  sectionHeadData: any;
}

const SectionHead: React.FC<SectionHeadPropsType> = ({ sectionHeadData }) => {
  // console.log(selectedRowIds, "selectedRowIds");
  const { heading } = sectionHeadData[0];
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, responseOfPostDiscountToPs } = useSelector((state: RootState) => state.postDiscountToPs);
  const { discountAuditLeads } = useSelector((state: RootState) => state.ui);
  const handlePost = () => {
    const payload = discountAuditLeads.map((item: any) => ({
      employeeId: item.psEmployeeId,
      amount: item.totalDiscount,
      transactionType: "Discount",
      captureId: item.leadCaptureId.toString(),
    }));

    dispatch(postDiscountToPs(payload));
  };

  useEffect(() => {
    if (responseOfPostDiscountToPs !== "") {
      dispatch(resetResponseForPostDiscountToPs());
      dispatch(getDiscountAudits());
      dispatch(getLeadsForDiscountAudit([]));
    }
  }, [responseOfPostDiscountToPs]);

  return (
    <div className="w-full border-b border-gray-200 mb-3 flex justify-between pb-3">
      <div className="flex gap-x-1 justify-between items-center">
        <h3 className="text-base sm:text-[22px] font-medium ">{heading}</h3>
      </div>
      {discountAuditLeads.length > 0 && (
        <button onClick={handlePost} disabled={isLoading} className="bg-blue-600 text-white px-4 py-1.5 rounded">
          {isLoading ? "Posting..." : "Post"}
        </button>
      )}
    </div>
  );
};

export default SectionHead;
