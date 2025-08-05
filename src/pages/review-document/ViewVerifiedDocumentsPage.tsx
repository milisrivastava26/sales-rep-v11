import React, { useEffect } from 'react'
import store, { RootState } from '../../store'
import { useSelector } from 'react-redux';
import { getLeadForDocumentReview, resetLeadForDocumentReview } from '../../store/document-review/get-leadsForDocumentReview-slice';
import VerifiedDocument from '../../component/document-review/VerifiedDocument';

const ViewVerifiedDocumentsPage: React.FC = () => {


  const { userDetails } = useSelector(
    (state: RootState) => state.getLoggedInUserData
  );
  const email = userDetails?.email;

  useEffect(() => {
    store.dispatch(resetLeadForDocumentReview());
    if (userDetails !== null && userDetails!==undefined && email!==undefined) {
      const role = userDetails?.authority[0];
      const status = true;
      store.dispatch(getLeadForDocumentReview({email, role, status}))
    }
  }, [userDetails])


  return (
    <div>
      <VerifiedDocument />
    </div>
  )
}

export default ViewVerifiedDocumentsPage