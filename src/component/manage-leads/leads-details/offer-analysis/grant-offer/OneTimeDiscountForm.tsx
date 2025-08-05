import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import store, { RootState } from "../../../../../store";
import { resetResponseForGetFeeDetailsV2 } from "../../../../../store/leadFeeDetailsV2/get-lead-feeDetailsV2-slice";
import { resetResponseForNewInstallmentDetails } from "../../../../../store/leadFeeDetailsV2/get-newInstallmentDetails-slice";
import { resetResponseForScholarshipPercentageDiscount } from "../../../../../store/scholarship-get/get-scholarshipPercentageDiscount-by-slabId-slice";
import { setOneTimeDiscount } from "../../../../../store/ui/ui-slice";

interface propsType {
    isOneTimeDiscountEnabled: boolean;
    isNewOffer: boolean;
}

const OneTimeDiscountForm: React.FC<propsType> = ({ isOneTimeDiscountEnabled, isNewOffer }) => {

    const { userDetails } = useSelector(
        (state: RootState) => state.getLoggedInUserData
    );

    const roles = ["ROLE_MANAGER", "ROLE_ADMIN"];

    const isManagerOrAdmin = userDetails?.authority?.some((role: string) =>
        roles.includes(role)
    );
    const { oneTimeDiscount } = useSelector((state: RootState) => state.ui);
    const [amount, setAmount] = useState<number>(Number(oneTimeDiscount));
    const [error, setError] = useState("");
    const { leadOfferHistoryByOfferIdResponse } = useSelector(
        (state: RootState) => state.leadOfferHistoryByOfferId
    );


    useEffect(() => {
        if (isNewOffer) {
            store.dispatch(setOneTimeDiscount(0));
            setAmount(0)
        }
    }, [isNewOffer])

    useEffect(() => {
        if (isNewOffer && Number(oneTimeDiscount) === 0) {
            setAmount(0)
        }
    }, [isNewOffer, oneTimeDiscount])

    useEffect(() => {
        if (leadOfferHistoryByOfferIdResponse !== null && !isNewOffer) {
            if (leadOfferHistoryByOfferIdResponse?.coreScholarshipCategoryId == 9) {
                setAmount(Number(leadOfferHistoryByOfferIdResponse?.additionalDiscount));
                store.dispatch(
                    setOneTimeDiscount(leadOfferHistoryByOfferIdResponse?.additionalDiscount)
                );
            }
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
            store.dispatch(setOneTimeDiscount(value));
        }
    };

    return (
        <div className="w-full">
            <h1 className="text-xl font-semibold text-[#3b82f6]">One Time Discount</h1>

            <div className="grid mt-4">
                <label htmlFor="packageDeal" className="text-gray-700 font-medium">
                    Amount:
                </label>
                <input
                    type="text"
                    name="oneTimeDiscount"
                    id="oneTimeDiscount"
                    value={amount}
                    disabled={isManagerOrAdmin ? isOneTimeDiscountEnabled === true ? false : true : true}
                    onChange={handleChange}
                    className={`px-3 py-1 border rounded outline-none transition-all ${error ? "border-red-500" : "border-gray-400 focus:border-blue-500"
                        }`}
                />
                {error && isOneTimeDiscountEnabled && (
                    <span className="text-sm text-red-500">{error}</span>
                )}
            </div>
        </div>
    );
};

export default OneTimeDiscountForm;
