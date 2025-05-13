import toast from "react-hot-toast";
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Tooltip } from "react-tooltip";
import ChangeStage from "../../genral/ChangeStage";
import store, { RootState } from "../../../../store";
import ImportLeadsForm from "../../genral/ImportLeads";
import BulkChangeOwner from "../../genral/BulkChangeOwner";
import QuickAddLeadForm from "../../genral/QuickAddLeadForm";
import useClickOutside from "../../../../hooks/useClickOutside";
import CustomModal from "../../../../util/custom/ui/CustomModal";
import { changeStageData } from "../../../../data/change-stage-data";
import { exportLead } from "../../../../store/actions/export-lead-slice";
import { bulkChangeOwnerData } from "../../../../data/bulk-changeOwner-data";
import { resetResponseForImportLeads } from "../../../../store/actions/import-leads-slice";
import { IoIosArrowBack } from "react-icons/io";
import {
  importLeadsData,
  quickAddLeadFormData,
} from "../../../../data/manage-leads/quick-add-form-data";
import { resetResposneforLeadCaptureByQuickAddForm } from "../../../../store/lead-capture/create-lead-capture-byQuickAddForm-slice";
import {
  onDisableModalForChangeStage,
  onDisableModalForTestAction,
  onSetOpenModalForChangeStage,
  onShowModalForQuickAddLeadForm,
  onShowModalForTestAction,
  uiSliceAction,
} from "../../../../store/ui/ui-slice";
import useLocalStorage from "../../../../hooks/useLocalStorage";

interface SectionHeadPropsType {
  sectionHeadData: any;
}

interface SectionItem {
  id: number;
  name: string;
  path?: string; // Optional, since not all items may have a path
}

