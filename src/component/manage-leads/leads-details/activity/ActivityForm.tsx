import Select from "react-select";
import React, { useEffect } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
// import { Option } from "antd/es/mentions";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import store, { RootState } from "../../../../store";
import {
  onSetPaymentRecepitData,
  uiSliceAction,
} from "../../../../store/ui/ui-slice";
import { useSelector } from "react-redux";
import PaymentForm from "./PaymentForm";
import { mergePaymentAndLeadData } from "../../../../util/actions/PaymentReceiptData";
import { getLeadInstallmentDetailsByLeadAndEnquiryId } from "../../../../store/leadFeeDetailsV2/get-leadInstallmentById-slice";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../../../../util/custom/ui/LoadingSpinner";
import { MdOutlineSearchOff } from "react-icons/md";
import { getLeadStagesValuesByOutcomeId } from "../../../../store/activity/get-leadStagesValuesByOutComeId-slice";
import ManualCallOutbound from "./ManualCallOutbound";
interface SelectedOptionType {
  value: string | any;
  label: string;
}

// interface Option {
//   value: string;
//   label: string;
// }

interface FormInputType {
  name: string;
  label: string;
  type: string;
  isrequired?: boolean;
  subInputs?: Array<{ name: string; type: string }>;
}

interface FormType {
  setSelectedOption: any;
  selectedOptiont: any;
  // here
  validationSchema: any;
  initialValues: Record<string, any>;
  formInputForcreate: FormInputType[];
  selectedOption?: SelectedOptionType;
  organizerOptions?: SelectedOptionType;
  getOptionsForSelect?: (name: string) => Array<SelectedOptionType> | null;
  onAction: any;
  onSubmitActionForCreatePayment?: any;
  handleCheckboxChange: () => void;
  isTaskCreated: boolean;
}

