import React from "react";
import { Outlet } from "react-router-dom";
import useForLocation from "../../hooks/useForLocation";
import ManageLeadsV1 from "../../component/manage-leads/ManageLeadsV1";

const ManageLeadsV1Page: React.FC = () => {
  const { currentURL } = useForLocation();
  return (
    <>
      {currentURL === "/manage-leads-v1" && <ManageLeadsV1 />}
      <Outlet />
    </>
  );
};

export default ManageLeadsV1Page;
