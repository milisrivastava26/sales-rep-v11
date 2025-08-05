import React, { useEffect } from 'react'
import DocumentReview from '../../component/document-review/DocumentReview'
import store, { RootState } from '../../store'
import { useSelector } from 'react-redux';
import { getLeadForDocumentReview, resetLeadForDocumentReview } from '../../store/document-review/get-leadsForDocumentReview-slice';

const DocumentReviewPage: React.FC = () => {


  const { userDetails } = useSelector(
    (state: RootState) => state.getLoggedInUserData
  );
  const email = userDetails?.email;

  useEffect(() => {
    store.dispatch(resetLeadForDocumentReview());
    if (userDetails !== null && userDetails !== undefined && email !== undefined) {
      const role = userDetails?.authority[0];
      const status = false;
      store.dispatch(getLeadForDocumentReview({ email, role, status }))
    }
  }, [userDetails])


  return (
    <div>
      <DocumentReview />
    </div>
  )
}

export default DocumentReviewPage