import React, { useEffect } from "react";
import AdvanceSearch from "../../component/manage-leads/advance-search/AdvanceSearch";
import { getAllAdvanceSearchFields } from "../../store/advance-search/get-allAdvanceSearchFields-slice";
import store from "../../store";

const AdvanceSearchPage: React.FC = () => {
  useEffect(() => {
    store.dispatch(getAllAdvanceSearchFields());
  }, [store.dispatch]);

  return (
    <div>
      <AdvanceSearch />
    </div>
  );
};

export default AdvanceSearchPage;
