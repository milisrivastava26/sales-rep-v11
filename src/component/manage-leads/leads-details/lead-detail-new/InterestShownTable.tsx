import { Field, FieldArray, useField } from "formik";
import React from "react";
import { useSelector } from "react-redux";
import store, { RootState } from "../../../../store";
import { getApRowWiseByCareerId } from "../../../../store/lead-attribute-update/get-academicProgramRowWise-byCareerId-slice";
import { getCityRowWiseByStateId } from "../../../../store/lead-attribute-update/get-CityRowWise-byStateId-slice";
import CustomModal from "../../../../util/custom/ui/CustomModal";
import { GrFormView } from "react-icons/gr";
import ViewLeadStepStatusAndFee from "./ViewLeadStepStatusAndFee";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../../../../util/custom/ui/LoadingSpinner";
import { getEnquiryChangeWarning } from "../../../../store/lead-merge/get-enquiryChangeWarning-by-captureId-and-EnquiryId-slice";

interface TypeFor {
  values: {
    interest:
    | Array<{
      academicCareerId: string;
      academicProgramId: string;
      currentCoreStateId: string;
      currentCoreCityId: string;
      leadSourceId: string;
      active: boolean;
    }>
    | any;
  };
  isEditing?: boolean;
  setIsRowAdded: (e: any) => void;
  isRowAdded: boolean;
}

interface InterestFieldProps {
  name: string;
  idx?: number;
  type: string;
  options: any;
  onGetSelectedId?: (e: any, f: any) => void;
  isReadOnly: boolean;
}

const InterestField: React.FC<InterestFieldProps> = ({ name, idx, type, options, onGetSelectedId, isReadOnly }) => {
  const [field, meta, helpers] = useField(name);

  const handleChange = (id: any, idx: number) => {
    helpers.setValue(id);
    onGetSelectedId && onGetSelectedId(id, idx);
  };

  return (
    <div>
      {type === "select" ? (
        <Field
          {...field}
          as="select"
          disabled={idx === 0 || isReadOnly ? true : false}
          className={`w-full border px-2 outline-none focus:bg-gray-100 cursor-not-allowed ${meta.error && meta.touched ? "border-red-500" : "border-gray-200"}`}
          onChange={(e: any) => handleChange(e.target.value, idx!)}
        >
          <option value="">Select an option</option>
          {options.map((item: any, index: number) => (
            <option value={item.id} key={index}>
              {item.name}
            </option>
          ))}
        </Field>
      ) : (
        type === "radio" && (
          <Field
            {...field}
            type={type}
            isReadOnly={true}
            className={`w-full border px-2 outline-none focus:bg-gray-100 ${idx === 0 ? "cursor-not-allowed" : ""} ${meta.error && meta.touched ? "border-red-500" : "border-gray-200"
              }`}
          />
        )
      )}
    </div>
  );
};

