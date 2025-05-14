import React, { useEffect } from "react";
import AdvanceSearch from "../../component/manage-leads/advance-search/AdvanceSearch";
import { getAllAdvanceSearchFields } from "../../store/advance-search/get-allAdvanceSearchFields-slice";
import store, { RootState } from "../../store";
import { useSelector } from "react-redux";
import LoadingSpinner from "../../util/custom/ui/LoadingSpinner";

const AdvanceSearchPage: React.FC = () => {
  useEffect(() => {
    store.dispatch(getAllAdvanceSearchFields());
  }, [store.dispatch]);

  const {
    isLoading: isLoadingForAdvanceSearchField,
  } = useSelector((state: RootState) => state.getAllAdvanceSearchFilterFields);
  const { isLoading: isLoadingForUserDetails } = useSelector(
    (state: RootState) => state.getLoggedInUserData
  );

  if (isLoadingForUserDetails || isLoadingForAdvanceSearchField) {
    return (
      <LoadingSpinner size={35} mainLoading={true} message={"Loading"} centered={true} />
    )
  }

  return (
    <div>
      {!isLoadingForUserDetails && <AdvanceSearch />}
    </div>
  );
};

export default AdvanceSearchPage;