const ActivityForm: React.FC<FormType> = ({
  initialValues,
  validationSchema,
  formInputForcreate,
  getOptionsForSelect,

  // here
  setSelectedOption,
  selectedOptiont,
  onAction,
  onSubmitActionForCreatePayment,
  handleCheckboxChange,
  isTaskCreated,
}) => {
  const { leadCaptureId } = useParams();

  const { responseForActivityType } = useSelector(
    (state: RootState) => state.getActivityType
  );
  const getHeaderTabIconsName = useSelector(
    (state: RootState) => state.ui.getHeaderTabIconsName
  );
  const { leadPropertiesDataById } = useSelector(
    (state: RootState) => state.getLeadPropertiesDataById
  );
  const { responseForPaymentType } = useSelector(
    (state: RootState) => state.getPaymentType
  );
  const {
    isLoading: isLoadingForCreateCashPayment,
    responseOfFetchPaymentDetails,
  } = useSelector((state: RootState) => state.addCashPayment);
  console.log(responseOfFetchPaymentDetails);
  const {
    isError,
    isLoading: isLoadingForCreateActivity,
    responseOfCreateActivity,
  } = useSelector((state: RootState) => state.addActivity);

  const { responseOfLeadEnquiryDetailsById } = useSelector(
    (state: RootState) => state.getLeadEnquiryDetailsDataById
  );
  const activeEnquiry = Array.isArray(responseOfLeadEnquiryDetailsById)
    ? responseOfLeadEnquiryDetailsById.filter(
        (item: any) => item.status === "ACTIVE"
      )
    : [];
  const {
    isLoading: isLoadingForLeadInstallment,
    LeadInstallmentDetailsByLeadAndEnquiryIdResponse,
  } = useSelector(
    (state: RootState) => state.getLeadInstallmentDetailsDataByLeadAndEnquiryId
  );
  const leadEnquiryId = activeEnquiry[0].leadEnquiryId;
  const careerId = activeEnquiry[0].academicCareerId;

  const activityTypeOptions = responseForActivityType;
  // const [selectedOption, setSelectedOption] = useState<Option | null | any>(null);

  const { isRun: isRunForAddLeadinstallment } = useSelector(
    (state: RootState) => state.addLeadInstallmentsByCaptureIdEnquiryIdOfferId
  );

  useEffect(() => {
    if (!isError && !isLoadingForCreateActivity && responseOfCreateActivity) {
      setSelectedOption(null);
    }
  }, [isError, responseOfCreateActivity, isLoadingForCreateActivity]);

  useEffect(() => {
    if (getHeaderTabIconsName === "ActivityEdit") {
      setSelectedOption({ value: 3, label: "Had a Phone Conversation" });
    }
  }, [getHeaderTabIconsName]);

  useEffect(() => {
    if (selectedOptiont !== null && selectedOptiont?.value === 27) {
      const payload = {
        leadCaptureId: leadCaptureId,
        leadEnquiryId: leadEnquiryId,
        careerId: careerId,
      };
      store.dispatch(getLeadInstallmentDetailsByLeadAndEnquiryId(payload));
    }
  }, [selectedOptiont, isRunForAddLeadinstallment]);

  useEffect(() => {
    if (!isLoadingForCreateCashPayment && responseOfFetchPaymentDetails) {
      console.log(responseOfFetchPaymentDetails);
      const recepitData = mergePaymentAndLeadData(
        responseOfFetchPaymentDetails,
        leadPropertiesDataById
      );
      console.log("recepitData", recepitData);
      store.dispatch(onSetPaymentRecepitData(recepitData));
    }
  }, [
    isLoadingForCreateCashPayment,
    responseOfFetchPaymentDetails,
    leadPropertiesDataById,
  ]);

  // // console.log("selectedOption= ", selectedOption);
  return (
    <>
      <label htmlFor="activityType" className="flex font-medium pb-1">
        Activity Type
        <span className="text-red-500 font-semibold text-xl ml-1">*</span>
      </label>
      <Select
        options={activityTypeOptions || []}
        value={selectedOptiont || ""}
        onChange={(selected) => {
          setSelectedOption(selected);
        }}
        isDisabled={getHeaderTabIconsName === "ActivityEdit"}
      />
      {selectedOptiont?.value === 27 ? (
        <>
          {isLoadingForLeadInstallment && (
            <LoadingSpinner
              centered={false}
              mainLoading={false}
              message="Loading"
              size={25}
            />
          )}
          {!isLoadingForLeadInstallment &&
            LeadInstallmentDetailsByLeadAndEnquiryIdResponse.length !== 0 && (
              <PaymentForm
                onSubmit={onSubmitActionForCreatePayment}
                paymentTypeOptions={responseForPaymentType}
              />
            )}
        </>
      ) : selectedOptiont?.value === 3 ||
        selectedOptiont?.value === 29 ||
        selectedOptiont?.value === 31 ||
        selectedOptiont?.value === 32 ||
        selectedOptiont?.value === 33 ? (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={async (values, actions) => {
            // console.log("click");
            try {
              const updatedData = {
                coreLeadActionsId: selectedOptiont?.value,
                ...values,
              };
              // console.log("updatedData= ", updatedData);
              await onAction(updatedData, actions); // Simulate API call
            } catch (error) {
              console.error("Error during submission:", error);
            }
          }}
        >
          {({ values, setFieldValue, resetForm }) => {
            useEffect(() => {
              resetForm({ values: initialValues });
              store.dispatch(
                uiSliceAction.onResetFormikInitialValues(resetForm)
              );
            }, [initialValues, resetForm, setFieldValue]);

            dayjs.extend(customParseFormat);

            return (
              <Form>
                <div className="grid grid-cols-2 gap-5">
                  {selectedOptiont &&
                    formInputForcreate.map((d, index) => (
                      <div
                        key={index}
                        className={
                          selectedOptiont.value !== 31
                            ? `${
                                index == 0 || index == 1 || index == 2
                                  ? "col-span-2"
                                  : ""
                              } `
                            : `${
                                index == 0 || index == 1 ? "col-span-2" : ""
                              } ${d.type === "checkbox" ? "col-span-2" : ""} `
                        }
                      >
                        {d.type === "select" ? (
                          <div className="mt-2">
                            <label
                              htmlFor={d.name}
                              className="flex font-medium pb-1"
                            >
                              {d.label}
                              {d.isrequired ? (
                                <span className="text-red-500 font-semibold text-xl ml-1">
                                  *
                                </span>
                              ) : (
                                ""
                              )}
                              :
                            </label>
                            <Field name={d.name}>
                              {({ form }: any) => {
                                // Find the selected option based on form value
                                const selectedOption: any =
                                  getOptionsForSelect?.(d.name)?.find(
                                    (option) =>
                                      option.value === form.values[d.name]
                                  );

                                return (
                                  <Select
                                    options={
                                      getOptionsForSelect?.(d.name) || []
                                    }
                                    value={selectedOption || ""}
                                    onChange={(selectedOption) => {
                                      // console.log("name= ", d.name);
                                      setFieldValue(
                                        d.name,
                                        selectedOption?.value
                                      );

                                      if (d.name === "OutcomePhoneId") {
                                        //  console.log(
                                        //   "id= ",
                                        //   selectedOption?.value
                                        // );
                                        store.dispatch(
                                          getLeadStagesValuesByOutcomeId(
                                            selectedOption?.value
                                          )
                                        );
                                      }
                                    }}
                                    styles={{
                                      control: (base, state) => ({
                                        ...base,
                                        borderColor: state.isFocused
                                          ? "#4a90e2"
                                          : base.borderColor,
                                        "&:hover": {
                                          borderColor: state.isFocused
                                            ? "#4a90e2"
                                            : base.borderColor,
                                        },
                                      }),
                                      option: (base, state) => ({
                                        ...base,
                                        backgroundColor: state.isSelected
                                          ? "#4a90e2"
                                          : state.isFocused
                                          ? "#eaf4fe"
                                          : "white",
                                        color: state.isSelected
                                          ? "white"
                                          : "black",
                                        "&:hover": {
                                          backgroundColor: "#eaf4fe",
                                          color: "black",
                                        },
                                      }),
                                    }}
                                  />
                                );
                              }}
                            </Field>
                            <ErrorMessage
                              name={d.name}
                              component="div"
                              render={(msg) => (
                                <div className="text-red-500 text-sm font-medium">
                                  {msg}
                                </div>
                              )}
                            />
                          </div>
                        ) : d.type === "textarea" ? (
                          <div className="mt-2">
                            <label
                              htmlFor={d.name}
                              className="flex font-medium pb-1"
                            >
                              {d.label}
                              {d.isrequired ? (
                                <span className="text-red-500 font-semibold text-xl ml-1">
                                  *
                                </span>
                              ) : (
                                ""
                              )}
                              :
                            </label>
                            <Field
                              as="textarea"
                              name={d.name}
                              className="w-full border border-gray-200  px-2 py-1 outline-none focus:border-gray-400 focus:bg-gray-100 rounded-md"
                              rows={4}
                            />
                            <ErrorMessage
                              name={d.name}
                              component="div"
                              render={(msg) => (
                                <div className="text-red-500 text-sm font-medium">
                                  {msg}
                                </div>
                              )}
                            />
                          </div>
                        ) : d.type === "checkbox" ? (
                          <div className="">
                            <label className="flex items-center">
                              <input
                                className="mr-1"
                                type={d.type}
                                name={d.name}
                                onChange={handleCheckboxChange}
                              />
                              {d.label}
                            </label>
                          </div>
                        ) : d.type === "date" || d.type === "time" ? (
                          <div className="grid  gap-4">
                            {isTaskCreated && (
                              <div>
                                <label
                                  htmlFor={d.name}
                                  className="flex font-medium pb-1"
                                >
                                  {d.label}
                                  {d.isrequired ? (
                                    <span className="text-red-500 font-semibold text-xl ml-1">
                                      *
                                    </span>
                                  ) : (
                                    ""
                                  )}
                                  :
                                </label>
                                <Field
                                  name={d.name}
                                  type={d.type}
                                  value={values[d.name] || ""} // Fallback to an empty string
                                  className="w-full border border-gray-200 px-2 py-1 outline-none focus:border-gray-400 focus:bg-gray-100 rounded-md"
                                />
                                <ErrorMessage
                                  name={d.name}
                                  component="div"
                                  render={(msg) => (
                                    <div className="text-red-500 text-sm font-medium">
                                      {msg}
                                    </div>
                                  )}
                                />
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="mt-2">
                            <label
                              htmlFor={d.name}
                              className="flex font-medium pb-1"
                            >
                              {d.label}
                              {d.isrequired ? (
                                <span className="text-red-500 font-semibold text-xl ml-1">
                                  *
                                </span>
                              ) : (
                                ""
                              )}
                              :
                            </label>
                            <Field
                              name={d.name}
                              type={d.type}
                              value={values[d.name] || ""} // Fallback to an empty string
                              className="w-full border border-gray-200 px-2 py-1 outline-none focus:border-gray-400 focus:bg-gray-100 rounded-md"
                            />
                            <ErrorMessage
                              name={d.name}
                              component="div"
                              render={(msg) => (
                                <div className="text-red-500 text-sm font-medium">
                                  {msg}
                                </div>
                              )}
                            />
                          </div>
                        )}
                      </div>
                    ))}
                </div>
                <div className="flex justify-end mt-5">
                  {selectedOptiont && (
                    <button
                      className={`bg-blue-500 px-4 py-2 text-white rounded-md ${
                        isLoadingForCreateActivity
                          ? "bg-opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                      type="submit"
                      disabled={isLoadingForCreateActivity}
                    >
                      Save & Close
                    </button>
                  )}
                </div>
              </Form>
            );
          }}
        </Formik>
      ) : selectedOptiont?.value === 34 ? (
        <ManualCallOutbound />
      ) : selectedOptiont !== null ? (
        <div className="flex flex-col items-center justify-center py-10">
          <MdOutlineSearchOff className="text-gray-500 text-6xl mb-2" />
          <h1 className="text-xl font-semibold text-gray-600">No Data Found</h1>
          <p className="text-gray-500">Will come soon.</p>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default ActivityForm;
