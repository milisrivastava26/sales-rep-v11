import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../store";
import { postDiscountToPs } from "../../../../store/lead-discount/postDiscountToPsSlice";


interface SelectedRowPayload {
  employeeId: number;
  amount: number;
  transactionType: string;
  captureId: string;
}
interface SectionHeadPropsType {
  sectionHeadData: any;
  selectedRowIds?: SelectedRowPayload[];
}

const SectionHead: React.FC<SectionHeadPropsType> = ({ sectionHeadData, selectedRowIds=[] }) => {
  // console.log(selectedRowIds, "selectedRowIds");
  const { heading } = sectionHeadData[0];
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading } = useSelector((state: RootState) => state.postDiscountToPs);
const handlePost = () => {
  // const payload = {
  //   selectedIds: selectedRowIds,
  // };
  console.log("Post API payload:", selectedRowIds);
 dispatch(postDiscountToPs(selectedRowIds));
};
  return (
    <div className="w-full border-b border-gray-200 mb-3 flex justify-between pb-3">
      <div className="flex gap-x-1 justify-between items-center">
        <h3 className="text-base sm:text-[22px] font-medium ">{heading}</h3>
      </div>
      {selectedRowIds.length > 0 && (
        <button onClick={handlePost} disabled={isLoading} className="bg-blue-600 text-white px-4 py-2 rounded">
          {isLoading ? "Posting..." : "Post"}
        </button>
      )}
    </div>
  );
};

export default SectionHead;
