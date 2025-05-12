import React, { useEffect } from "react";
import MergeLeads from "../../component/merge-leads/MergeLeads";
import store from "../../store";
import { getLeadSourceValues } from "../../store/lead-capturing/get-allLeadSource-slice";
import { getAcademicCareerValues } from "../../store/get/get-all-academic-career-slice";
import { getStateValues } from "../../store/get/get-all-state-slice";
import { getCategoryValues } from "../../store/get/get-all-category-slice";
import { getAdmitTypeValues } from "../../store/get/get-all-admit-type-slice";

const MergeLeadsPage: React.FC = () => {
  useEffect(() => {
    store.dispatch(getLeadSourceValues());
    store.dispatch(getAcademicCareerValues());
    store.dispatch(getStateValues());
    store.dispatch(getCategoryValues());
    store.dispatch(getAdmitTypeValues());
  }, []);
  return <MergeLeads />;
};

export default MergeLeadsPage;
