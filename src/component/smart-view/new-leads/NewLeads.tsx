import { useSelector } from "react-redux";
import store, { RootState } from "../../../store";
import Card from "../../../util/custom/ui/Card";
import CustomTabHeader from "../../../util/custom/smartView/CustomTabHeader";
import { useEffect, useRef, useState } from "react";
import Search from "../../../util/custom/customSearchPagination/Search";
import LoadingSpinner from "../../../util/custom/ui/LoadingSpinner";
import { CustomDetailsTable } from "../../../util/custom/leadsFormat/CustomDetailsTable";
import { NewLeadColumn } from "./NewLeadsColumn";
import CustomFilterContainer from "../../../util/custom/smartView/CustomFilterContainer";
import { filterInputDataForNewLead } from "../../../data/manage-leads/filter-head-data";
import { getLeadSourceValues } from "../../../store/lead-capturing/get-allLeadSource-slice";
import { getAcademicCareerValues } from "../../../store/get/get-all-academic-career-slice";
import { getApplicationStatusValues } from "../../../store/lead-capturing/get-allApplicationStatus-slice";
import { getOwnerValues } from "../../../store/lead-capturing/get-allOwner-slice";
import CustomModal from "../../../util/custom/ui/CustomModal";
import QuickAddLeadForm from "../../manage-leads/genral/QuickAddLeadForm";
import { quickAddLeadFormData } from "../../../data/manage-leads/quick-add-form-data";
import { uiSliceAction } from "../../../store/ui/ui-slice";
import { getStateValues } from "../../../store/get/get-all-state-slice";
import Fallback from "../../../util/custom/ui/Fallback";
import { emptyDataIcon } from "../../../data/savgIcons";
import Pagination from "../../../util/custom/customSearchPagination/Pagination";

function NewLeads() {
  const { isCardShow, isQuickAddFormModalOpen } = useSelector((state: RootState) => state.ui);
  const closeModal = () => store.dispatch(uiSliceAction.onDisableModalForQuickAddLeadForm());

  const [filterpayload, setFilterPayload] = useState<Record<string, { key: string; value: string }>>({});

  const effectRun = useRef(false);

  useEffect(() => {
    if (effectRun.current) return; // Prevents multiple runs

    store.dispatch(getLeadSourceValues());
    store.dispatch(getAcademicCareerValues());
    store.dispatch(getOwnerValues());
    store.dispatch(getApplicationStatusValues());
    store.dispatch(getStateValues());
    effectRun.current = true; // Mark the effect as run
  }, []);

  const { newLeadFilterDataResponse, isLoading } = useSelector((state: RootState) => state.getNewLeadFilterData);
  const { leadCaptureByFullName, isLoading: isLoadingForFilteredLeadData } = useSelector((state: RootState) => state.getLeadCaptureByFullName);

  const currentData = Object.keys(filterpayload).length === 0 ? newLeadFilterDataResponse : leadCaptureByFullName;

  return (
    <>
      <CustomTabHeader heading="New Leads" isMode="newLead" filterNumber={Object.keys(filterpayload).length} />
      <Card isCardShow={isCardShow}>
        <CustomFilterContainer filterpayload={filterpayload} setFilterPayload={setFilterPayload} inputData={filterInputDataForNewLead} />
      </Card>
      {/* ================================Table Part============================= */}

      <div className="flex justify-between items-center gap-10 mt-3">
        <Search />
        <Pagination />
      </div>

      {/* ================================Table Part============================= */}
      <div className="w-full overflow-x-auto my-5">
        {(isLoading || isLoadingForFilteredLeadData) && <LoadingSpinner centered={false} mainLoading={false} message="Loading new leads" size={20} />}
        {currentData.length !== 0 && !isLoading && !isLoadingForFilteredLeadData && (
          <CustomDetailsTable columns={NewLeadColumn} data={currentData} isMode="newLeadFilter" />
        )}

        {!isLoading &&  currentData.length === 0 && <Fallback isCenter={true} errorInfo="Data not found" icon={emptyDataIcon}/>}
      </div>

      {isQuickAddFormModalOpen && (
        <CustomModal isMode="quickAddForm" isShowModal={isQuickAddFormModalOpen} onHideModal={closeModal} data={quickAddLeadFormData}>
          <QuickAddLeadForm />
        </CustomModal>
      )}
    </>
  );
}

export default NewLeads;
