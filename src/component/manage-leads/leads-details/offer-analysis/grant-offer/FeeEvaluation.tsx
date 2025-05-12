import React from "react";
import ViewFeeDetails from "./ViewFeeDetails";
import InstallmentDetails from "./InstallmentDetails";
import { RootState } from "../../../../../store";
import { useSelector } from "react-redux";
import ViewInstallmentHistory from "./ViewInstallmentHistory";

interface propsType {
  isNewOffer: boolean;
  isAllOfferStatusVoid: boolean;
}

const FeeEvaluation: React.FC<propsType> = ({
  isNewOffer,
  isAllOfferStatusVoid,
}) => {
  const { FeeDetailsV2Response } = useSelector(
    (state: RootState) => state.getFeeDetailsV2
  );
  const { leadOfferHistoryByOfferIdResponse } = useSelector(
    (state: RootState) => state.leadOfferHistoryByOfferId
  );
  return (
    <>
      {(isNewOffer || leadOfferHistoryByOfferIdResponse !== null) && (
        <div className="w-[100%] flex bg-white my-5 py-3 px-4">
          <div className="w-[50%]">
            <ViewFeeDetails isNewOffer={isNewOffer}/>
          </div>
          {Object.keys(FeeDetailsV2Response).length !== 0 && (
            <div className="w-[50%]">
              <InstallmentDetails isAllOfferStatusVoid={isAllOfferStatusVoid} isNewOffer={isNewOffer}/>
            </div>
          )}

          {leadOfferHistoryByOfferIdResponse !== null && !isNewOffer &&
             (
              <div className="w-[50%]">
                <ViewInstallmentHistory />
              </div>
            )}
        </div>
      )}
    </>
  );
};

export default FeeEvaluation;
