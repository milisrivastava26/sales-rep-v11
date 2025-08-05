import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import store, { RootState } from "../../../../../store";
import { setPackageDeal } from "../../../../../store/ui/ui-slice";
import { resetResponseForGetFeeDetailsV2 } from "../../../../../store/leadFeeDetailsV2/get-lead-feeDetailsV2-slice";
import { resetResponseForNewInstallmentDetails } from "../../../../../store/leadFeeDetailsV2/get-newInstallmentDetails-slice";
import { resetResponseForScholarshipPercentageDiscount } from "../../../../../store/scholarship-get/get-scholarshipPercentageDiscount-by-slabId-slice";

interface propsType {
  isPackageDealEnabled: boolean;
  isNewOffer: boolean;
}

const PackageDealForm: React.FC<propsType> = ({ isPackageDealEnabled, isNewOffer }) => {

  const { userDetails } = useSelector(
    (state: RootState) => state.getLoggedInUserData
  );

  const roles = ["ROLE_MANAGER", "ROLE_ADMIN"];

  const isManagerOrAdmin = userDetails?.authority?.some((role: string) =>
    roles.includes(role)
  );
  const { packageDeal } = useSelector((state: RootState) => state.ui);
  const [amount, setAmount] = useState<number>(Number(packageDeal));
  const [error, setError] = useState("");
  const { leadOfferHistoryByOfferIdResponse } = useSelector(
    (state: RootState) => state.leadOfferHistoryByOfferId
  );


  useEffect(() => {
    if (isNewOffer) {
      store.dispatch(setPackageDeal(0));
      setAmount(0)
    }
  }, [isNewOffer])

  useEffect(() => {
    if (isNewOffer && Number(packageDeal) === 0) {
      setAmount(0)
    }
  }, [isNewOffer, packageDeal])

  useEffect(() => {
    if (leadOfferHistoryByOfferIdResponse !== null && !isNewOffer) {
      setAmount(Number(leadOfferHistoryByOfferIdResponse?.packageDealAmount));
      store.dispatch(
        setPackageDeal(leadOfferHistoryByOfferIdResponse?.packageDealAmount)
      );
    }
  }, [leadOfferHistoryByOfferIdResponse]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    store.dispatch(resetResponseForGetFeeDetailsV2());
    store.dispatch(resetResponseForNewInstallmentDetails());
    store.dispatch(resetResponseForScholarshipPercentageDiscount())

    if (value < 0) {
      setError("Amount cannot be negative");
    } else if (!isNaN(Number(value))) {
      setError("");
      setAmount(value);
      store.dispatch(setPackageDeal(value));
    }
  };

  return (
    <div className="w-full">
      <h1 className="text-xl font-semibold text-[#3b82f6]">Package Deal</h1>

      <div className="grid mt-4">
        <label htmlFor="packageDeal" className="text-gray-700 font-medium">
          Amount:
        </label>
        <input
          type="text"
          name="packageDeal"
          id="packageDeal"
          value={amount}
          disabled={isManagerOrAdmin ? isPackageDealEnabled === true ? false : true : true}
          onChange={handleChange}
          className={`px-3 py-1 border rounded outline-none transition-all ${error ? "border-red-500" : "border-gray-400 focus:border-blue-500"
            }`}
        />
        {error && isPackageDealEnabled && (
          <span className="text-sm text-red-500">{error}</span>
        )}
      </div>
    </div>
  );
};

export default PackageDealForm;
