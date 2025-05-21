import toast from "react-hot-toast";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { IoIosArrowBack } from "react-icons/io";
import store, { RootState } from "../../../store";
import useLocalStorage from "../../../hooks/useLocalStorage";
import {
  onDisableModalForChangeStage,
  onDisableModalForTestAction,
  onSetOpenModalForChangeStage,
  onShowModalForQuickAddLeadForm,
  onShowModalForTestAction,
  uiSliceAction,
} from "../../../store/ui/ui-slice";
import useClickOutside from "../../../hooks/useClickOutside";
import { resetResposneforLeadCaptureByQuickAddForm } from "../../../store/lead-capture/create-lead-capture-byQuickAddForm-slice";
import { resetResponseForImportLeads } from "../../../store/actions/import-leads-slice";
import CustomModal from "../../../util/custom/ui/CustomModal";
import { importLeadsData, quickAddLeadFormData } from "../../../data/manage-leads/quick-add-form-data";
import ImportLeadsForm from "../genral/ImportLeads";
import QuickAddLeadForm from "../genral/QuickAddLeadForm";
import { bulkChangeOwnerData } from "../../../data/bulk-changeOwner-data";
import BulkChangeOwner from "../genral/BulkChangeOwner";
import { changeStageData } from "../../../data/change-stage-data";
import ChangeStage from "../genral/ChangeStage";
import { advanceSearchSectionHeadData } from "../../../data/manage-leads/advanceSearch-sectionHeadData";
import { exportAdvanceSearchLead } from "../../../store/actions/advanceSearch-export-lead-slice";

interface SectionItem {
  id: number;
  name: string;
  path?: string; // Optional, since not all items may have a path
}

const SectionHeadAdvanceSearch: React.FC = () => {
  const dispatch = store.dispatch;
  const [isOpen, setIsOpen] = useState(false);
  const settingRef = useRef<HTMLDivElement | null>(null);
  const subDataRef = useRef<HTMLDivElement | null>(null);
  const dropDownRef = useRef<HTMLDivElement | null>(null);
  const [selectedItem, setSelectedItem] = useState<SectionItem | null>(null);
  const {
    isLeadsImportModalOpen,
    isQuickAddFormModalOpen,
    isShowModalForTestAction,
    isShowModalForChangeStage,
    getAllCheckSelectedDataFormCustomTable,
  } = useSelector((state: RootState) => state.ui);

  const [selectedLeads, setSelectedLeads] = useLocalStorage("selectedLeadsForMerge", getAllCheckSelectedDataFormCustomTable);

  useEffect(() => {
    let selectedCaptureId: Array<number> = [];
    getAllCheckSelectedDataFormCustomTable &&
      getAllCheckSelectedDataFormCustomTable.forEach((item: any) => {
        if (item.applicationStatus === "Offer Analysis") {
          toast.error(`Merging not possible ${item.leadCaptureId} is at offer analysis step`);
        } else {
          selectedCaptureId.push(item.leadCaptureId);
        }
      });
    setSelectedLeads(selectedCaptureId);
  }, [getAllCheckSelectedDataFormCustomTable]);

  // Define the callbacks to be executed
  const closeSubDataHandelr = () => dispatch(uiSliceAction.onDisabledSubData());
  const closeModalForTestAction = () => dispatch(onDisableModalForTestAction());
  const closeModalForChangeStage = () => dispatch(onDisableModalForChangeStage());
  const closeModal = () => dispatch(uiSliceAction.onDisableModalForQuickAddLeadForm());
  const closeSettingDataHandler = () => dispatch(uiSliceAction.onDisabledSettingData());
  const closeModalForLeadsImport = () => dispatch(uiSliceAction.onManageLeadsImportModal(false));

  useClickOutside([settingRef, subDataRef], [closeSettingDataHandler, closeSubDataHandelr]);

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

  useClickOutside([dropDownRef], [closeDropDown]);
  return (
    <div className="w-full border-gray-200 flex justify-between">
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
                {advanceSearchSectionHeadData.map((item: any) => {
                  return (
                    <li
                      key={item.id}
                      className={`py-2 cursor-pointer hover:bg-gray-100 relative group ${item.id === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
                      onClick={() => handleItemClick(item)}
                    >
                      {item.path ? (
                        <div className="flex items-center gap-x-2 px-[25px]">
                          <div>{item.icon}</div>
                          <Link
                            to={item.id === 9 && (selectedLeads.length === 0 || selectedLeads.length > 4) ? "#" : item.path}
                            onClick={(e) => {
                              if (item.id === 9) {
                                if (selectedLeads.length < 2) {
                                  e.preventDefault();
                                  toast.error("Please select minimum 2 leads");
                                } else if (selectedLeads.length > 4) {
                                  e.preventDefault();
                                  toast.error("You can select maximum of 4 leads");
                                }
                              }
                            }}
                            className="block w-full text-left"
                          >
                            {item.name}
                          </Link>
                        </div>
                      ) : (
                        <div className="flex gap-2 items-center">
                          <IoIosArrowBack
                            className={`text-xl opacity-0 invisible group-hover:opacity-100 ${item.subMenu ? "group-hover:visible" : ""}`}
                          />
                          <span>{item.icon}</span>
                          <span
                            onClick={() => {
                              if (item.id === 2) {
                                handleModal(item.id);
                              } else if (item.id === 6) {
                                store.dispatch(onShowModalForTestAction());
                              } else if (item.id === 5) {
                                if (getAllCheckSelectedDataFormCustomTable && getAllCheckSelectedDataFormCustomTable.length === 0) {
                                  toast.error("Please select at least one lead");
                                  return; // Stop execution
                                }
                                store.dispatch(exportAdvanceSearchLead(getAllCheckSelectedDataFormCustomTable));
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
                                    <li key={sub.id} className="flex items-center gap-x-2 px-3 py-2 hover:bg-gray-200 cursor-pointer">
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
      </div>

      {isLeadsImportModalOpen && (
        <CustomModal isShowModal={isLeadsImportModalOpen} onHideModal={closeModalForLeadsImport} data={importLeadsData} isMode="importLead">
          <ImportLeadsForm />
        </CustomModal>
      )}

      {isQuickAddFormModalOpen && (
        <CustomModal isMode="quickAddForm" isShowModal={isQuickAddFormModalOpen} onHideModal={closeModal} data={quickAddLeadFormData}>
          <QuickAddLeadForm />
        </CustomModal>
      )}

      {isShowModalForTestAction && (
        <CustomModal isMode="testAction" isShowModal={isShowModalForTestAction} onHideModal={closeModalForTestAction} data={bulkChangeOwnerData}>
          <BulkChangeOwner onHideModal={closeModalForTestAction} isMode="advanceSearch" />
        </CustomModal>
      )}
      {isShowModalForChangeStage && (
        <CustomModal isMode="testAction" isShowModal={isShowModalForChangeStage} onHideModal={closeModalForChangeStage} data={changeStageData}>
          <ChangeStage onHideModal={closeModalForChangeStage} isMode="advanceSearch" />
        </CustomModal>
      )}
    </div>
  );
};

export default SectionHeadAdvanceSearch;
