import ActivityForm from "./ActivityForm";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import store, { RootState } from "../../../../store";
import { uiSliceAction } from "../../../../store/ui/ui-slice";
import LoadingSpinner from "../../../../util/custom/ui/LoadingSpinner";
import { getActivityTypeValues } from "../../../../store/activity/get-activityType-slice";
import { getPaymentTypeValues } from "../../../../store/activity/get-paymentType-slice";
import { CreateCashPayment } from "../../../../store/activity/create-payment-slice";
import { getActivityOutcomeValues } from "../../../../store/activity/get-activityOutcome-slice";
import { CreateActivity, resetResposneforActivity, takeActionForActivity } from "../../../../store/activity/create-activity-slice";
import {
  ActivityDetailsResponseType,
  formInputsForActivity,
  formInputsForActivityPhoneBound,
  formInputsForWalkin,
  // formInputsForActivityPhoneBound,
  getValidationSchemaForActivity,
  initialValuesForActivity,
} from "../../../../data/manage-leads/activity/activity-data";
interface Option {
  value: string;
  label: string;
}
type SelectedOptionType = {
  value: string;
  label: string;
};

const  Activity: React.FC = () => {
  const { leadCaptureId } = useParams();

  const [isTaskCreated, setIsTaskCreated] = useState(false);

  const handleCheckboxChange = () => {
    setIsTaskCreated(!isTaskCreated);
  };
  const [selectedOption, setSelectedOption] = useState<Option | null | any>(null);
  const { responseForActivityOutcome } = useSelector((state: RootState) => state.getActivityOutcome);
  const { isLoading: isLoadingForActivityType } = useSelector((state: RootState) => state.getActivityType);
  const { getHeaderTabIconsName } = useSelector((state: RootState) => state.ui);
  const { responseForActivityDetailsByActionTrackId } = useSelector((state: RootState) => state.getActivityDetailsByActionTrackId) as {
    responseForActivityDetailsByActionTrackId: ActivityDetailsResponseType;
  };
  const { isLoading: isLoadingForLeadActivityDetails } = useSelector((state: RootState) => state.getActivityDetailsByActionTrackId);
  const { responseOfLeadEnquiryDetailsById } = useSelector((state: RootState) => state.getLeadEnquiryDetailsDataById);
  const { leadPropertiesDataById } = useSelector((state: RootState) => state.getLeadPropertiesDataById);
  const { isError, isLoading: isLoadingForCreateActivity, resetActions, responseOfCreateActivity } = useSelector((state: RootState) => state.addActivity);

  const activeEnquiry = Array.isArray(responseOfLeadEnquiryDetailsById) ? responseOfLeadEnquiryDetailsById.filter((item: any) => item.status === "ACTIVE") : [];
  const leadEnquiryId = activeEnquiry[0].leadEnquiryId;
  const { leadName, email } = leadPropertiesDataById;

  const initialValuesForView = {
    notes: responseForActivityDetailsByActionTrackId?.notes,
    coreActivityOutcomeId: responseForActivityDetailsByActionTrackId?.coreActivityOutcomeId,
    scheduledDate: responseForActivityDetailsByActionTrackId?.scheduledDate,
    scheduledTime: responseForActivityDetailsByActionTrackId?.scheduledTime,
  };

  useEffect(() => {
    store.dispatch(getActivityOutcomeValues());
    store.dispatch(getActivityTypeValues());
    store.dispatch(getPaymentTypeValues());
    // if (leadEnquiryId) store.dispatch(getLeadInstallmentDetailsByLeadAndEnquiryId({ leadCaptureId, leadEnquiryId, careerId }));
  }, [store.dispatch]);

  const getOptionsForSelect = (name: string): SelectedOptionType[] | null => {
    switch (name) {
      case "coreActivityOutcomeId":
        return (
          responseForActivityOutcome?.map((item: any) => ({
            value: item.value,
            label: item.label,
          })) || []
        );

      case "OutcomePhoneId":
        return (
          responseForActivityOutcome?.map((item: any) => ({
            value: item.value,
            label: item.label,
          })) || []
        );
      default:
        return null;
    }
  };

  const onGetActivityValues = (data: any, actions: any) => {
    const newActivityData = { leadCaptureId: leadCaptureId, isTaskCreated: isTaskCreated, ...data };
    // Jai
    store.dispatch(CreateActivity(newActivityData));
     store.dispatch(takeActionForActivity(actions));
  };

  useEffect(() => {
    if (!isError && !isLoadingForCreateActivity && responseOfCreateActivity) {
      store.dispatch(resetResposneforActivity());
      resetActions.resetForm();
      store.dispatch(uiSliceAction.onDrawrCloseHandler());
      setIsTaskCreated(false);
    }
  }, [isError, responseOfCreateActivity, isLoadingForCreateActivity]);

  

  const onSubmitPaymentHandler = (values: any) => {
    const payload = {
      ...values,
      leadCaptureId: leadCaptureId,
      enquiryId: leadEnquiryId,
      email: email,
      name: leadName,
      adjustedBy: "",
    };
    store.dispatch(CreateCashPayment(payload));
  };

  return (
    <div>
      <div className="bg-[#F7F7F7] py-5 px-5 border-b ">
        <h2 className="text-lg font-bold">{getHeaderTabIconsName === "ActivityEdit" ? "Edit Activity" : "Activity"}</h2>
      </div>
      <div className="px-5 py-3 overflow-auto h-[calc(100vh-70px)]">
        {(isLoadingForActivityType || isLoadingForLeadActivityDetails) && <LoadingSpinner centered={false} mainLoading={false} message="Fetching activity Details" size={25} />}
        {!isLoadingForActivityType && !isLoadingForLeadActivityDetails && (
          <ActivityForm
            setSelectedOption={setSelectedOption}
            selectedOptiont={selectedOption}
            initialValues={getHeaderTabIconsName === "ActivityEdit" ? initialValuesForView : initialValuesForActivity}
            validationSchema={selectedOption?.id === 32 ? getValidationSchemaForActivity(isTaskCreated, false): getValidationSchemaForActivity(isTaskCreated, true)}
            formInputForcreate={selectedOption?.id === 31 ? formInputsForActivityPhoneBound :selectedOption?.id === 32 ? formInputsForWalkin:   formInputsForActivity}
            // formInputForcreate={formInputsForActivity}
            onAction={onGetActivityValues}
            getOptionsForSelect={getOptionsForSelect}
            onSubmitActionForCreatePayment={onSubmitPaymentHandler}
            handleCheckboxChange={handleCheckboxChange}
            isTaskCreated={isTaskCreated}
          />
        )}
      </div>
    </div>
  );
};

export default Activity;
