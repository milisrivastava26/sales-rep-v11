import React, { useEffect, useState } from "react";
import { transformApiResponse } from "../../../../../util/actions/tranformFeeCalculationData";
import { useSelector } from "react-redux";
import store, { RootState } from "../../../../../store";
import { getNewInstallmentDetails } from "../../../../../store/leadFeeDetailsV2/get-newInstallmentDetails-slice";
import { transformLeadHistoryFeeData } from "../../../../../util/actions/transformLeadHistoryFeeData";
import { useParams } from "react-router-dom";

interface FeeDetail {
  id: number;
  title: string;
  value: string | number;
}

interface propsType {
  isNewOffer: boolean;
}

const ViewFeeDetails: React.FC<propsType> = ({ isNewOffer }) => {
  const { leadCaptureId } = useParams();

  const [feeDetailsdata, setFeeDetailsData] = useState<FeeDetail[]>([]);
  const { FeeDetailsV2Response } = useSelector((state: RootState) => state.getFeeDetailsV2);
  const { leadOfferHistoryByOfferIdResponse } = useSelector((state: RootState) => state.leadOfferHistoryByOfferId);

  useEffect(() => {
    if (isNewOffer) {
      setFeeDetailsData([]);
    }
  }, [isNewOffer]);

  useEffect(() => {
    if (isNewOffer && Object.keys(FeeDetailsV2Response).length === 0) {
      setFeeDetailsData([]);
    }
  }, [isNewOffer, FeeDetailsV2Response]);

  useEffect(() => {
    if (leadOfferHistoryByOfferIdResponse === null && Object.keys(FeeDetailsV2Response).length !== 0) {
      setFeeDetailsData(transformApiResponse(FeeDetailsV2Response));
    } else if (leadOfferHistoryByOfferIdResponse !== null) {
      setFeeDetailsData(transformLeadHistoryFeeData(leadOfferHistoryByOfferIdResponse));
    }
  }, [FeeDetailsV2Response, leadOfferHistoryByOfferIdResponse]);

  const handleInstallmentCalculation = () => {
    const payload = {
      yearlyCourseFee: FeeDetailsV2Response.programTuitionFee,
      netFee: FeeDetailsV2Response.courseFeeAfterDiscount,
      adjustedAmount: FeeDetailsV2Response.adjustedAmount,
      leadId: leadCaptureId,
    };

    store.dispatch(getNewInstallmentDetails(payload));
  };

  return (
    <>
      {feeDetailsdata.length !== 0 && (
        <>
          <div>
            <h1 className="text-xl px-4 font-semibold text-[#3b82f6]">Fee Details</h1>

            <div className="border w-full">
              <div>
                {feeDetailsdata.slice(0, 3).map((ele) => (
                  <div className="flex items-start" key={ele.id}>
                    <p className={`w-1/2 px-4 py-1 text-right ${ele.title === "Total Course Fee" ? "font-semibold" : ""}`}>{ele.title} :</p>
                    <div className="px-4 py-1 w-1/2 flex justify-end">
                      <div className={`flex justify-between w-full max-w-[110px] ${ele.title === "Total Course Fee" ? "font-semibold" : ""}`}>
                        <span>₹</span>
                        <p>{ele.value}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                {feeDetailsdata.slice(3, 8).map((ele) => (
                  <div className="flex items-start" key={ele.id}>
                    <p className={`w-1/2 px-4 py-1 text-right ${ele.title === "Total Discount" ? "font-semibold" : ""}`}>{ele.title}:</p>
                    <div className="px-4 py-1 w-1/2 flex justify-end">
                      <div
                        className={`flex  ${ele.id !== 4 ? "justify-between" : " justify-end gap-x-2"}  w-full  ${
                          ele.id !== 4 ? "max-w-[110px]" : ""
                        } `}
                      >
                        {ele.id !== 4 && <span className={` ${ele.title === "Total Discount" ? "font-semibold" : ""}`}>₹</span>}
                        {<p className={` ${ele.title === "Total Discount" ? "font-semibold" : ""}`}>{ele.value}</p>}
                        {/* {ele.id === 7 && <mark>{ele.value}</mark>} */}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                {feeDetailsdata.slice(8).map((ele) => (
                  <div className="flex items-start" key={ele.id}>
                    <p className="font-semibold w-1/2 px-4 py-1 text-right">{ele.title} :</p>
                    <div className="px-4 py-1 w-1/2 flex justify-end">
                      <div className="flex justify-between w-full max-w-[110px] font-semibold">
                        <span>₹</span>
                        <p>{ele.value}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {isNewOffer && (
            <div className="flex justify-end mt-5">
              <button className="bg-blue-500 text-white rounded-md font-medium px-4 py-1.5" onClick={handleInstallmentCalculation}>
                Calculate Installment
              </button>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default ViewFeeDetails;
