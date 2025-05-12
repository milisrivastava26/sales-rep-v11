import React, { useEffect, useState } from "react";
import store, { RootState } from "../../../../../store";
import { getAllScholarshipCategory } from "../../../../../store/scholarship-get/get-all-scholarship-category-slice";

import ScholarshipEvaluationForm from "./ScholarshipEvaluationForm";
import PackageDealForm from "./PackageDealForm";
import { Formik, Form } from "formik";
import { useParams } from "react-router-dom";
import { getFeeDetailsV2 } from "../../../../../store/leadFeeDetailsV2/get-lead-feeDetailsV2-slice";
import { useSelector } from "react-redux";
import { onSetScholarshipData } from "../../../../../store/ui/ui-slice";
import { getInitialValuesForScholarship, transformScholarshipInitialValues, validationSchemaForScholarship } from "../../../../../data/manage-leads/offer-analysis-data";
import { getScholarSlabBySchemeId } from "../../../../../store/scholarship-get/get-all-scholarshipSlab-by-schemeId-slice";
import { getScholarSchemeByCategId } from "../../../../../store/scholarship-get/get-all-scholarshipScheme-by-categoryId-slice";
import AdjustPreviousAmount from "./AdjustPreviousAmount";
import toast from "react-hot-toast";

interface FormValues {
  scholarshipCategory: any;
  scholarshipScheme: any;
  scholarshipSlab: any;
  additionalDiscount: any;
  discountReason: any;
  adjustedAmount: any;
  adjustedPercentage: any;
}

interface propsType {
  isNewOffer: boolean;
}

const OfferEvaluationForm: React.FC<propsType> = ({
  isNewOffer,
}) => {
  const { leadCaptureId } = useParams();
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const { userDetails } = useSelector(
    (state: RootState) => state.getLoggedInUserData
  );

  const roles = ["ROLE_MANAGER", "ROLE_ADMIN"];

  const isManagerOrAdmin = userDetails?.authority?.some((role: string) =>
    roles.includes(role)
  );

  const [isPreviousEnquiryChecked, setIsPreviousEnquiryChecked] =
    useState(true);
  const [isPackageDealEnabled, setIsPackageDealEnabled] = useState(false);
  const { scholarshipPercentageDiscountBySlabId } = useSelector(
    (state: RootState) => state.getScholarshipPercentageDiscountBySlabId
  );
  const { responseOfLeadEnquiryDetailsById } = useSelector(
    (state: RootState) => state.getLeadEnquiryDetailsDataById
  );
  const { leadOfferHistoryByOfferIdResponse } = useSelector(
    (state: RootState) => state.leadOfferHistoryByOfferId
  );
  const { getLeadPreviousPaymentByLeadIdResponse } = useSelector(
    (state: RootState) => state.getLeadPreviousPaymentByLeadId
  );

  const activeEnquiry = Array.isArray(responseOfLeadEnquiryDetailsById)
    ? responseOfLeadEnquiryDetailsById.filter(
      (item: any) => item.status === "ACTIVE"
    )
    : [];
  const programId = activeEnquiry[0].academicProgramId;

  useEffect(() => {
    store.dispatch(getAllScholarshipCategory());
  }, []);

  const { packageDeal } = useSelector((state: RootState) => state.ui);

  const handleCalculateFee = (values: any) => {
    const payload = {
      leadCaptureId: leadCaptureId,
      scholarshipApplicableOn:
        scholarshipPercentageDiscountBySlabId.applicableOn,
      percentageDiscount:
        scholarshipPercentageDiscountBySlabId.percentageDiscount,
      coreAcademicProgramId: programId,
      discountReason: values.discountReason,
      additionalDiscount: values.additionalDiscount,
      adjustedPercentage: values.adjustedPercentage,
      adjustedAmount: values.adjustedAmount,
      packageDealAmount: packageDeal,
    };

    store.dispatch(onSetScholarshipData(values));
    store.dispatch(getFeeDetailsV2(payload));
  };

  useEffect(() => {
    if (leadOfferHistoryByOfferIdResponse !== null) {
      const categoryId =
        leadOfferHistoryByOfferIdResponse?.coreScholarshipCategoryId;
      const schemeId =
        leadOfferHistoryByOfferIdResponse?.coreScholarshipSchemeId;
      store.dispatch(getScholarSchemeByCategId(categoryId));
      store.dispatch(getScholarSlabBySchemeId(schemeId));
    }
  }, [leadOfferHistoryByOfferIdResponse]);

  const initialValues =
    leadOfferHistoryByOfferIdResponse !== null && !isNewOffer
      ? transformScholarshipInitialValues(leadOfferHistoryByOfferIdResponse)
      : getInitialValuesForScholarship(getLeadPreviousPaymentByLeadIdResponse);

  return (
    <>
      {(isNewOffer || leadOfferHistoryByOfferIdResponse !== null) && (
        <div className="bg-white my-5 pt-2 pb-6">
          <Formik<FormValues>
            initialValues={initialValues}
            validationSchema={validationSchemaForScholarship}
            validateOnBlur={true}
            enableReinitialize
            onSubmit={async (values) => {
              handleCalculateFee(values);
            }}
          >
            {({ values, setFieldValue }) => {

              useEffect(() => {
                if (!isManagerOrAdmin && values.scholarshipCategory == 8 && isNewOffer) {
                  toast.error("You are not eligible to give package deal");
                  setButtonDisabled(true)
                }
                else {
                  setButtonDisabled(false)
                }
              }, [values, isManagerOrAdmin])


              useEffect(() => {
                if (isPreviousEnquiryChecked) {
                  setFieldValue("adjustedPercentage", 100);
                } else {
                  setFieldValue("adjustedPercentage", 0);
                }
              }, [isPreviousEnquiryChecked]);
              return (
                <Form>
                  <AdjustPreviousAmount
                    setFieldValue={setFieldValue}
                    setIsPreviousEnquiryChecked={setIsPreviousEnquiryChecked}
                    isPreviousEnquiryChecked={isPreviousEnquiryChecked}
                    isNewOffer={isNewOffer}
                  />
                  <div className="w-[100%] flex gap-20 mt-10">
                    <div className="w-[50%]">
                      <ScholarshipEvaluationForm
                        setFieldValue={setFieldValue}
                        setIsPackageDealEnabled={setIsPackageDealEnabled}
                        values={values}
                        isNewOffer={isNewOffer}
                        buttonDisabled={buttonDisabled}
                      />
                    </div>
                    <div>
                      <PackageDealForm
                        isPackageDealEnabled={isPackageDealEnabled}
                        isNewOffer={isNewOffer}
                      />
                    </div>
                  </div>

                  {((isNewOffer) && Object.keys(scholarshipPercentageDiscountBySlabId).length !== 0) && (
                    <div className="flex justify-end mr-5">
                      <button
                        type="submit"
                        className="bg-green-600 text-white px-4 py-1.5 rounded-md"
                      >
                        Calculate Fees
                      </button>
                    </div>
                  )}
                </Form>
              );
            }}
          </Formik>
        </div>
      )}
    </>
  );
};

export default OfferEvaluationForm;