const InterestShownTable: React.FC<TypeFor> = ({ values, isEditing }) => {
  const { leadCaptureId } = useParams();
  const { responseForAcademicCareer } = useSelector((state: RootState) => state.getAllAcademicCareer);
  const { responseForState } = useSelector((state: RootState) => state.getAllStatesData);
  const { responseForLeadSource } = useSelector((state: RootState) => state.getAllLeadSource);
  const { CityRowWiseDataByStateId } = useSelector((state: RootState) => state.getCityRowWiseByStateId);
  const { AcademicProgramRowWiseDataByCareerId } = useSelector((state: RootState) => state.getAcademicProgramRowWiseByCareerId);
  const { isLoading: isLoadingForApplicaitonStatus } = useSelector((state: RootState) => state.getLeadApplicationStatusDataByLeadId);
  const { responseOfLeadEnquiryDetailsById } = useSelector((state: RootState) => state.getLeadEnquiryDetailsDataById);
  const activeEnquiry = Array.isArray(responseOfLeadEnquiryDetailsById) ? responseOfLeadEnquiryDetailsById.filter((item: any) => item.status === "ACTIVE") : [];
  const leadEnquiryId = activeEnquiry[0].leadEnquiryId;
  const { ChangeLeadEnquiryStatusResponse } = useSelector((state: RootState) => state.changeLeadEnquiryStatus);
  const [isShowModalForLeadView, setIsShowModalForLeadView] = React.useState(false);
  const [enquiryid, setEnquiryId] = React.useState("");

  // const sizeOfInterest = Object.keys(responseOfLeadEnquiryDetailsById).length;

  const { interest } = values;

  const getAcademicProgramByCareerId = (careerId: string, index: number) => {
    if (careerId !== "" && careerId !== null) {
      store.dispatch(getApRowWiseByCareerId({ careerId, index }));
    }
  };

  const getCityByStateId = (stateId: any, index: number) => {
    if (stateId !== "" && stateId !== null) {
      store.dispatch(getCityRowWiseByStateId({ stateId: stateId, index }));
    }
  };

  const handlePrimaryChange = (index: number, arrayHelpers: any) => {
    const payload = {
      leadCaptureId: leadCaptureId,
      activeEnquiryId: leadEnquiryId,
    };
    if (ChangeLeadEnquiryStatusResponse === "") {
      store.dispatch(getEnquiryChangeWarning(payload));
    }

    // Update the primary field in the Formik array
    arrayHelpers.form.setFieldValue(`interest[${index}].active`, true);
    // Set the other contacts to not be primary
    interest.forEach((_: any, idx: number) => {
      if (idx !== index) {
        arrayHelpers.form.setFieldValue(`interest[${idx}].active`, false);
      }
    });
  };

  const onViewhandler = (leadEnquiryId: string) => {

    setEnquiryId(leadEnquiryId);
    setIsShowModalForLeadView(true);
  };

  const onCloseModalForLeadView = () => {
    setIsShowModalForLeadView(false);
  };

  const callStageData = {
    title: "View",
    cancelButton: "Cancel",
    saveButton: "Save",
  };

  return (
    <>
      <FieldArray
        name="interest"
        render={(arrayHelpers) => (
          <div className="contact__head-section w-full overflow-x-auto">
            <table className="w-full" border={2}>
              <thead>
                <tr>
                  <th className="border min-w-[80px] w-[80px]">Enq ID</th>
                  <th className="border min-w-[150px]">Career</th>
                  <th className="border min-w-[200px]">Program</th>
                  <th className="border min-w-[150px]">State</th>
                  <th className="border min-w-[150px]">City</th>
                  <th className="border min-w-[150px]">Source</th>
                  <th className="border min-w-[100px]">Active</th>
                  <th className="border min-w-[100px]">View</th>
                  {/* {isEditing && <th className="border">Action</th>} */}
                </tr>
              </thead>
              <tbody>
                {interest.map((_: any, idx: number) => {
                  return (
                    <tr key={idx}>
                      <td className="px-1 border text-center w-[80px]">
                        <Field name={`interest[${idx}].leadEnquiryId`} disabled={true} type="text" className="w-full text-sm truncate text-center" />
                      </td>

                      <td className="px-2 border">
                        <InterestField
                          name={`interest[${idx}].academicCareerId`}
                          type="select"
                          idx={idx}
                          options={responseForAcademicCareer}
                          onGetSelectedId={getAcademicProgramByCareerId}
                          isReadOnly={true}
                        />
                      </td>
                      <td className="px-2 border w-[200px]">
                        <InterestField
                          name={`interest[${idx}].academicProgramId`}
                          type="select"
                          idx={idx}
                          options={AcademicProgramRowWiseDataByCareerId[idx] || []}
                          isReadOnly={true}
                        />
                      </td>
                      <td className="px-2 border">
                        <InterestField
                          name={`interest[${idx}].currentCoreStateId`}
                          idx={idx}
                          type="select"
                          options={responseForState}
                          onGetSelectedId={getCityByStateId}
                          isReadOnly={true}
                        />
                      </td>
                      <td className="px-2 border">
                        <InterestField name={`interest[${idx}].currentCoreCityId`} idx={idx} type="select" options={CityRowWiseDataByStateId[idx] || []} isReadOnly={true} />
                      </td>
                      <td className="px-2 border">
                        <InterestField name={`interest[${idx}].leadSourceId`} idx={idx} type="select" options={responseForLeadSource} isReadOnly={true} />
                      </td>
                      {/* <td className="px-2 border text-center cursor-pointer">
                      <BsInfoCircleFill className="text-green-600 text-xl" />
                    </td> */}
                      <td className="px-2 border text-center w-[100px]">
                        <Field
                          name={`interest[${idx}].active`}
                          type="radio"
                          checked={interest[idx].active}
                          onChange={() => handlePrimaryChange(idx, arrayHelpers)}
                          className="cursor-pointer"
                          disabled={!isEditing}
                        />
                      </td>
                      <td className="px-2 border text-center w-[100px]">
                        <button type="button" className="text-blue-500" onClick={() => onViewhandler(interest[idx].leadEnquiryId)}>
                          <GrFormView size={22} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      />
      <div>
        {isShowModalForLeadView && (
          <CustomModal isMode="callingAction" isShowModal={isShowModalForLeadView} onHideModal={onCloseModalForLeadView} data={callStageData}>
            {/* <ChangeStage onHideModal={closeModalForCalling} /> */}

            {isLoadingForApplicaitonStatus && <LoadingSpinner size={35} mainLoading={false} message={"Fetching Application Progress"} centered={false} />}
            {!isLoadingForApplicaitonStatus && <ViewLeadStepStatusAndFee leadEnquiryId={enquiryid} />}
          </CustomModal>
        )}
      </div>
    </>
  );
};

export default InterestShownTable;