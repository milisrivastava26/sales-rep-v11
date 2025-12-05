import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AcademicDetailsForm from "./AcademicDetailsForm";
import store, { RootState } from "../../../../../store";
import { getTenthBoardValues } from "../../../../../store/academic/get-all10th-slice";
import { getTenthMarkingSchemeValues } from "../../../../../store/academic/get-all10thScheme-slice";
import { getTwelfthBoardValues } from "../../../../../store/academic/get-all-twelfth-board-slice";
import { getTwelfthSchoolValues } from "../../../../../store/academic/get-twelfth-school-slice";
import { getDiplomaSchoolValues } from "../../../../../store/academic/get-all-diploma-school-slice";
import { getUgUniversityValues } from "../../../../../store/academic/get-all-ug-university-slice";
import { getAllUgCollegeValues } from "../../../../../store/academic/get-all-ug-college-slice";
import { getTenthSchoolValues } from "../../../../../store/academic/get-all-tenth-school-slice";
import { getAllPgCollegeValues } from "../../../../../store/academic/get-all-pg-college-slice";
import { getAllPgUniversityValues } from "../../../../../store/academic/get-all-pg-university-slice";
import { getAllCompetitiveExamValues } from "../../../../../store/academic/get-all-competitive-exam-slice";
import { useParams } from "react-router-dom";
import { academicDetailsFormInput, getInitialValuesForAcademicDetails, getValidationSchemaForAcademicDetails, transformPayloadForAcademicData } from "../../../../../data/lead-details-data-new/academic-data";
import { updateLeadAcademicDetails } from "../../../../../store/academic/update-leadAcademicDetails-slice";
import { onSetEnableForDiplomaInputFields, onSetEnableForPgInputFields, onSetEnableForTwefthInputFields } from "../../../../../store/ui/ui-slice";
import { MdOutlineEdit } from "react-icons/md";

