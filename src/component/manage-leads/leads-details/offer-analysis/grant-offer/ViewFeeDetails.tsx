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
          <div id="fee_details_container">
            <h1 id="fee_details_title" className="text-xl px-4 font-semibold text-[#3b82f6]">
              Fee Details
            </h1>

            <div id="fee_details_border_wrapper" className="border w-full">
              <div id="fee_details_top_three_wrapper">
                {feeDetailsdata.slice(0, 3).map((ele) => (
                  <div className="flex items-start" key={ele.id} id={`fee_detail_row_${ele.id}`}>
                    <p
                      id={`fee_detail_title_${ele.id}`}
                      className={`w-1/2 px-4 py-1 text-right ${ele.title === "Total Course Fee" ? "font-semibold" : ""}`}
                    >
                      {ele.title} :
                    </p>
                    <div id={`fee_detail_value_wrapper_${ele.id}`} className="px-4 py-1 w-1/2 flex justify-end">
                      <div
                        id={`fee_detail_value_inner_${ele.id}`}
                        className={`flex justify-between w-full max-w-[110px] ${ele.title === "Total Course Fee" ? "font-semibold" : ""}`}
                      >
                        <span id={`fee_detail_rupee_symbol_${ele.id}`}>₹</span>
                        <p id={`fee_detail_value_${ele.id}`}>{ele.value}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div id="fee_details_middle_wrapper" className="mt-4">
                {feeDetailsdata.slice(3, 8).map((ele) => (
                  <div className="flex items-start" key={ele.id} id={`fee_detail_row_${ele.id}`}>
                    <p
                      id={`fee_detail_title_${ele.id}`}
                      className={`w-1/2 px-4 py-1 text-right ${ele.title === "Total Discount" ? "font-semibold" : ""}`}
                    >
                      {ele.title}:
                    </p>
                    <div id={`fee_detail_value_wrapper_${ele.id}`} className="px-4 py-1 w-1/2 flex justify-end">
                      <div
                        id={`fee_detail_value_inner_${ele.id}`}
                        className={`flex ${ele.id !== 4 ? "justify-between" : "justify-end gap-x-2"} w-full ${ele.id !== 4 ? "max-w-[110px]" : ""
                          }`}
                      >
                        {ele.id !== 4 && (
                          <span
                            id={`fee_detail_rupee_symbol_${ele.id}`}
                            className={`${ele.title === "Total Discount" ? "font-semibold" : ""}`}
                          >
                            ₹
                          </span>
                        )}
                        <p
                          id={`fee_detail_value_${ele.id}`}
                          className={`${ele.title === "Total Discount" ? "font-semibold" : ""}`}
                        >
                          {ele.value}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div id="fee_details_bottom_wrapper" className="mt-4">
                {feeDetailsdata.slice(8).map((ele) => (
                  <div className="flex items-start" key={ele.id} id={`fee_detail_row_${ele.id}`}>
                    <p id={`fee_detail_title_${ele.id}`} className="font-semibold w-1/2 px-4 py-1 text-right">
                      {ele.title} :
                    </p>
                    <div id={`fee_detail_value_wrapper_${ele.id}`} className="px-4 py-1 w-1/2 flex justify-end">
                      <div
                        id={`fee_detail_value_inner_${ele.id}`}
                        className="flex justify-between w-full max-w-[110px] font-semibold"
                      >
                        <span id={`fee_detail_rupee_symbol_${ele.id}`}>₹</span>
                        <p id={`fee_detail_value_${ele.id}`}>{ele.value}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {isNewOffer && (
            <div id="calculate_installment_button_wrapper" className="flex justify-end mt-5">
              <button
                id="calculate_installment_button"
                className="bg-blue-500 text-white rounded-md font-medium px-4 py-1.5"
                onClick={handleInstallmentCalculation}
              >
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
