import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import store, { RootState } from "../../../../store";
import { DocumentDetailsColumn } from "./DocumentDetailsColumn";
import Search from "../../../../util/custom/customSearchPagination/Search";
import { CustomDetailsTable } from "../../../../util/custom/leadsFormat/CustomDetailsTable";
import Fallback from "../../../../util/custom/ui/Fallback";
import { emptyDataIcon } from "../../../../data/savgIcons";
import Pagination from "../../../../util/custom/customSearchPagination/Pagination";
import { getDocumentsById } from "../../../../store/notes/get-documents-by-CaptureId-slice";
import { useParams } from "react-router-dom";

const DocumentDetails: React.FC = () => {
  const { leadCaptureId } = useParams();
  const { isRun: isRunForUpdateNote } = useSelector(
    (state: RootState) => state.leadNotesUpdate
  );
  const { isRun: isRunForDocs } = useSelector(
    (state: RootState) => state.docsUpload
  );
  const { isRun: isRunForCreateNote } = useSelector(
    (state: RootState) => state.addNewNotes
  );

  useEffect(() => {
    store.dispatch(getDocumentsById(leadCaptureId));
  }, [isRunForDocs, isRunForCreateNote, isRunForUpdateNote]);

  const { leadDocumentsById } = useSelector(
    (state: RootState) => state.getDocumentsDataById
  );

  if (Object.keys(leadDocumentsById).length === 0) {
    return <Fallback errorInfo="No Documents Found !!" icon={emptyDataIcon} />;
  }
  return (
    <>
      <div className=" px-3 pt-[9px] flex justify-between gap-10 items-center">
        <Search />
        <Pagination />
      </div>
      <div className="px-3 pt-[9px] pb-[12px] overflow-x-auto">
        <CustomDetailsTable
          columns={DocumentDetailsColumn}
          data={leadDocumentsById}
          isMode="documents"
        />
      </div>
    </>
  );
};

export default DocumentDetails;
