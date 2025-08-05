import { FaListUl } from "react-icons/fa";
import { FaCalendarDays } from "react-icons/fa6";
import store, { RootState } from "../../../store";
import CustomRefresh from "./CustomRefresh";
import {
  onShowModalForQuickAddLeadForm,
  onToggleCardhandler,
} from "../../../store/ui/ui-slice";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { getNewLeadFilterData } from "../../../store/smart-view/get-newLead-filterData-slice";
import { getAllInboundAnsweredCallDetailsByStatus } from "../../../store/smart-view/get-inboundAnswered-call-detailsby-status-slice";
import { getAllInboundDisconnectedAtIVRCallDetailsByStatus } from "../../../store/smart-view/get-inbound-DisconnectedAtIVR-byStatus-slice";
import { getAllInboundMissedCallDetailsByStatus } from "../../../store/smart-view/get-inboundMissed-call-by-status-slice";
import { getAllInboundDisconnectedAfterIVRCallDetailsByStatus } from "../../../store/smart-view/get-inbound-DisconnectedAfterIVR-byStatus-slice";
import { getTodayUntouchedLeadDetailsByUsername } from "../../../store/dashboard/get-todayUntouchedLeadDetailsByUsername-slice";
import { getPreviousUntouchedLeadDetailsByUsername } from "../../../store/dashboard/get-previousUntouchedLeadDetailsByUsername-slice";
import { getLeadPaymentDetailsForFinance } from "../../../store/smart-view/get-leadPaymentDetailsForFinance-slice";
import { getTodayOutboundCallbacks } from "../../../store/smart-view/get-todayOutboundCallbacks-slice";
import { RiArrowDropDownFill } from "react-icons/ri";
import { dropdownOptionsForOverdueTask } from "../../../data/smart-view/overdue-tasks/overdue-tasks-data";
import toast from "react-hot-toast";
import { bulkUpdateTaskCompletion } from "../../../store/actions/bulk-updateTask-completion-status-slice";
import { getWalkinDetailsByUsername } from "../../../store/dashboard/get-walkin-details-slice";
import { getCounsellingDetailsByUsername } from "../../../store/dashboard/get-counselling-details-slice";

