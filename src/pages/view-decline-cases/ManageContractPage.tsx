import React, { useEffect } from "react";
import ManageContract from "../../component/view-decline-cases/ManageContract";
import { useParams } from "react-router-dom";
import store, { RootState } from "../../store";
import { getLeadEnquiryDetailsById } from "../../store/lead-attribute-update/get-leadEnquiryDetails-slice";
import LoadingSpinner from "../../util/custom/ui/LoadingSpinner";
import { useSelector } from "react-redux";

const ManageContractPage: React.FC = () => {
  const { leadCaptureId } = useParams();

  const { isLoading, responseOfLeadEnquiryDetailsById } = useSelector(
    (state: RootState) => state.getLeadEnquiryDetailsDataById
  );

  console.log(leadCaptureId);
  useEffect(() => {
    console.log("inside effect");
    store.dispatch(getLeadEnquiryDetailsById(leadCaptureId));
  }, [leadCaptureId]);

  return (
    <>
      {isLoading && (
        <LoadingSpinner
          centered={true}
          mainLoading={true}
          message="Loading"
          size={25}
        />
      )}
      {!isLoading &&
        Object.keys(responseOfLeadEnquiryDetailsById).length !== 0 && (
          <ManageContract />
        )}
    </>
  );
};

export default ManageContractPage;
