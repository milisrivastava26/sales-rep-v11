import { useSelector } from "react-redux";
import store, { RootState } from "../../store";
import { exportLead } from "../../store/actions/export-lead-slice";
import toast from "react-hot-toast";

const SectionHeadForThirdParty: React.FC = () => {
  const { thirdpartySelectedleads } = useSelector(
    (state: RootState) => state.ui
  );
  return (
    <div className="w-full border-b border-gray-200 mb-3 flex justify-between pb-3">
      <h3 className="text-base sm:text-[22px] font-medium ">Pushed Leads</h3>
      <button
        className="px-4 py-1 bg-blue-500 text-white border rounded-md"
        onClick={() => {
          if (thirdpartySelectedleads.length === 0) {
            toast.error("Please select atleast one lead");
          } else {
            store.dispatch(exportLead(thirdpartySelectedleads));
          }
        }}
      >
        Export Lead
      </button>
    </div>
  );
};

export default SectionHeadForThirdParty;