const CustomTabHeader = ({
  setListView = "",
  listView = "",
  isMode,
  filterNumber,
  heading,
  flag = false,
}: any) => {
  const [seed, setSeed] = useState(1);
  // const { heading, filter, addButton, flag = false } = data[0];
  const { userDetails } = useSelector(
    (state: RootState) => state.getLoggedInUserData
  );
  const { getLeadsForOverdueTask } = useSelector(
    (state: RootState) => state.ui
  );
  const fullName = userDetails?.fullName;

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicked outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleRefresh = () => {
    if (isMode === "newLead") {
      let payload = {
        current_salesrep_full_name: fullName,
      };
      store.dispatch(getNewLeadFilterData(payload));
    } else if (isMode === "answered") {
      store.dispatch(getAllInboundAnsweredCallDetailsByStatus());
    } else if (isMode === "missed") {
      store.dispatch(getAllInboundMissedCallDetailsByStatus());
    } else if (isMode === "disconnectedAtIVR") {
      store.dispatch(getAllInboundDisconnectedAtIVRCallDetailsByStatus());
    } else if (isMode === "disconnectedAfterIVR") {
      store.dispatch(getAllInboundDisconnectedAfterIVRCallDetailsByStatus());
    } else if (isMode === "followUp") {
      store.dispatch(getTodayUntouchedLeadDetailsByUsername(fullName));
    } else if (isMode === "overdueTask") {
      store.dispatch(getPreviousUntouchedLeadDetailsByUsername(fullName));
    } else if (isMode === "payment_failed") {
      store.dispatch(getLeadPaymentDetailsForFinance("created"));
    } else if (isMode === "payment_success") {
      store.dispatch(getLeadPaymentDetailsForFinance("PAYMENT DONE"));
    } else if (isMode === "todayOutboundCallbacks") {
      store.dispatch(getTodayOutboundCallbacks());
    }
    else if (isMode === "walkin") {
      store.dispatch(getWalkinDetailsByUsername());
    }
    else if (isMode === "counselling") {
      store.dispatch(getCounsellingDetailsByUsername());
    }
    setSeed(Math.random());
  };

  const handleActionClick = (id: any) => {
    if (id === 1) {
      if (getLeadsForOverdueTask.length === 0) {
        toast.error("Please select atleast one lead");
      } else {
        let leadScheduledTaskIds: Array<number> = [];
        getLeadsForOverdueTask.forEach((item: any) => {
          leadScheduledTaskIds.push(item.lead_scheduled_task_id);
        });

        const bulkUpdateData = {
          leadScheduledTaskIds,
          completed: true,
        };

        store.dispatch(bulkUpdateTaskCompletion(bulkUpdateData));
      }
    }
  };

  return (
    <div className="lg:flex justify-between items-start mt-3 sm:mt-5 w-full">
      {/* =========================Left Part================================ */}
      <div className="w-full">
        <div className="flex w-full gap-3 items-center flex-wrap">
          <div>
            <span className="text-base font-semibold">{heading}</span>
            <i
              className="fa fa-exclamation-circle text-gray-500 text-[12px] sm:text-sm ml-1"
              aria-hidden="true"
            ></i>
          </div>
          <CustomRefresh key={seed} onRefresh={handleRefresh} />
        </div>
        <div className="w-full mt-3 sm:mt-5 flex flex-wrap items-center gap-2 sm:gap-3">
          {isMode === "newLead" && (
            <button
              onClick={() => store.dispatch(onToggleCardhandler())}
              className="border text-[12px] sm:text-sm py-1 px-2 rounded font-medium  relative cursor-pointer sm:mb-2"
            >
              Filters
              <span className="  absolute top-[-6px] right-[-8px] w-4 h-4 rounded-full bg-green-700 text-white text-[10px] flex justify-center items-center ">
                {filterNumber}
              </span>
            </button>
          )}
        </div>
      </div>
      {/* ==========================Right Part============================== */}
      <div className="flex w-full items-center justify-end gap-x-3 mt-3 sm:mt-5 lg:mt-0">
        {flag && (
          <div className="flex gap-x-2">
            <button
              onClick={() => setListView(true)}
              className={`border py-[7px] px-2 rounded  bg-gray-100  ${
                listView ? "text-blue-500 border-blue-500" : "text-gray-500"
              }  cursor-pointer text-[12px] sm:text-sm`}
            >
              <FaListUl />
            </button>
            <button
              onClick={() => setListView(false)}
              className={`border py-[7px] px-2 rounded  bg-gray-100  ${
                listView ? "text-gray-500  " : " text-blue-500 border-blue-500"
              }  cursor-pointer text-[12px] sm:text-sm`}
            >
              <FaCalendarDays />
            </button>
          </div>
        )}
        {isMode === "newLead" && (
          <button
            className="border py-[5px] px-2 sm:px-4 rounded  bg-blue-700 text-white cursor-pointer text-[12px]"
            onClick={() => {
              if (isMode === "newLead") {
                store.dispatch(onShowModalForQuickAddLeadForm());
              }
            }}
          >
            Quick Add Lead
          </button>
        )}
        {isMode === "overdueTask" && (
          <div className="flex justify-center items-center gap-x-2 -mt-2">
            <div ref={dropdownRef} className="relative pl-4">
              <button
                onClick={() => setIsOpen((prev) => !prev)}
                className="flex items-center gap-1 px-4 py-2 bg-white border border-gray-300 font-medium rounded text-sm text-gray-700 hover:bg-gray-100 shadow-sm w-[190px]"
              >
                More Action
                <RiArrowDropDownFill size={20} className="text-gray-600" />
              </button>

              {isOpen && (
                <div className="absolute left-4 mt-2 w-48 bg-white border rounded shadow-md z-10">
                  {dropdownOptionsForOverdueTask.map((item: any) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        handleActionClick(item.id);
                        setIsOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
        {/* <span className="border-2 border-[#c9c9c9] text-gray-500 rounded px-2 py-[1px] flex items-center cursor-pointer">
          <i className="fa fa-cog text-sm" aria-hidden="true"></i>
        </span> */}
      </div>
    </div>
  );
};
export default CustomTabHeader;
