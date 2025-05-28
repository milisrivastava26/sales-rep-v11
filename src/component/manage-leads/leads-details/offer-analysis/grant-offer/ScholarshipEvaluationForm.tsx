import { Field, ErrorMessage } from "formik";
import React from "react";
import store, { RootState } from "../../../../../store";
import { useSelector } from "react-redux";
import { getScholarSchemeByCategId } from "../../../../../store/scholarship-get/get-all-scholarshipScheme-by-categoryId-slice";
import { getScholarSlabBySchemeId } from "../../../../../store/scholarship-get/get-all-scholarshipSlab-by-schemeId-slice";
import { getScholarshipPercentageDiscountBySlabId, resetResponseForScholarshipPercentageDiscount } from "../../../../../store/scholarship-get/get-scholarshipPercentageDiscount-by-slabId-slice";
import LoadingSpinner from "../../../../../util/custom/ui/LoadingSpinner";
import { setOneTimeDiscount, setPackageDeal } from "../../../../../store/ui/ui-slice";
import { resetResponseForGetFeeDetailsV2 } from "../../../../../store/leadFeeDetailsV2/get-lead-feeDetailsV2-slice";
import { resetResponseForNewInstallmentDetails } from "../../../../../store/leadFeeDetailsV2/get-newInstallmentDetails-slice";

interface propsType {
  setFieldValue: any;
  values: any;
  setIsPackageDealEnabled: (e: any) => void;
  isNewOffer: boolean;
  buttonDisabled: boolean;
  isPackageDealEnabled: boolean;
  setIsOneTimeDiscountEnabled: (e: any) => void;
  isOneTimeDiscountEnabled: boolean;
}

