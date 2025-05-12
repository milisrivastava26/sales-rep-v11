import React, { useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import store, { RootState } from "../../store";
import { getLeadPropertiesForLeadMergeByCaptureId } from "../../store/lead-merge/get-leadMergeProperties-by-captureId-slice";
import { formatLabel } from "../../util/actions/formatLabel";
import {
  getCombinedValues,
  getInitialValues,
  initialValuesForMergeLead,
} from "../../util/actions/transform-leadMerge-initialValues";
import MergeLeadForm from "./MergeLeadForm";
import {
  formInputsForLeadMerge,
  validationSchemaForMergeLead,
} from "../../data/merge-lead-data";
import { getApByCareerId } from "../../store/get/get-all-academic-program-by-academic-career-id-slice";
import { getCityRowWiseByStateId } from "../../store/lead-attribute-update/get-CityRowWise-byStateId-slice";
import LoadingSpinner from "../../util/custom/ui/LoadingSpinner";
import { transformLeadMergeFormDataToPayload } from "../../util/actions/transform-leadMerge-data";
import {
  mergeLeadsByCaptureIds,
  resetMergedLeadData,
} from "../../store/lead-merge/merge-lead-slice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FormikProps } from "formik";

const mutuallyExclusiveFields = [
  "name",
  "email",
  "phone",
  "categoryName",
  "admitTypeName",
  "fatherName",
  "motherName",
  "dob",
  "active_enquiry",
  "address_PERMANENT",
  "address_CORRESPONDENCE",
  "leadCaptureId",
];

const additionalDetailKeys = [
  "admitTypeName",
  "categoryName",
  "fatherName",
  "motherName",
  "dob"
];


const MergeLeads: React.FC = React.memo(() => {
  const selectedLeads = useMemo(() => {
    return JSON.parse(localStorage.getItem("selectedLeadsForMerge") || "[]");
  }, []);

  const [selectedFields, setSelectedFields] = useState<{ [key: string]: any }>(
    {}
  );
  const { responseForCategory } = useSelector(
    (state: RootState) => state.getAllCategory
  );
  const { responseForAdmitType } = useSelector(
    (state: RootState) => state.getAllAdmitType
  );

  const formikRef = useRef<FormikProps<any>>(null);

  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const handleCheckboxChange = (
    leadId: string,
    fieldKey: string,
    value: any
  ) => {
    setSelectedFields((prev) => {
      const updated = { ...prev };

      // Remove existing entry if this is mutually exclusive
      if (mutuallyExclusiveFields.includes(fieldKey)) {
        Object.keys(updated).forEach((key) => {
          if (updated[key].fieldKey === fieldKey) {
            delete updated[key];
          }
        });
      }
      const checkboxId = `${leadId}_${fieldKey}`;

      // Toggle
      if (updated[checkboxId]) {
        delete updated[checkboxId];
      } else {
        updated[checkboxId] = { fieldKey, value, leadId };
      }

      return updated;
    });
  };

  useEffect(() => {
    if (error) {
      toast.error("Duplicate numbers are not allowed");
    }
  }, [error]);

  console.log("selectedFields", selectedFields);


  useEffect(() => {
    if (!formikRef.current) return;

    const currentValues = formikRef.current.values;
    const mergedValues = getInitialValues(selectedFields);

    const updatedValues = { ...currentValues };   

    const values = getCombinedValues(updatedValues, mergedValues);
    console.log(values)
    formikRef.current.setValues(values);

  }, [selectedFields]);

  const academicCareerId = formikRef.current?.values?.academicCareerId || "";
  const permanentStateId = formikRef.current?.values?.address?.find(
    (addr: any) => addr.addressType === "PERMANENT"
  )?.coreStateId;
  const correspondenceStateId = formikRef.current?.values?.address?.find(
    (addr: any) => addr.addressType === "CORRESPONDENCE"
  )?.coreStateId;

  const { isLoading, mergedLeadData } = useSelector(
    (state: RootState) => state.mergeLead
  );

  useEffect(() => {
    if (permanentStateId) {
      store.dispatch(
        getCityRowWiseByStateId({ stateId: permanentStateId, index: 0 })
      );
    }
  }, [permanentStateId]);

  useEffect(() => {
    if (correspondenceStateId) {
      store.dispatch(
        getCityRowWiseByStateId({ stateId: correspondenceStateId, index: 1 })
      );
    }
  }, [correspondenceStateId]);

  useEffect(() => {
    if (academicCareerId) {
      store.dispatch(getApByCareerId(academicCareerId));
    }
  }, [academicCareerId]);

  useEffect(() => {
    store.dispatch(getLeadPropertiesForLeadMergeByCaptureId(selectedLeads));
  }, [selectedLeads]);

  const { isLoading: isLoadingForMergeLeadProprties, leadPropertiesForMerge } =
    useSelector((state: RootState) => state.getLeadPropertiesForLeadMerge);

  const getAdmitTypeId = (value: any) => {
    const responseObj = responseForAdmitType.find(
      (item: any) => item.name === value
    );
    return responseObj?.value ?? null;
  };

  const getCategoryId = (value: any) => {
    const responseObj = responseForCategory.find(
      (item: any) => item.name === value
    );
    return responseObj?.value ?? null;
  };

  const handleLeadMerge = (values: any) => {
    const mergeLeadData = transformLeadMergeFormDataToPayload(
      values,
      selectedLeads
    );
    // console.log("mergeLeadData", mergeLeadData);
    if (!error) {
      store.dispatch(mergeLeadsByCaptureIds(mergeLeadData));
    }
  };

  useEffect(() => {
    if (mergedLeadData !== "" && !isLoading) {
      store.dispatch(resetMergedLeadData());

      setTimeout(() => {
        navigate("/manage-leads-v1");
      }, 2000);
    }
  }, [mergedLeadData, isLoading]);

  const maxContactCount = Math.max(...leadPropertiesForMerge.map(lead => lead.leadContactPhoneDTO.length));
  const maxAddressCount = Math.max(
    ...leadPropertiesForMerge.map((lead: any) => lead.leadAddressDetailsDTOS.length),
    0 // To handle the case where there are no addresses
  );

  if (isLoadingForMergeLeadProprties) {
    return (
      <LoadingSpinner
        centered={true}
        mainLoading={false}
        message="Loading lead details"
        size={25}
      />
    );
  }

  return (
    <div className="p-4">
      <div className="px-4 ml-4 pt-1 pb-2 mb-4 bg-white rounded shadow">
        <h1 className="text-2xl text-gray-800 font-bold">Merge Leads</h1>
        <p className="text-sm text-gray-600 mt-1">
          You have selected {selectedLeads.length} leads. Choose the details you
          want to keep from each.
        </p>
      </div>

      <div className="flex gap-4 w-full ">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-[60%] px-4 h-[calc(100vh-200px)] overflow-y-auto">
          {leadPropertiesForMerge.map((item: any, index: number) => (
            <div
              key={index}
              className="bg-white shadow rounded-lg w-full border border-gray-100"
            >
              <div className="bg-blue-500 flex justify-between items-center p-3 rounded-t-lg">
                <p className="text-white font-semibold">
                  {item.leadCaptureDTO.leadCaptureId}:{" "}
                  {item.leadCaptureDTO.name}
                </p>
              </div>

              <div className="py-4 space-y-4">
                {/* Primary Details */}
                <div>
                  <h2 className="font-semibold px-4 py-0.5 bg-blue-200 text-gray-800 mb-2">
                    Primary Details
                  </h2>
                  {Object.entries(item.leadCaptureDTO || {}).map(
                    ([key, value]) =>
                      value !== null &&
                        (!Array.isArray(value) || value.length > 0) ? (
                        <div
                          key={key}
                          className="flex px-4 items-start gap-2 text-sm"
                        >
                          {key !== "phone" && (
                            <>
                              <input
                                type="checkbox"
                                className="mt-1"
                                checked={Object.values(selectedFields).some(
                                  (entry) =>
                                    entry.fieldKey === key &&
                                    entry.leadId ===
                                    item.leadCaptureDTO.leadCaptureId
                                )}
                                onChange={() =>
                                  handleCheckboxChange(
                                    item.leadCaptureDTO.leadCaptureId,
                                    key,
                                    value
                                  )
                                }
                              />
                              <p className="font-medium text-gray-700">
                                {formatLabel(key)}:
                              </p>
                              <p className="text-gray-700 break-words">
                                {String(value)}
                              </p>
                            </>
                          )}
                        </div>
                      ) : null
                  )}
                </div>

                {/* Additional Details */}
                <div>
                  {item.leadAdditionalDetailsDTO && Object.keys(item.leadAdditionalDetailsDTO).length !== 0 && (
                    <h2 className="font-semibold px-4 py-0.5 bg-blue-200 text-gray-800 mb-2">Additional Details</h2>
                  )}

                  {item.leadAdditionalDetailsDTO ? (
                    additionalDetailKeys.map((key) => {
                      const value = item.leadAdditionalDetailsDTO[key] ?? null;
                      const isDisabled = value === null || value === undefined || value === "";

                      return isDisabled ? null : (
                        <div key={key} className="flex px-4 items-start gap-2 text-sm">
                          <input
                            type="checkbox"
                            className="mt-1"
                            disabled={isDisabled}
                            checked={Object.values(selectedFields).some(
                              (entry) =>
                                entry.fieldKey === key &&
                                entry.leadId === item.leadCaptureDTO.leadCaptureId
                            )}
                            onChange={() =>
                              handleCheckboxChange(
                                item.leadCaptureDTO.leadCaptureId,
                                key,
                                key === "dob"
                                  ? (typeof value === "string" ? value.split("T")[0] : "") ?? ""
                                  : key === "admitTypeName"
                                    ? getAdmitTypeId(value)
                                    : key === "categoryName"
                                      ? getCategoryId(value)
                                      : value
                              )
                            }
                          />
                          <p className="font-medium text-gray-700 text-nowrap">
                            {String(formatLabel(key))}:
                          </p>
                          <p className="text-gray-700">
                            {key === "dob"
                              ? String(value)?.split("T")[0]
                              : String(value)}
                          </p>
                        </div>
                      );
                    })
                  ) : (
                    // If the leadAdditionalDetailsDTO is null, render a blank space
                    <div className="h-[134px]" />
                  )}
                </div>


                {/* Contact Details */}
                <div>
                  <h2 className="font-semibold px-4 py-0.5 bg-blue-200 text-gray-800 mb-2">Contacts</h2>
                  {Array.from({ length: maxContactCount }).map((_, index) => {
                    const contact = item.leadContactPhoneDTO[index];
                    const fieldKey = `contact_${index}`;

                    return (
                      <div
                        key={index}
                        className={
                          contact
                            ? "border mx-4 p-3 rounded-md space-y-1 mb-2 bg-gray-50 min-h-[100px]"
                            : "mb-2 min-h-[150px]" // just vertical space
                        }
                      >
                        {contact && (
                          <>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                checked={Object.values(selectedFields).some(
                                  (entry) =>
                                    entry.fieldKey === fieldKey &&
                                    entry.leadId === item.leadCaptureDTO.leadCaptureId
                                )}
                                onChange={() =>
                                  handleCheckboxChange(
                                    item.leadCaptureDTO.leadCaptureId,
                                    fieldKey,
                                    contact
                                  )
                                }
                              />
                              <p className="font-semibold text-gray-800">
                                Contact {index + 1}
                              </p>
                            </div>

                            {Object.entries(contact).map(([key, value]) =>
                              value !== null &&
                                (!Array.isArray(value) || value.length > 0) &&
                                key !== "leadCaptureId" &&
                                key !== "leadContactPhoneId" ? (
                                <div key={key} className="flex gap-2 text-sm">
                                  <p className="font-medium text-gray-700 text-nowrap">
                                    {formatLabel(key)}:
                                  </p>
                                  <p className="text-gray-700">
                                    {value === true ? "Yes" : String(value)}
                                  </p>
                                </div>
                              ) : null
                            )}
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>



                {/* Enquiry Details */}
                <div>
                  <h2 className="font-semibold px-4 py-0.5 bg-blue-200 text-gray-800 mb-2">
                    Enquiry Details
                  </h2>
                  <div className="border mx-4 px-4 p-3 rounded-md bg-gray-50 space-y-1 h-52">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={Object.values(selectedFields).some(
                          (entry) =>
                            entry.fieldKey === "active_enquiry" &&
                            entry.leadId === item.leadCaptureDTO.leadCaptureId
                        )}
                        onChange={() =>
                          handleCheckboxChange(
                            item.leadCaptureDTO.leadCaptureId,
                            "active_enquiry",
                            item.leadEnquiryDTO
                          )
                        }
                      />
                      <p className="font-semibold text-gray-800">
                        Active Enquiry
                      </p>
                    </div>
                    {Object.entries(item.leadEnquiryDTO || {}).map(
                      ([key, value]) =>
                        value !== null &&
                          (!Array.isArray(value) || value.length > 0) &&
                          [
                            "careerName",
                            "programName",
                            "leadSourceName",
                            "cityName",
                            "stateName",
                          ].includes(key) ? (
                          <div key={key} className="flex gap-2 text-sm">
                            <p className="font-medium text-gray-700 text-nowrap">
                              {formatLabel(key)}:
                            </p>
                            <p className="text-gray-700">
                              {value === true ? "Yes" : String(value)}
                            </p>
                          </div>
                        ) : null
                    )}
                  </div>
                </div>

                {/* Address Details */}
                <div>
                  {item.leadAddressDetailsDTOS.length !== 0 && <h2 className="font-semibold px-4 py-0.5 bg-blue-200 text-gray-800 mb-2">
                    Address Details
                  </h2>}
                  {Array.from({ length: maxAddressCount }).map((_, index) => {
                    const address = item.leadAddressDetailsDTOS[index];
                    const fieldKey = address
                      ? `address_${address.addressType}`
                      : `address_${index}`; // fallback key if address is missing

                    return (
                      <div
                        key={index}
                        className={
                          address
                            ? "border px-4 mx-4 p-3 rounded-md bg-gray-50 mb-2 space-y-1 min-h-[100px]"
                            : "mb-2 min-h-[100px]" // space only
                        }
                      >
                        {address && (
                          <>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                checked={Object.values(selectedFields).some(
                                  (entry) =>
                                    entry.fieldKey === fieldKey &&
                                    entry.leadId === item.leadCaptureDTO.leadCaptureId
                                )}
                                onChange={() =>
                                  handleCheckboxChange(
                                    item.leadCaptureDTO.leadCaptureId,
                                    fieldKey,
                                    address
                                  )
                                }
                              />
                              <p className="font-semibold text-gray-800">
                                {address.addressType}
                              </p>
                            </div>

                            {Object.entries(address).map(([key, value]) =>
                              value !== null &&
                                (!Array.isArray(value) || value.length > 0) &&
                                [
                                  "addressLine1",
                                  "addressLine2",
                                  "pin",
                                  "stateName",
                                  "cityName",
                                ].includes(key) ? (
                                <div key={key} className="flex gap-2 text-sm">
                                  <p className="font-medium text-gray-700 text-nowrap">
                                    {formatLabel(key)}:
                                  </p>
                                  <p className="text-gray-700">
                                    {value === true ? "Yes" : String(value)}
                                  </p>
                                </div>
                              ) : null
                            )}
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Side - Selected Fields Preview */}
        <div className="w-[40%] bg-white rounded-md shadow h-[calc(100vh-200px)] overflow-y-auto">
          {!isLoadingForMergeLeadProprties && (
            <>
              <h2 className=" px-4 font-medium mb-3 py-3 text-white bg-blue-500">
                Preview
              </h2>
              <MergeLeadForm
                initialValues={initialValuesForMergeLead}
                validationSchema={validationSchemaForMergeLead}
                formInputsForLeadMerge={formInputsForLeadMerge}
                onSubmit={(values: any) => handleLeadMerge(values)}
                setError={setError}
                error={error}
                formikRef={formikRef}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
});

export default MergeLeads;
