import { Field, FieldArray, useField, useFormikContext } from "formik";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { contactRelationOptions } from "../../data/lead-details-data-new/leadContact-data";

interface TypeFor {
  values: {
    contact: {
      contactName: string;
      contactRelation: string;
      contactNumber: string;
      primary: boolean;
    }[];
    name?: string;
    phone?: string;
  };
  setError?: (e: any) => void;
  error?: boolean;
}

interface ContactFieldProps {
  name: string;
  idx?: number;
  type: string;
  contact: TypeFor["values"]["contact"];
  setError?: (e: any) => void;
  options?: { label: string; value: string }[];
}

const ContactField: React.FC<ContactFieldProps> = ({
  name,
  idx,
  type,
  contact,
  setError,
  options,
}) => {
  const [field, meta, helpers] = useField(name);

  // const { isNumberExists } = useSelector(
  //   (state: RootState) => state.isNumberExistsResponse
  // );
  useEffect(() => {
    const isDuplicate = contact.some(
      (c, i) => i !== idx && c.contactNumber === field.value
    );

    if (isDuplicate) {
      setError?.(true);
      helpers.setError("Duplicate contact number is not allowed.");
    } else {
      setError?.(false);
      helpers.setError(undefined);
    }
  }, [field.value, contact, idx]);

  // useEffect(() => {
  //   contact.forEach(async (item: any) => {
  //     await store.dispatch(checkIfNumberExists(item.contactNumber));

  //     if (isNumberExists) {
  //       toast.error("Number already exists");
  //       setError?.(true);
  //     }
  //   });
  // }, [contact]);

  return (
    <>
      {type === "select" ? (
        <Field
          as="select"
          {...field}
          className={`w-full border px-2 outline-none focus:bg-gray-100 ${
            meta.error && meta.touched ? "border-red-500" : "border-gray-200"
          }`}
        >
          <option value="">Select Relation</option>
          {options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Field>
      ) : (
        <Field
          {...field}
          type={type}
          className={`w-full border px-2 outline-none focus:bg-gray-100 ${
            meta.error && meta.touched ? "border-red-500" : "border-gray-200"
          }`}
        />
      )}
    </>
  );
};

const MergeLeadContact: React.FC<TypeFor> = ({ values, setError, error }) => {
  const [isEnableForContactField, setIsEnableForContactField] = useState(false);
  const { contact } = values;
  const { leadCaptureId } = useParams();
  const { errors } = useFormikContext<any>();

  useEffect(() => {
    const hasEmptyFields = contact.some(
      (c) =>
        c.contactName.trim() === "" ||
        c.contactRelation.trim() === "" ||
        c.contactNumber.trim() === ""
    );
    setIsEnableForContactField(hasEmptyFields);
  }, [contact]);

  const handlePrimaryChange = (index: number, arrayHelpers: any) => {
    arrayHelpers.form.setFieldValue(`contact[${index}].primary`, true);
    contact.forEach((_, idx) => {
      if (idx !== index) {
        arrayHelpers.form.setFieldValue(`contact[${idx}].primary`, false);
      }
    });
  };

  return (
    <FieldArray
      name="contact"
      render={(arrayHelpers) => (
        <div className="contact__head-section w-full">
          <table className="w-full" border={2}>
            <thead>
              <tr>
                <th className="border text-nowrap">
                  Contact Name <span className="text-red-500 text-lg">*</span>
                </th>
                <th className="border text-nowrap">Relation <span className="text-red-500 text-lg">*</span></th>
                <th className="border text-nowrap">Contact Number <span className="text-red-500 text-lg">*</span></th>
                <th className="border text-nowrap">Primary <span className="text-red-500 text-lg">*</span></th>
                <th className="border text-nowrap">Action <span className="text-red-500 text-lg">*</span></th>
              </tr>
            </thead>
            <tbody>
              {contact.map((_, idx) => (
                <tr key={idx}>
                  <td className="px-2 border">
                    <ContactField
                      name={`contact[${idx}].contactName`}
                      type="text"
                      idx={idx}
                      contact={contact}
                      setError={setError}
                    />
                  </td>
                  <td className="px-2 border">
                    <ContactField
                      name={`contact[${idx}].contactRelation`}
                      type="select"
                      idx={idx}
                      contact={contact}
                      setError={setError}
                      options={contactRelationOptions}
                    />
                  </td>
                  <td className="px-2 border">
                    <ContactField
                      name={`contact[${idx}].contactNumber`}
                      type="text"
                      idx={idx}
                      contact={contact}
                      setError={setError}
                    />
                  </td>
                  <td className="px-2 border text-center">
                    <Field
                      name={`contact[${idx}].primary`}
                      type="radio"
                      checked={contact[idx].primary}
                      onChange={() => handlePrimaryChange(idx, arrayHelpers)}
                      className="cursor-pointer"
                    />
                  </td>
                  <td className="px-2 border text-center">
                    {idx === 0 ? (
                      <button
                        type="button"
                        onClick={() => {
                          if (!isEnableForContactField && !error) {
                            arrayHelpers.push({
                              leadCaptureId: leadCaptureId,
                              contactName: "",
                              contactRelation: "",
                              contactNumber: "",
                              primary: false,
                            });
                          }
                        }}
                        className={`${
                          isEnableForContactField || error
                            ? "bg-opacity-50"
                            : ""
                        } bg-blue-500 text-white px-3 py-[6px] text-sm font-semibold rounded-md`}
                      >
                        +
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => arrayHelpers.remove(idx)}
                        className="bg-red-500 text-white px-3 py-[6px] text-sm font-semibold rounded-md"
                      >
                        -
                      </button>
                    )}
                  </td>
                </tr>
              ))}

              {/* ✅ Show error row inside tbody */}
              {typeof errors.contact === "string" &&
                errors.contact.includes("primary") && (
                  <tr>
                    <td colSpan={5}>
                      <p className="text-red-500 text-sm px-2">
                        {errors.contact}
                      </p>
                    </td>
                  </tr>
                )}
            </tbody>
          </table>
        </div>
      )}
    />
  );
};

export default MergeLeadContact;