const ScholarshipEvaluationForm: React.FC<propsType> = ({
  setFieldValue,
  values,
  setIsPackageDealEnabled,
  isNewOffer,
  buttonDisabled,
  isPackageDealEnabled,
  setIsOneTimeDiscountEnabled,
  isOneTimeDiscountEnabled,
}) => {
  const { responseForAllScholarshipCateg } = useSelector(
    (state: RootState) => state.getAllActiveScholarCategory
  );
  const {
    scholarshipPercentageDiscountBySlabId,
    isLoading: isLoadingForDiscountPercentage,
  } = useSelector(
    (state: RootState) => state.getScholarshipPercentageDiscountBySlabId
  );
  const { scholarSchemeByCategId } = useSelector(
    (state: RootState) => state.getAllScholarshipSchemeByCategoryId
  );
  const { scholarSlabBySchemeId } = useSelector(
    (state: RootState) => state.getAllScholarshipSlabBySchemeId
  );

  const onScholershipCategory = (value: any) => {
    const categoryId = value;
    if (categoryId !== undefined) {
      store.dispatch(getScholarSchemeByCategId(categoryId));
    }
  };

  const onScholershipScheme = (val: any) => {
    const categoryId = val;
    if (categoryId !== undefined) {
      store.dispatch(getScholarSlabBySchemeId(categoryId));
    }
  };

  const handleEvaluate = () => {
    const slabId = values.scholarshipSlab;
    store.dispatch(getScholarshipPercentageDiscountBySlabId(slabId));
  };

  const { userDetails } = useSelector(
    (state: RootState) => state.getLoggedInUserData
  );

  const roles = ["ROLE_MANAGER", "ROLE_ADMIN"];

  const isManagerOrAdmin = userDetails?.authority?.some((role: string) =>
    roles.includes(role)
  );

  return (
    <div className="rounded-md w-full">
      <div>
        <h1 className="text-xl px-4 font-semibold text-[#3b82f6]">
          Evaluate scholarship Eligibility
        </h1>
        <div className="py-2 grid grid-cols-1 px-4">
          <div className="py-2">

            {/* Scholarship Category */}
            <div className="w-full flex flex-col">
              <label className="text-gray-700 mb-1">Scholarship Category</label>
              <Field
                as="select"
                id="scholarshipCategory"
                name="scholarshipCategory"
                className="w-full border rounded-md px-2 py-1"
                disabled={!isNewOffer}
                onChange={(e: any) => {
                  store.dispatch(resetResponseForScholarshipPercentageDiscount())
                  const value = e.target.value;
                  if (value == 8) {
                    setFieldValue("scholarshipCategory", value);
                    setFieldValue("scholarshipScheme", 25);
                    setFieldValue("scholarshipSlab", 75);
                    store.dispatch(resetResponseForGetFeeDetailsV2());
                    store.dispatch(resetResponseForNewInstallmentDetails());
                    onScholershipCategory(value);
                    onScholershipScheme(25);
                    setIsPackageDealEnabled(true);
                    setFieldValue("additionalDiscount", 0);
                    store.dispatch(setOneTimeDiscount(0));
                    setIsOneTimeDiscountEnabled(false);
                  }
                  else if (value == 7) {
                    onScholershipCategory(value);
                    onScholershipScheme(24);
                    setFieldValue("scholarshipCategory", value);
                    setFieldValue("scholarshipScheme", 24);
                    setFieldValue("scholarshipSlab", 74);
                    store.dispatch(setPackageDeal(0));
                    setIsPackageDealEnabled(false);
                    store.dispatch(setOneTimeDiscount(0));
                    setIsOneTimeDiscountEnabled(false);
                  }
                  else if (value == 9) {
                    store.dispatch(resetResponseForGetFeeDetailsV2());
                    store.dispatch(resetResponseForNewInstallmentDetails());
                    onScholershipCategory(value);
                    onScholershipScheme(26);
                    setIsOneTimeDiscountEnabled(true);
                    setFieldValue("scholarshipCategory", value);
                    setFieldValue("scholarshipScheme", 26);
                    setFieldValue("scholarshipSlab", 76);
                    setFieldValue("additionalDiscount", 0);
                    store.dispatch(setPackageDeal(0));
                    setIsPackageDealEnabled(false);
                  } else {
                    store.dispatch(setPackageDeal(0));
                    setIsPackageDealEnabled(false);
                    store.dispatch(setOneTimeDiscount(0));
                    setIsOneTimeDiscountEnabled(false);
                    store.dispatch(resetResponseForGetFeeDetailsV2());
                    store.dispatch(resetResponseForNewInstallmentDetails());
                    store.dispatch(setPackageDeal(0));
                    onScholershipCategory(value);
                    setFieldValue("scholarshipCategory", value);
                    setFieldValue("scholarshipScheme", "");
                    setFieldValue("scholarshipSlab", "");
                  }
                }}
              >
                <option value="">--Select--</option>
                {responseForAllScholarshipCateg.map((item: any, i: number) => (
                  <option value={item.value} key={i}>
                    {item.label}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="scholarshipCategory"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Scholarship Scheme */}
            <div className="mt-2 w-full flex flex-col">
              <label className="text-gray-800 mb-1">Scholarship Scheme</label>
              <Field
                as="select"
                id="scholarshipScheme"
                name="scholarshipScheme"
                className="w-full border rounded-md px-2 py-1"
                disabled={!isNewOffer || buttonDisabled}
                onChange={(e: any) => {
                  store.dispatch(resetResponseForGetFeeDetailsV2());
                  store.dispatch(resetResponseForNewInstallmentDetails());
                  store.dispatch(resetResponseForScholarshipPercentageDiscount())
                  const value = e.target.value;
                  setFieldValue("scholarshipScheme", value);
                  onScholershipScheme(value);
                }}
              >
                <option value="">--Select--</option>
                {scholarSchemeByCategId.map((item: any, i: number) => (
                  <option value={item.value} key={i}>
                    {item.label}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="scholarshipScheme"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Scholarship Slab */}
            <div className="w-full mt-2 flex flex-col">
              <label className="mb-1">Scholarship Slab</label>
              <Field
                as="select"
                name="scholarshipSlab"
                id="scholarshipSlab"
                className="w-full border rounded-md px-2 py-1"
                disabled={!isNewOffer || buttonDisabled}
                onChange={(e: any) => {
                  store.dispatch(resetResponseForGetFeeDetailsV2());
                  store.dispatch(resetResponseForNewInstallmentDetails());
                  store.dispatch(resetResponseForScholarshipPercentageDiscount())
                  const value = e.target.value;
                  setFieldValue("scholarshipSlab", value);
                }}
              >
                <option value="">--Select--</option>
                {scholarSlabBySchemeId.map((item: any, i: number) => (
                  <option value={item.value} key={i}>
                    {item.label}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="scholarshipSlab"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div className="w-full mt-2 flex flex-col">
              <label className="mb-1">Additional Discount</label>
              <Field
                name="additionalDiscount"
                id="additionalDiscount"
                className="w-full border rounded-md px-2 py-1"
                disabled={!isNewOffer || buttonDisabled || isPackageDealEnabled || !isManagerOrAdmin || isOneTimeDiscountEnabled}
                onChange={(e: any) => {
                  const value = e.target.value;
                  setFieldValue("additionalDiscount", value);
                }}
              >
              </Field>
              <ErrorMessage
                name="additionalDiscount"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
          </div>
        </div>

        {/* Evaluation Result or Loader */}
        <div
          className={`${!isLoadingForDiscountPercentage
            ? "justify-end"
            : "justify-between"
            } ${Object.keys(scholarshipPercentageDiscountBySlabId).length > 0
              ? "justify-between"
              : "justify-end"
            } flex px-4 pb-3 items-center`}
        >
          {isLoadingForDiscountPercentage && (
            <LoadingSpinner
              centered={false}
              mainLoading={false}
              message="Loading Your Discount Percentage"
              size={20}
            />
          )}
          {!isLoadingForDiscountPercentage &&
            Object.keys(scholarshipPercentageDiscountBySlabId).length > 0 && (
              <div className="mt-2 font-medium">
                You are eligible for:{" "}
                {scholarshipPercentageDiscountBySlabId.percentageDiscount}
                {scholarshipPercentageDiscountBySlabId.name}
              </div>
            )}
        </div>

        <button
          type="button"
          onClick={handleEvaluate}
          disabled={buttonDisabled}
          className="bg-blue-500 mx-4 text-white px-4 py-1.5 rounded-md mr-2"
        >
          Evaluate
        </button>
      </div>
    </div>
  );
};

export default ScholarshipEvaluationForm;
