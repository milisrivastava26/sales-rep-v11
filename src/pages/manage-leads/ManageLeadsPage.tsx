import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import store, { RootState } from "../../store";
import useForLocation from "../../hooks/useForLocation";
import LoadingSpinner from "../../util/custom/ui/LoadingSpinner";
import ManageLeads from "../../component/manage-leads/ManageLeads";
import { getLeadCaptureByUserEmail } from "../../store/lead-capture/get-all-lead-capture-by-userEmail-slice";

const ManageLeadsPage: React.FC = () => {
  const { leadCaptureByUserEmail, isLoading } = useSelector((state: RootState) => state.getLeadCaptureByUserEmail);

  const { userDetails } = useSelector((state: RootState) => state.getLoggedInUserData);

  const { isRun: isRunForQuickAddLead } = useSelector((state: RootState) => state.addLeadCaptureByQuickAddForm);
  const { isRun: isRunForOwnerUpdate } = useSelector((state: RootState) => state.updateLeadOwner);

  const userEmail = userDetails.email;
  const { currentURL } = useForLocation();

  useEffect(() => {
    if (userEmail !== undefined) {
      store.dispatch(getLeadCaptureByUserEmail(userEmail));
    }
  }, [userEmail, currentURL, isRunForQuickAddLead, isRunForOwnerUpdate]);

  // const { data: initialData } = useLoaderData() as {
  //   data: Promise<ManageLeadType[]>;
  // };

  if (isLoading) {
    return <LoadingSpinner size={20} mainLoading={false} message="Fetching Leads!" centered={true} />;
  }

  return (
    <>
      {currentURL === "/manage-leads" && !isLoading && (
        // <Suspense fallback={<LoadingSpinner size={20} mainLoading={false} message="Fetching Leads!" centered={true} />}>
        //   <Await resolve={leadCaptureByUserEmail}>{(leadCaptureByUserEmail: ManageLeadType[]) => <ManageLeads data={leadCaptureByUserEmail} />}</Await>
        // </Suspense>

        <ManageLeads data={leadCaptureByUserEmail} />
      )}
      <Outlet />
    </>
  );
};

export default ManageLeadsPage;
