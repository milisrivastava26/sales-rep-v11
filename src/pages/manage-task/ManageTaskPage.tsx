import React, { useEffect } from 'react'
import ManageTask from '../../component/manage-task/ManageTask'
import store from '../../store';
import { getOwnerValues } from '../../store/lead-capturing/get-allOwner-slice';
import { getLeadSourceValues } from '../../store/lead-capturing/get-allLeadSource-slice';
import { getAcademicCareerValuesForQuickadd } from '../../store/get/get-all-careerFor-quickAdd-slice';

const ManageTaskPage: React.FC = () => {
  useEffect(() => {
    store.dispatch(getOwnerValues());
    store.dispatch(getLeadSourceValues());
    store.dispatch(getAcademicCareerValuesForQuickadd());
  }, [])

  return (
    <div>
      <ManageTask />
    </div>
  )
}

export default ManageTaskPage