import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import store, { RootState } from "../../../../store";
import { transformApiResponse } from "../../../../util/actions/tranformFeeCalculationData";
import { transformLeadHistoryFeeData } from "../../../../util/actions/transformLeadHistoryFeeData";
import { getNewInstallmentDetails } from "../../../../store/leadFeeDetailsV2/get-newInstallmentDetails-slice";

interface FeeDetail {
  id: number;
  title: string;
  value: string | number;
}

const FeeDetails: React.FC = () => {
  const { FeeDetailsV2Response } = useSelector(
    (state: RootState) => state.getFeeDetailsV2
  );
  const {
    isLoading: isLoadingForLeadOfferDetails,
    leadOfferHistoryByOfferIdResponse,
  } = useSelector((state: RootState) => state.leadOfferHistoryByOfferId);
  const { packageDealByLeadCaptureIdResponse } = useSelector(
    (state: RootState) => state.packageDealByLeadCaptureId
  );

  const {lockOfferStatus} = useSelector((state:RootState) => state.ui);
  

  const [feeDetailsdata, setFeeDetailsData] = useState<FeeDetail[]>([]);

  useEffect(() => {
    let data: FeeDetail[] = [];
    if(lockOfferStatus === "void") {
      console.log("inside if")
      data = transformApiResponse(FeeDetailsV2Response) as FeeDetail[];;
    }
    else if (
      !isLoadingForLeadOfferDetails &&
      Object.keys(leadOfferHistoryByOfferIdResponse || {}).length === 0
    ) {
      let dataToBeTransformed = [];
      if (Object.keys(FeeDetailsV2Response).length !== 0) {
        dataToBeTransformed = FeeDetailsV2Response;
      } else {
        console.log("hello")
        dataToBeTransformed = packageDealByLeadCaptureIdResponse;
      }
      data = transformApiResponse(dataToBeTransformed) as FeeDetail[];
    } else {
      data = transformLeadHistoryFeeData(
        leadOfferHistoryByOfferIdResponse
      ) as FeeDetail[];
    }
    setFeeDetailsData(data);
  }, [
    isLoadingForLeadOfferDetails,
    FeeDetailsV2Response,
    leadOfferHistoryByOfferIdResponse,
    packageDealByLeadCaptureIdResponse,
  ]);

  const handleInstallmentCalculation = () => {
    const payload = {
      yearlyCourseFee: FeeDetailsV2Response.programTuitionFee,
      netFee: FeeDetailsV2Response.courseFeeAfterDiscount,
      adjustedAmount: FeeDetailsV2Response.adjustedAmount,
    };

    store.dispatch(getNewInstallmentDetails(payload));
  };

  return (
    <div className="w-full">
      <h2 className="text-[20px] font-semibold text-[#3b82f6] mb-2">
        Fee Details
      </h2>
      <div className="border w-full">
        <div>
          {feeDetailsdata.slice(0, 3).map((ele) => (
            <div className="flex items-start" key={ele.id}>
              <p
                className={`w-1/2 px-4 py-1 text-right ${
                  ele.title === "Total Course Fee" ? "font-semibold" : ""
                }`}
              >
                {ele.title} :
              </p>
              <div className="px-4 py-1 w-1/2 flex justify-end">
                <div
                  className={`flex justify-between w-full max-w-[110px] ${
                    ele.title === "Total Course Fee" ? "font-semibold" : ""
                  }`}
                >
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
              <p
                className={`w-1/2 px-4 py-1 text-right ${
                  ele.title === "Total Discount" ? "font-semibold" : ""
                }`}
              >
                {ele.title}:
              </p>
              <div className="px-4 py-1 w-1/2 flex justify-end">
                <div
                  className={`flex  ${
                    ele.id !== 4 ? "justify-between" : " justify-end gap-x-2"
                  }  w-full  ${ele.id !== 4 ? "max-w-[110px]" : ""} `}
                >
                  {ele.id !== 4 && (
                    <span
                      className={` ${
                        ele.title === "Total Discount" ? "font-semibold" : ""
                      }`}
                    >
                      ₹
                    </span>
                  )}
                  {
                    <p
                      className={` ${
                        ele.title === "Total Discount" ? "font-semibold" : ""
                      }`}
                    >
                      {ele.value}
                    </p>
                  }
                  {/* {ele.id === 7 && <mark>{ele.value}</mark>} */}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4">
          {feeDetailsdata.slice(8).map((ele) => (
            <div className="flex items-start" key={ele.id}>
              <p className="font-semibold w-1/2 px-4 py-1 text-right">
                {ele.title} :
              </p>
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

      {(leadOfferHistoryByOfferIdResponse === null || lockOfferStatus === "void") && (
        <div className="flex justify-end mt-5">
          <button
            className="bg-blue-500 text-white rounded-md font-medium px-4 py-1.5"
            onClick={handleInstallmentCalculation}
          >
            Calculate Installment
          </button>
        </div>
      )}
    </div>
  );
};

export default FeeDetails;
