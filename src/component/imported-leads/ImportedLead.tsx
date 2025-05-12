import React, { useState } from "react";
import { CustomDetailsTable } from "../../util/custom/leadsFormat/CustomDetailsTable";
import { ImportedLeadColumn } from "./ImportedLeadColumn";
import { useSelector } from "react-redux";
import store, { RootState } from "../../store";
import Search from "../../util/custom/customSearchPagination/Search";
import Pagination from "../../util/custom/customSearchPagination/Pagination";
import { deleteImportedLeads } from "../../store/actions/delete-imported-leads-slice";
import Fallback from "../../util/custom/ui/Fallback";
import { emptyDataIcon } from "../../data/savgIcons";
import toast from "react-hot-toast";
import { pushImportedLeads } from "../../store/actions/push-imported-leads";
import { useNavigate } from "react-router-dom";
import { Button, Modal } from "antd";

const ImportedLead: React.FC = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isLoading, responseForImportedLeads } = useSelector(
    (state: RootState) => state.getAllImportedLead
  );
  const { isLoading: isLoadingForDeleteLeads } = useSelector(
    (state: RootState) => state.deleteImportedLeads
  );
  const {
    isLoading: isLoadingForProcesLead
  } = useSelector((state: RootState) => state.pushImportedLead);

  const handleDelete = () => {
    if (responseForImportedLeads.length !== 0) {
      store.dispatch(deleteImportedLeads());
    } else {
      toast.error("No leads found to delete");
    }
  };

  const handleProcess = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    if (responseForImportedLeads.length !== 0) {
      store.dispatch(pushImportedLeads());
    } else {
      toast.error("No leads found to process");
    }
    toast.success("Navigating", {
      duration: 1000
    });
    setTimeout(() => {
      navigate("/manage-leads-v1");
      setIsModalOpen(false);
    }, 1000);
  };

  

  return (
    <div className="">
      <div className="flex justify-between items-center py-5">
        <h1 className="text-2xl font-semibold">Imported Leads</h1>
        <div className="flex gap-4">
          <button
            className={`${
              isLoadingForProcesLead
                ? "bg-opacity-50 cursor-not-allowed"
                : "hover:bg-blue-500"
            } px-4 py-1.5 bg-blue-400 text-white rounded-lg shadow-md  transition`}
            onClick={handleProcess}
            disabled={isLoadingForProcesLead}
          >
            Process
          </button>
          <button
            className={`${
              isLoadingForDeleteLeads
                ? "bg-opacity-50 cursor-not-allowed"
                : "hover:bg-red-500"
            } px-4 py-1.5 bg-red-400 text-white rounded-lg shadow-md  transition`}
            onClick={handleDelete}
            disabled={isLoadingForDeleteLeads}
          >
            Delete
          </button>
        </div>
      </div>
      <div className="flex gap-10 items-center pb-3">
        <Search />
        <Pagination />
      </div>
      <CustomDetailsTable
        columns={ImportedLeadColumn}
        data={responseForImportedLeads}
        isMode="importedLead"
      />
      {!isLoading && responseForImportedLeads.length === 0 && (
        <Fallback
          isCenter={true}
          errorInfo="Data not found"
          icon={emptyDataIcon}
        />
      )}

      <Modal
        title={
          <p className="text-[20px] font-semibold text-blue-600">
            Process Leads
          </p>
        }
        open={isModalOpen}
        onOk={handleOk}
        footer={[
          <Button key="ok" type="primary" onClick={handleOk}>
            Got it
          </Button>,
        ]}
        closable={false}
        centered
      >
        <p className="text-base font-medium py-1">
          Navigate to <strong>Manage Leads</strong>.
        </p>
        <p>Leads will be pushed in the background. This will take some time.</p>
        <p>You will be notified once the process is complete.</p>
      </Modal>
    </div>
  );
};

export default ImportedLead;
