import React, { useEffect } from "react";
import ImportedLead from "../../component/imported-leads/ImportedLead";
import store, { RootState } from "../../store";
import { getAllImportedLead } from "../../store/actions/get-all-imported-lead-slice";
import { useSelector } from "react-redux";
import LoadingSpinner from "../../util/custom/ui/LoadingSpinner";

const ImportedLeadPage: React.FC = () => {
  const {isLoading} = useSelector((state:RootState) => state.getAllImportedLead);
  const {isRun} = useSelector((state:RootState) => state.deleteImportedLeads);
  useEffect(() => {
    store.dispatch(getAllImportedLead());
  }, [store.dispatch, isRun]);

  return (
    <div className="px-5 mt-3 pb-10">
      {isLoading && <LoadingSpinner centered={false} mainLoading={false} message="Loading leads" size={20}/>}
      {!isLoading && <ImportedLead />}
    </div>
  );
};

export default ImportedLeadPage;
