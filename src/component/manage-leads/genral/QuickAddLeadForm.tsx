import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import store, { RootState } from "../../../store";
import CustomForm from "../../../util/custom/CustomForm";
import { uiSliceAction } from "../../../store/ui/ui-slice";
import { getAllCityByStateId } from "../../../store/get/get-allCity-byStateId-slice";
import { getApByCareerId } from "../../../store/get/get-all-academic-program-by-academic-career-id-slice";
import { AddLeadCaptureByQuickAddForm } from "../../../store/lead-capture/create-lead-capture-byQuickAddForm-slice";
import {
  initialValueForQuickAddForm,
  quickAddFormInputs,
  validationSchemaForQuickAddForm,
} from "../../../data/manage-leads/quick-add-form-data";
import { getLeadCaptureByFullName } from "../../../store/lead-capture/get-allLeadCapture-By-fullName-slice";
import { getAcademicCareerValuesForQuickadd } from "../../../store/get/get-all-careerFor-quickAdd-slice";
import { getLeadSourceValues } from "../../../store/lead-capturing/get-allLeadSource-slice";
import { getStateValues } from "../../../store/get/get-all-state-slice";

const QuickAddLeadForm: React.FC = () => {
  const dispatch = store.dispatch;
  const { isLoading, responseOfLeadsCaptureByQuickAddForm, isRun } =
    useSelector((state: RootState) => state.addLeadCaptureByQuickAddForm);
  const { userDetails } = useSelector(
    (state: RootState) => state.getLoggedInUserData
  );

  useEffect(() => {
    store.dispatch(getAcademicCareerValuesForQuickadd());
    store.dispatch(getLeadSourceValues());
    store.dispatch(getStateValues());
  }, []);

  const getAcademicProgramHandler = (careerId: any) => {
    dispatch(getApByCareerId(careerId));
  };

  const getCityByStateHandler = ({
    stateId,
    target,
  }: {
    stateId: any;
    target: any;
  }) => {
    if (stateId !== undefined) {
      dispatch(getAllCityByStateId({ stateId, target }));
    }
  };
  const addLeadCaptureHandler = (data: any) => {
    const { values } = data;
    const payload = {
      name: values.name || "N/A",
      email: values.email || "N/A",
      phone: values.phone,
      leadEnquiryDTOS: [
        {
          coreStateId: values.currentCoreStateId || 36,
          coreCityId: values.currentCoreCityId || 4143,
          academicCareerId: values.academicCareerId || 5,
          academicProgramId: values.academicProgramId || 123,
          leadSourceId: values.leadSourceId,
        },
      ],
    };

    store.dispatch(AddLeadCaptureByQuickAddForm(payload));
  };

  const fullName = userDetails?.fullName;

  useEffect(() => {
    if (!isLoading && responseOfLeadsCaptureByQuickAddForm) {
      dispatch(uiSliceAction.onDisableModalForQuickAddLeadForm());
      if (fullName) {
        const payload = {
          current_salesrep_full_name: fullName,
        };
        store.dispatch(getLeadCaptureByFullName(payload));
      }
    }
  }, [responseOfLeadsCaptureByQuickAddForm, isRun]);

  return (
    <div className="p-3">
      <CustomForm
        btnText="Save"
        btnType="submit"
        isMode="quckAdd"
        isEditing={true}
        isEnableForAction={true}
        inputData={quickAddFormInputs}
        onGetCity={getCityByStateHandler}
        onSaveAndAddHandler={addLeadCaptureHandler}
        initialValues={initialValueForQuickAddForm}
        validationSchema={validationSchemaForQuickAddForm}
        onGetAcademicProgram={getAcademicProgramHandler}
      />
    </div>
  );
};

export default QuickAddLeadForm;
