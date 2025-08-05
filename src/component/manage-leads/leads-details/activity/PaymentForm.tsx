import React, { useEffect, useState } from "react";
import { FaExclamationTriangle } from "react-icons/fa";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Select from "react-select";
import * as Yup from "yup";
import {
  onDisableModalForDownloadPaymentPdf,
  onSetOpenModalForDownloadPaymentPdf,
} from "../../../../store/ui/ui-slice";
import store, { RootState } from "../../../../store";
import { useSelector } from "react-redux";
import CustomModal from "../../../../util/custom/ui/CustomModal";
import PaymentReceipt from "./PaymentReceipt";
import { getLeadOfferByLeadId } from "../../../../store/offer-analysis/get-lead-offers-by-leadId-slice";
import { useParams } from "react-router-dom";
import { AddLeadInstallmentsByCaptureIdEnquiryIdOfferId } from "../../../../store/view-cash-payments/add-installments-by- captureId-enquiryId-offerId-slice";
import { leadOfferHistoryByOfferId } from "../../../../store/offer-analysis/find-leadOfferHistory-by-offerId-and-leadCaptureId-slice";

const PaymentForm: React.FC<{
  onSubmit: (values: any, actions: any) => void;
  paymentTypeOptions: any;
}> = ({ onSubmit, paymentTypeOptions }) => {
  const { isShowModalForDownloadPaymentPdf, paymentRecepitData } = useSelector(
    (state: RootState) => state.ui
  );
  const { LeadInstallmentDetailsByLeadAndEnquiryIdResponse } = useSelector(
    (state: RootState) => state.getLeadInstallmentDetailsDataByLeadAndEnquiryId
  );
  const paymentAmount = LeadInstallmentDetailsByLeadAndEnquiryIdResponse[0];
  const paymentOptId = LeadInstallmentDetailsByLeadAndEnquiryIdResponse[1];
  const { responseOfLeadEnquiryDetailsById } = useSelector(
    (state: RootState) => state.getLeadEnquiryDetailsDataById
  );
  const activeEnquiry = Array.isArray(responseOfLeadEnquiryDetailsById)
    ? responseOfLeadEnquiryDetailsById.filter(
        (item: any) => item.status === "ACTIVE"
      )
    : [];
  const leadEnquiryId = activeEnquiry[0].leadEnquiryId;
  const { getLeadOfferByLeadIdResponse, isLoading } = useSelector(
    (state: RootState) => state.getLeadOfferByLeadId
  );

  const [offerId, setOfferId] = useState(null);

  const {
    isLoading: isLoadingForCreateCashPayment,
    responseOfCreateCashPayment,
  } = useSelector((state: RootState) => state.addCashPayment);
  const { isLoading: isLoadingForCreateInstallment } = useSelector(
    (state: RootState) => state.addLeadInstallmentsByCaptureIdEnquiryIdOfferId
  );
  const { leadOfferHistoryByOfferIdResponse } = useSelector(
    (state: RootState) => state.leadOfferHistoryByOfferId
  );

   const { leadApplicationStatusByLeadId } = useSelector(
      (state: RootState) => state.getLeadApplicationStatusDataByLeadId
    );
  

  const applicationstatusData =
    Array.isArray(responseOfLeadEnquiryDetailsById) &&
    responseOfLeadEnquiryDetailsById.length > 0
      ? responseOfLeadEnquiryDetailsById[0].leadApplicationStatusDTOS
      : [];

  const generalInfoStatus =
    applicationstatusData.filter(
      (item: any) => item.name === "General Information"
    ) || true;
  const basicDetailsStatus =
    applicationstatusData.filter(
      (item: any) => item.name === "Basic Details"
    ) || true;

  const aplicationFeeStatus =
  leadApplicationStatusByLeadId.find(
      (item: any) => item.name === "Application Fee"
    )?.status;

    const registrationFeeStatus =
    leadApplicationStatusByLeadId.find(
      (item: any) => item.name === "Registration Fee"
    )?.status;
  const offerAnalysisStatus =
  leadApplicationStatusByLeadId.find(
      (item: any) => item.name === "Offer Analysis"
    )?.status;

  const { leadCaptureId } = useParams();

  useEffect(() => {
    if (paymentOptId === 0) {
      const payload = {
        leadCaptureId: leadCaptureId,
        leadEnquiryId: leadEnquiryId,
      };
      store.dispatch(getLeadOfferByLeadId(payload));
    }
  }, [paymentOptId]);

  useEffect(() => {
    if (getLeadOfferByLeadIdResponse.length !== 0 && !isLoading) {
      const activeOffer = getLeadOfferByLeadIdResponse.filter(
        (item: any) => item.status === "validated"
      );
      if (activeOffer.length !== 0) {
        setOfferId(activeOffer[0].leadOfferId);
      }
    }
  }, [getLeadOfferByLeadIdResponse, isLoading]);

  // Compare paymentOptId with 1 if it is 0 or 1
  const selectedPaymentType =
    paymentTypeOptions?.find((option: any) => option.value === paymentOptId) ||
    [];

  const paymentValidationSchema = Yup.object().shape({
    corePaymentTypesId: Yup.string().required("Payment method is required"),
    paymentAmount: Yup.number()
      .required("Amount is required")
      .positive("Amount must be positive"),
  });

  const paymentInitialValues = {
    corePaymentTypesId: selectedPaymentType?.value || "",
    paymentAmount: paymentAmount,
    type: "org",
    mode: "ch",
  };

  const initialValuesForRegistration = {
    corePaymentTypesId: 6,
    paymentAmount: 10000,
    type: "org",
    mode: "ch",
  };

  const printTokenHandler = () => {
    store.dispatch(onSetOpenModalForDownloadPaymentPdf());
  };

  const closeModalForDownloadPaymentPdf = () => {
    store.dispatch(onDisableModalForDownloadPaymentPdf());
  };

  const callStageData = {
    title: "Download Reciept",
    cancelButton: "Cancel",
    saveButton: "Save",
  };

  const createInstallment = () => {
    if (offerId && offerId !== null && offerId !== undefined) {
      const payload = {
        leadCaptureId: leadCaptureId,
        leadEnquiryId: leadEnquiryId,
        offerId: offerId,
      };
      store.dispatch(AddLeadInstallmentsByCaptureIdEnquiryIdOfferId(payload));
    }
  };

  useEffect(() => {
    if (offerId && offerId !== null && offerId !== undefined) {
      const payload = {
        leadCaptureId: leadCaptureId,
        leadEnquiryId: leadEnquiryId,
        offerId: offerId,
      };
      store.dispatch(leadOfferHistoryByOfferId(payload));
    }
  }, [offerId]);

  const initialValues =
    aplicationFeeStatus === false
      ? paymentInitialValues
      : registrationFeeStatus === false
      ? initialValuesForRegistration
      : paymentInitialValues;
      
  return (
    <>
      <>
        {offerId === null &&
          paymentOptId === 0 &&
          registrationFeeStatus === true && (
            <div className="mt-5 flex items-start gap-3 p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-900 rounded-md shadow-md">
              <FaExclamationTriangle className="w-6 h-6 text-yellow-600" />
              <p className="font-medium">
                Please create an offer first before proceeding for course fee payment.
              </p>
            </div>
          )}

        {(generalInfoStatus[0]?.status === false ||
          basicDetailsStatus[0]?.status === false) && (
          <div className="mt-5 flex items-start gap-3 p-4 bg-yellow-100 border-l-4 border-yellow-500 text-red-900 rounded-md shadow-md">
            <FaExclamationTriangle className="w-6 h-6 text-yellow-600" />
            <p className="font-medium">
              Please complete the General Information and Basic Details steps
              before proceeding with the payments.
            </p>
          </div>
        )}
      </>

      {paymentOptId === 0 &&
        leadOfferHistoryByOfferIdResponse?.leadFeeInstallmentDetails &&
        leadOfferHistoryByOfferIdResponse?.leadFeeInstallmentDetails.length ===
          0 && (
          <div className="flex my-5">
            <button
              disabled={
                isLoadingForCreateInstallment ||
                offerId === null ||
                registrationFeeStatus === false
              }
              className={`${
                isLoadingForCreateInstallment ||
                offerId === null ||
                registrationFeeStatus === false
                  ? "bg-opacity-50 cursor-not-allowed"
                  : ""
              } bg-green-600 px-4 py-2 rounded font-medium text-white`}
              onClick={createInstallment}
            >
              Create Installment
            </button>
          </div>
        )}
      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={paymentValidationSchema}
        onSubmit={(values, actions) => {
          onSubmit(values, actions);
          actions.resetForm();
        }}
      >
        {({ setFieldValue }) => {
          return (
            <Form className="mt-5 p-4 border border-gray-300 rounded-md">
              <h2 className="text-lg font-semibold mb-4">Payment Details</h2>

              {/* Payment Method Select Dropdown */}
              <div className="mb-4">
                <label className="block font-medium pb-1">Payment Type</label>
                <Field name="corePaymentTypesId">
                  {() => {
                    return (
                      <Select
                        options={paymentTypeOptions}
                        value={paymentTypeOptions.find((option: any) => {
                          if (
                            aplicationFeeStatus === true && registrationFeeStatus === false
                          ) {
                            return option.value === 6;
                          } else {
                            return option.value === selectedPaymentType.value;
                          }
                        })}
                        onChange={(selected: any) =>
                          setFieldValue("corePaymentTypesId", selected?.value)
                        }
                        isDisabled={true}
                      />
                    );
                  }}
                </Field>
                <ErrorMessage
                  name="corePaymentTypesId"
                  component="div"
                  className="text-red-500 text-sm font-medium"
                />
              </div>

              {/* Amount Input Field */}
              <div className="mb-4">
                <label className="block font-medium pb-1">Amount</label>
                <Field
                  name="paymentAmount"
                  disabled={paymentOptId === 0}
                  type="number"
                  className="w-full border border-gray-200 px-2 py-1 outline-none focus:border-gray-400 focus:bg-gray-100 rounded-md"
                />
                <ErrorMessage
                  name="paymentAmount"
                  component="div"
                  className="text-red-500 text-sm font-medium"
                />
              </div>

              {/* Submit Button */}
              <div className="flex gap-x-2 justify-end">
                {Object.keys(paymentRecepitData).length > 0 && (
                  <button
                    disabled={paymentOptId === 0 && offerAnalysisStatus}
                    className="bg-blue-500 px-4 py-2 text-white rounded-md"
                    type="button"
                    onClick={printTokenHandler}
                  >
                    Print Token
                  </button>
                )}

                {Object.keys(responseOfCreateCashPayment).length === 0 && (
                  <button
                    disabled={
                      isLoadingForCreateCashPayment ||
                      (paymentOptId === 0 &&
                        registrationFeeStatus === true) ||
                      generalInfoStatus[0]?.status === false ||
                      basicDetailsStatus[0]?.status === false
                    }
                    className={`${
                      isLoadingForCreateCashPayment ||
                      (paymentOptId === 0 &&
                        registrationFeeStatus === true) ||
                      generalInfoStatus[0]?.status === false ||
                      basicDetailsStatus[0]?.status === false
                        ? "bg-opacity-50 cursor-not-allowed"
                        : ""
                    } bg-green-600 px-4 py-2 text-white rounded-md`}
                    type="submit"
                  >
                    Submit Payment
                  </button>
                )}
              </div>
            </Form>
          );
        }}
      </Formik>
      {isShowModalForDownloadPaymentPdf && (
        <CustomModal
          isMode="callingAction"
          isShowModal={isShowModalForDownloadPaymentPdf}
          onHideModal={closeModalForDownloadPaymentPdf}
          data={callStageData}
        >
          {/* <ChangeStage onHideModal={closeModalForCalling} /> */}
          <PaymentReceipt data={paymentRecepitData} />
        </CustomModal>
      )}
    </>
  );
};

export default PaymentForm;
