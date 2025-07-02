import React, { useEffect } from 'react'
import DocumentReview from '../../component/document-review/DocumentReview'
import store, { RootState } from '../../store'
import { useSelector } from 'react-redux';
import { getLeadForDocumentReview } from '../../store/document-review/get-leadsForDocumentReview-slice';

const DocumentReviewPage: React.FC = () => {


  const { userDetails } = useSelector(
    (state: RootState) => state.getLoggedInUserData
  );
  const email = userDetails?.email;

  useEffect(() => {
    if (userDetails !== null && userDetails!==undefined && email!==undefined) {
      store.dispatch(getLeadForDocumentReview(email))
    }
  }, [userDetails])


  return (
    <div>
      <DocumentReview />
    </div>
  )
}

export default DocumentReviewPage