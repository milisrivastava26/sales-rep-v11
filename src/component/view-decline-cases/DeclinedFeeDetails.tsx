import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import store, { RootState } from "../../store";
import { getNewInstallmentDetails } from "../../store/leadFeeDetailsV2/get-newInstallmentDetails-slice";
import { transformLeadHistoryFeeData } from "../../util/actions/transformLeadHistoryFeeData";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { getFeeDetailsV2 } from "../../store/leadFeeDetailsV2/get-lead-feeDetailsV2-slice";
import { useParams } from "react-router-dom";
import { transformDeclinedFeeResponse } from "../../util/actions/tranformFeeCalculationData";
import LoadingSpinner from "../../util/custom/ui/LoadingSpinner";

interface FeeDetail {
  id: number;
  title: string;
  value: string | number;
}
interface propsType {
  setPackageDeal: (e: any) => void;
  packageDeal: string;
}
const DeclinedFeeDetails: React.FC<propsType> = ({
  setPackageDeal,
  packageDeal,
}) => {
  const { leadCaptureId } = useParams();

  const { responseOfLeadEnquiryDetailsById } = useSelector(
    (state: RootState) => state.getLeadEnquiryDetailsDataById
  );

  const activeEnquiry = Array.isArray(responseOfLeadEnquiryDetailsById)
    ? responseOfLeadEnquiryDetailsById.filter(
        (item: any) => item.status === "ACTIVE"
      )
    : [];
  const programId = activeEnquiry[0].academicProgramId;
  const validationSchema = Yup.object({
    packageDeal: Yup.number()
      .typeError("Must be a number")
      .required("Package deal is required")
      .positive("Must be greater than 0"),
  });
  const {
    isLoading: isLoadingForOfferHistory,
    leadOfferHistoryByOfferIdResponse,
  } = useSelector((state: RootState) => state.leadOfferHistoryByOfferId);

  const [feeDetailsdata, setFeeDetailsData] = useState<FeeDetail[]>([]);
  const [newFeeData, setNewFeeData] = useState<FeeDetail[]>([]);
  const { FeeDetailsV2Response } = useSelector(
    (state: RootState) => state.getFeeDetailsV2
  );

  useEffect(() => {
    const transformedData = transformDeclinedFeeResponse(
      FeeDetailsV2Response,
      packageDeal
    );
    setNewFeeData(transformedData);
  }, [FeeDetailsV2Response]);
  useEffect(() => {
    const data = transformLeadHistoryFeeData(
      leadOfferHistoryByOfferIdResponse
    ) as FeeDetail[];

    setFeeDetailsData(data);
  }, [leadOfferHistoryByOfferIdResponse]);

  const handleCalculateFee = (values: any) => {
    const payload = {
      leadCaptureId: leadCaptureId,
      scholarshipApplicableOn: "S",
      percentageDiscount: 0,
      coreAcademicProgramId: programId,
      discountReason: "",
      additionalDiscount: "",
      adjustedPercentage: 100,
      adjustedAmount: leadOfferHistoryByOfferIdResponse?.adjustedAmount,
    };

    setPackageDeal(values.packageDeal);

    store.dispatch(getFeeDetailsV2(payload));
  };

  const handleInstallmentCalculation = () => {
    const payload: {
      yearlyCourseFee: string;
      netFee: string;
      adjustedAmount: string;
    } = {
      yearlyCourseFee: FeeDetailsV2Response.programTuitionFee,
      netFee: String(
        FeeDetailsV2Response.courseFeeAfterDiscount - Number(packageDeal)
      ),
      adjustedAmount: FeeDetailsV2Response.adjustedAmount,
    };

    store.dispatch(getNewInstallmentDetails(payload));
  };

  return (
    <div className="w-full">
      {isLoadingForOfferHistory && (
        <LoadingSpinner
          centered={false}
          mainLoading={false}
          message="Loading"
          size={25}
        />
      )}
      {!isLoadingForOfferHistory && (
        <div className="flex items-start gap-20 w-full">
          <div className="w-[50%]">
            <h2 className="text-[20px] font-semibold text-[#3b82f6] mb-2">
              Previous Fee Details
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
                          ele.title === "Total Course Fee"
                            ? "font-semibold"
                            : ""
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
                          ele.id !== 4
                            ? "justify-between"
                            : " justify-end gap-x-2"
                        }  w-full  ${ele.id !== 4 ? "max-w-[110px]" : ""} `}
                      >
                        {ele.id !== 4 && (
                          <span
                            className={` ${
                              ele.title === "Total Discount"
                                ? "font-semibold"
                                : ""
                            }`}
                          >
                            ₹
                          </span>
                        )}
                        {
                          <p
                            className={` ${
                              ele.title === "Total Discount"
                                ? "font-semibold"
                                : ""
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
          </div>

          <div className="w-[50%]">
            <h1 className="text-[20px] font-semibold text-[#3b82f6] mb-2">
              Grant Package Deal
            </h1>

            <div>
              <Formik
                initialValues={{ packageDeal: "" }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                  handleCalculateFee(values);
                }}
              >
                {() => (
                  <Form className="space-y-4 py-4 max-w-md">
                    <div className="flex flex-col">
                      <label htmlFor="packageDeal" className="mb-1 font-medium">
                        Package Deal
                      </label>
                      <Field
                        type="text"
                        name="packageDeal"
                        className="border border-gray-300 rounded px-3 py-1.5"
                        placeholder="Enter discount amount"
                      />
                      <ErrorMessage
                        name="packageDeal"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>

                    <button
                      type="submit"
                      className="bg-blue-600 text-white px-4 py-1.5 rounded hover:bg-blue-700"
                    >
                      Calculate Fee
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      )}

      <div className="my-5 w-full">
        {Object.keys(FeeDetailsV2Response).length !== 0 && (
          <>
            <h2 className="text-[20px] font-semibold text-[#3b82f6] mb-2">
              New Fee Details
            </h2>
            <div className="border mx-auto">
              <div>
                {newFeeData.slice(0, 3).map((ele) => (
                  <div className="flex items-start mt-2" key={ele.id}>
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
                          ele.title === "Total Course Fee"
                            ? "font-semibold"
                            : ""
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
                {newFeeData.slice(3, 8).map((ele) => (
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
                          ele.id !== 4
                            ? "justify-between"
                            : " justify-end gap-x-2"
                        }  w-full  ${ele.id !== 4 ? "max-w-[110px]" : ""} `}
                      >
                        {ele.id !== 4 && (
                          <span
                            className={` ${
                              ele.title === "Total Discount"
                                ? "font-semibold"
                                : ""
                            }`}
                          >
                            ₹
                          </span>
                        )}
                        {
                          <p
                            className={` ${
                              ele.title === "Total Discount"
                                ? "font-semibold"
                                : ""
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
                {newFeeData.slice(8).map((ele) => (
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
          </>
        )}
      </div>

      {Object.keys(FeeDetailsV2Response).length !== 0 && (
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

export default DeclinedFeeDetails;