const AcademicDetails: React.FC = () => {
  const { leadCaptureId } = useParams<{ leadCaptureId: string }>();
  const [isDisabledForTenthPercentage, setIsDisabledForTenthPercentage] =
    useState(false);

  const [isDisabledForTwelfthPercentage, setIsDisabledForTwelfthPercentage] =
    useState(false);

  const [isDisabledForDiplomaPercentage, setIsDisabledForDiplomaPercentage] =
    useState(false);

  const [isDisabledForUgPercentage, setIsDisabledForUgPercentage] =
    useState(false);

  const [isDisabledForPgPercentage, setIsDisabledForPgPercentage] =
    useState(false);

  const [isEditing, setEditing] = useState(false);


  useEffect(() => {
    store.dispatch(getTenthBoardValues());
    store.dispatch(getTenthMarkingSchemeValues());
    store.dispatch(getTwelfthBoardValues());
    store.dispatch(getTwelfthSchoolValues());
    store.dispatch(getDiplomaSchoolValues());
    store.dispatch(getUgUniversityValues());
    store.dispatch(getTenthSchoolValues());
    store.dispatch(getAllUgCollegeValues());
    store.dispatch(getAllPgCollegeValues());
    store.dispatch(getAllPgUniversityValues());
    store.dispatch(getAllCompetitiveExamValues());
  }, []);

  const {
    isEnableForDiplomaInputFields,
    isEnableForTwelfthInputFields,
    isEnableForUGInputFields,
    isEnableForPgInputFields,
  } = useSelector((state: RootState) => state.ui as any);
  const { responseOfLeadAcademicDetailsById } = useSelector(
    (state: RootState) => state.getLeadAcademicDetailsDataById
  );


  const onUpdateLeadHandler = (data: any) => {
    const updatedData = transformPayloadForAcademicData(
      data.values,
      isEnableForTwelfthInputFields,
      isEnableForDiplomaInputFields,
      isEnableForUGInputFields,
      isEnableForPgInputFields,
      leadCaptureId,
      isDisabledForTenthPercentage
    );
    store.dispatch(updateLeadAcademicDetails(updatedData));
  };

  const initialValuesForAcademicInfo =
    responseOfLeadAcademicDetailsById !== null
      ? getInitialValuesForAcademicDetails(responseOfLeadAcademicDetailsById)
      : null;

  const Tenth_plus_2_type = initialValuesForAcademicInfo?.tenth_plus_2_type;
  const twelfthResultStatus =
    initialValuesForAcademicInfo?.coreTwelfthResultStatus;
  const diplomaResultStatus =
    initialValuesForAcademicInfo?.coreDiplomaResultStatus;
  const ugResultStatus = initialValuesForAcademicInfo?.coreUgResultStatus;
  const tenthResultStatus = initialValuesForAcademicInfo?.coreTenthResultStatus;
  const pgResultStatus = initialValuesForAcademicInfo?.corePgResultStatus;
  const pgCollege = initialValuesForAcademicInfo?.pgSchool;

  useEffect(() => {
    if (!responseOfLeadAcademicDetailsById) return;

    // ==== ENABLE TWELFTH / DIPLOMA BASED ON tenth_plus_2_type ====
    if (Tenth_plus_2_type === "TWELFTH") {
      store.dispatch(onSetEnableForTwefthInputFields());
    }

    if (Tenth_plus_2_type === "DIPLOMA") {
      store.dispatch(onSetEnableForDiplomaInputFields());
    }

    if (pgCollege !== "") {
      store.dispatch(onSetEnableForPgInputFields());
    }

    // ---------- TENTH ----------
    if (tenthResultStatus === "AWAITED") {
      setIsDisabledForTenthPercentage(true);
    } else {
      setIsDisabledForTenthPercentage(false);
    }

    // ---------- TWELFTH ----------
    if (twelfthResultStatus === "AWAITED") {
      setIsDisabledForTwelfthPercentage(true);
    } else {
      setIsDisabledForTwelfthPercentage(false);
    }

    // ---------- DIPLOMA ----------
    if (diplomaResultStatus === "AWAITED") {
      setIsDisabledForDiplomaPercentage(true);
    } else {
      setIsDisabledForDiplomaPercentage(false);
    }

    // ---------- UG ----------
    if (ugResultStatus === "AWAITED") {
      setIsDisabledForUgPercentage(true);
    } else {
      setIsDisabledForUgPercentage(false);
    }

    // ---------- PG ----------
    if (pgResultStatus === "AWAITED") {
      setIsDisabledForPgPercentage(true);
    } else {
      setIsDisabledForPgPercentage(false);
    }
  }, [responseOfLeadAcademicDetailsById]);

  const handleEditClick = () => {
    setEditing(true);
  };

  return (
    <>
      <div className={` my-6`}>
        {/* ----------------------- ACADEMIC DETAILS SECTION ----------------------- */}
        <div className="bg-white relative rounded-md shadow-sm">
          <div className="flex justify-between items-center h-[50px] px-4 bg-blue-100">
            <h1 className="text-lg font-semibold">Academic Details</h1>
            {!isEditing && (
              <button className=" px-3 py-1.5 font-medium rounded-lg" onClick={handleEditClick}>
                <MdOutlineEdit size={20} />
              </button>
            )}
          </div>

          <div className="px-5 py-6">
            <AcademicDetailsForm
              initialValues={initialValuesForAcademicInfo}
              validationSchema={getValidationSchemaForAcademicDetails(
                isEnableForTwelfthInputFields,
                isEnableForDiplomaInputFields,
                isEnableForUGInputFields,
                isEnableForPgInputFields,
                isDisabledForTenthPercentage,
                isDisabledForTwelfthPercentage,
                isDisabledForDiplomaPercentage,
                isDisabledForUgPercentage,
                isDisabledForPgPercentage,
              )}
              inputData={academicDetailsFormInput}
              onSaveAndAddHandler={onUpdateLeadHandler}
              /* ------------------ TENTH ------------------ */
              isDisabledForTenthPercentage={isDisabledForTenthPercentage}
              setIsDisabledForTenthPercentage={
                setIsDisabledForTenthPercentage
              }
              /* ------------------ TWELFTH ------------------ */
              isDisabledForTwelfthPercentage={isDisabledForTwelfthPercentage}
              setIsDisabledForTwelfthPercentage={
                setIsDisabledForTwelfthPercentage
              }
              /* ------------------ DIPLOMA ------------------ */
              isDisabledForDiplomaPercentage={isDisabledForDiplomaPercentage}
              setIsDisabledForDiplomaPercentage={
                setIsDisabledForDiplomaPercentage
              }
              /* ------------------ UG ------------------ */
              isDisabledForUgPercentage={isDisabledForUgPercentage}
              setIsDisabledForUgPercentage={setIsDisabledForUgPercentage}
              /* ------------------ PG ------------------ */
              isDisabledForPgPercentage={isDisabledForPgPercentage}
              setIsDisabledForPgPercentage={setIsDisabledForPgPercentage}

              isEditing = {isEditing}
              setEditing={setEditing}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AcademicDetails;