const SectionHead: React.FC<SectionHeadPropsType> = ({ sectionHeadData }) => {
  const dispatch = store.dispatch;
  const [isOpen, setIsOpen] = useState(false);
  const settingRef = useRef<HTMLDivElement | null>(null);
  const subDataRef = useRef<HTMLDivElement | null>(null);
  const dropDownRef = useRef<HTMLDivElement | null>(null);
  const [selectedItem, setSelectedItem] = useState<SectionItem | null>(null);
  const {
    heading,
    sectionHeadSelectData,
    sectionHeadSettingData,
    sectionHeadManageFilterData,
  } = sectionHeadData[0];
  const {
    isSubData,
    isSettingData,
    isLeadsImportModalOpen,
    isQuickAddFormModalOpen,
    isShowModalForTestAction,
    isShowModalForChangeStage,
    getAllCheckSelectedDataFormCustomTable,
  } = useSelector((state: RootState) => state.ui);

  const [_, setSelectedLeads] = useLocalStorage(
    "selectedLeadsForMerge",
    getAllCheckSelectedDataFormCustomTable
  );


  // Define the callbacks to be executed
  const closeSubDataHandelr = () => dispatch(uiSliceAction.onDisabledSubData());
  const closeModalForTestAction = () => dispatch(onDisableModalForTestAction());
  const closeModalForChangeStage = () =>
    dispatch(onDisableModalForChangeStage());
  const closeModal = () =>
    dispatch(uiSliceAction.onDisableModalForQuickAddLeadForm());
  const closeSettingDataHandler = () =>
    dispatch(uiSliceAction.onDisabledSettingData());
  const closeModalForLeadsImport = () =>
    dispatch(uiSliceAction.onManageLeadsImportModal(false));

  useClickOutside(
    [settingRef, subDataRef],
    [closeSettingDataHandler, closeSubDataHandelr]
  );

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (item: any) => {
    setSelectedItem(item);
    setIsOpen(false); // Close the dropdown after selection
  };

  const closeDropDown = () => {
    setIsOpen(false);
  };

  const handleModal = (id: number) => {
    if (id === 2) {
      dispatch(onShowModalForQuickAddLeadForm());
      dispatch(resetResposneforLeadCaptureByQuickAddForm());
    }
    if (id === 1) {
      dispatch(uiSliceAction.onManageLeadsImportModal(true));
      dispatch(resetResponseForImportLeads());
    }
  };

  const navigate = useNavigate();
  const applicationStatus = ["Offer Analysis", "CourseFee", "Declaration", "Document Upload", "Document Review"];

  const handleMergeLead = (e: any) => {
    const selectedCaptureId: Array<number> = [];
    getAllCheckSelectedDataFormCustomTable &&
      getAllCheckSelectedDataFormCustomTable.forEach((item: any) => {
        if (applicationStatus.includes(item.applicationStatusName)) {
          toast.error(
            `Merging not possible ${item.leadCaptureId} is at ${item.applicationStatusName} step`
          );
        } else {
          selectedCaptureId.push(item.leadCaptureId);
        }
      });

    if (selectedCaptureId.length < 2) {
      e.preventDefault();
      toast.error("Please select minimum 2 leads");
    } else if (selectedCaptureId.length > 4) {
      e.preventDefault();
      toast.error("You can select maximum of 4 leads");
    } else {
      setSelectedLeads(selectedCaptureId);
      navigate("/manage-leads-v1/merge-leads");
    }
  };

  useClickOutside([dropDownRef], [closeDropDown]);
  return (
    <div className="w-full border-b border-gray-200 mb-3 flex justify-between pb-3">
      <div className="flex gap-x-1 items-center">
        <h3 className="text-base sm:text-[22px] font-medium ">{heading}</h3>
        <a className="mt-1 text-gray-600 help-icon">
          <i className="fa fa-question-circle" aria-hidden="true"></i>
        </a>
        <Tooltip
          anchorSelect=".help-icon"
          place="right-start"
          className="custom-tooltip"
        >
          <div className="tooltip-content">
            Access all the leads assigned to you through the Manage Leads page.
            <br />
            Add, edit, and perform various actions on your leads, such as:
            <ul className="list-disc pl-4 mt-2">
              <li>Sending emails</li>
              <li>Making a call</li>
              <li>Sending WhatsApp messages</li>
              <li>Adding an activity</li>
            </ul>
            You can filter your leads using the search textbox at the top of the
            grid.
            <br />
            Access lead details by clicking on their name or the view option
            under the action button.
            <br />
            <strong>Note:</strong> If you are a manager, you will get the list
            of all leads assigned to you as well as to your subordinates.
          </div>
        </Tooltip>
      </div>
      <div className="flex gap-x-2 items-center">
        <div className="select-container w-[150px]">
          <div>
            <button
              onClick={handleToggleDropdown}
              className="inline-flex justify-between w-full rounded-md border border-gray-300 shadow-sm px-4 py-1 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
            >
              {selectedItem ? selectedItem.name : "More Action"}
            </button>
            <i className="fas fa-chevron-down dropdown-icon text-[14px]"></i>
          </div>
          {isOpen && (
            <div ref={dropDownRef}>
              <ul className="absolute right-0 z-10 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                {sectionHeadSelectData.map((item: any) => {
                  return (
                    <li
                      key={item.id}
                      className={`py-2 cursor-pointer hover:bg-gray-100 relative group ${
                        item.id === 1 ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                      onClick={() => handleItemClick(item)}
                    >
                      {item.path ? (
                        <div className="flex items-center gap-x-2 px-[25px]">
                          <div>{item.icon}</div>
                          <Link
                            to={item.id === 9 ? "#" : item.path}
                            onClick={(e: any) => item.id === 9 && handleMergeLead(e)}
                            className="block w-full text-left"
                          >
                            {item.name}
                          </Link>
                        </div>
                      ) : (
                        <div className="flex gap-2 items-center">
                          <IoIosArrowBack
                            className={`text-xl opacity-0 invisible group-hover:opacity-100 ${
                              item.subMenu ? "group-hover:visible" : ""
                            }`}
                          />
                          <span>{item.icon}</span>
                          <span
                            onClick={() => {
                              if (item.id === 2) {
                                handleModal(item.id);
                              } else if (item.id === 6) {
                                store.dispatch(onShowModalForTestAction());
                              } else if (item.id === 5) {
                                if (
                                  getAllCheckSelectedDataFormCustomTable &&
                                  getAllCheckSelectedDataFormCustomTable.length ===
                                    0
                                ) {
                                  toast.error(
                                    "Please select at least one lead"
                                  );
                                  return; // Stop execution
                                }
                                store.dispatch(
                                  exportLead(
                                    getAllCheckSelectedDataFormCustomTable
                                  )
                                );
                              } else if (item.id === 7) {
                                dispatch(onSetOpenModalForChangeStage());
                              }
                            }}
                          >
                            {item.name}
                          </span>
                        </div>
                      )}

                      {/* Submenu */}
                      {item.subMenu && (
                        <ul className="absolute right-[228px] top-0 ml-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-300">
                          {item.subMenu.map((sub: any) => {
                            return (
                              <div key={sub.id}>
                                {sub.path ? (
                                  <Link to={sub.path}>
                                    <li
                                      key={sub.id}
                                      className="flex items-center gap-x-2 px-3 py-2 hover:bg-gray-200 cursor-pointer"
                                    >
                                      <span>{sub.icon}</span>
                                      <span>{sub.name}</span>
                                    </li>
                                  </Link>
                                ) : (
                                  <li
                                    key={sub.id}
                                    className="flex items-center gap-x-2 px-3 py-2 hover:bg-gray-200 cursor-pointer"
                                    onClick={() => handleModal(sub.id)}
                                  >
                                    <span>{sub.icon}</span>
                                    <span>{sub.name}</span>
                                  </li>
                                )}
                              </div>
                            );
                          })}
                        </ul>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
        <div className="relative">
          {/* <span
            onClick={() => dispatch(uiSliceAction.onToggleSettingData())}
            className="border border-gray-300 text-gray-500 rounded px-2 py-[5px] flex items-center cursor-pointer"
          >
            <i className="fa fa-cog" aria-hidden="true"></i>
          </span> */}

          {isSettingData && (
            <div
              ref={settingRef} // Attach ref to the setting dropdown
              className="absolute top-8 shadow-md right-0 bg-white px-2 py-2 z-[9999]"
            >
              <ul className="relative">
                {sectionHeadSettingData.slice(0, 2).map((item: any) => (
                  <li
                    key={item.id}
                    className="text-nowrap text-gray-500 cursor-pointer"
                  >
                    {item.name}
                  </li>
                ))}
                {sectionHeadSettingData.slice(2, 3).map((item: any) => (
                  <li
                    key={item.id}
                    onClick={() => dispatch(uiSliceAction.onToggleSubData())}
                    className="text-nowrap text-gray-500 cursor-pointer"
                  >
                    {item.name}
                    {isSubData ? (
                      <i
                        className="fa fa-chevron-down text-sm ml-2 w-4"
                        aria-hidden="true"
                      ></i>
                    ) : (
                      <i
                        className="fa fa-chevron-right text-sm ml-2 w-4"
                        aria-hidden="true"
                      ></i>
                    )}
                  </li>
                ))}

                {isSubData && (
                  <div
                    ref={subDataRef} // Attach ref to the sub dropdown
                    className="absolute top-[70px] left-[-110px] bg-white shadow-md min-w-[100px] rounded px-2 py-1"
                  >
                    <ul>
                      {sectionHeadManageFilterData.map((item: any) => (
                        <li key={item.id} className="mt-2 text-gray-500">
                          {item.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>

      {isLeadsImportModalOpen && (
        <CustomModal
          isShowModal={isLeadsImportModalOpen}
          onHideModal={closeModalForLeadsImport}
          data={importLeadsData}
          isMode="importLead"
        >
          <ImportLeadsForm />
        </CustomModal>
      )}

      {isQuickAddFormModalOpen && (
        <CustomModal
          isMode="quickAddForm"
          isShowModal={isQuickAddFormModalOpen}
          onHideModal={closeModal}
          data={quickAddLeadFormData}
        >
          <QuickAddLeadForm />
        </CustomModal>
      )}

      {isShowModalForTestAction && (
        <CustomModal
          isMode="testAction"
          isShowModal={isShowModalForTestAction}
          onHideModal={closeModalForTestAction}
          data={bulkChangeOwnerData}
        >
          <BulkChangeOwner onHideModal={closeModalForTestAction} isMode="bulkUpdate"/>
        </CustomModal>
      )}
      {isShowModalForChangeStage && (
        <CustomModal
          isMode="testAction"
          isShowModal={isShowModalForChangeStage}
          onHideModal={closeModalForChangeStage}
          data={changeStageData}
        >
          <ChangeStage
            onHideModal={closeModalForChangeStage}
            isMode="bulkUpdate"
          />
        </CustomModal>
      )}
    </div>
  );
};

export default SectionHead;
