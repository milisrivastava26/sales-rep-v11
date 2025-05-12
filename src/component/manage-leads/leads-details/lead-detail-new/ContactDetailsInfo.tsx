import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import store, { RootState } from "../../../../store";
import ContactDetailsForm from "./ContactDetailsForm";
import { getInitialValuesForContact, validationSchemaForContact } from "../../../../data/lead-details-data-new/leadContact-data";
import { useParams } from "react-router-dom";
import { resetResponseForUpdateLeadContact, takeActionsForUpdateLeadContact, updateLeadContact } from "../../../../store/lead-attribute-update/update-contact-slice";
import { MdOutlineEdit } from "react-icons/md";
import toast from "react-hot-toast";

const ContactDetailsInfo: React.FC = () => {
  const { isLoading, responseOfLeadContactDetailsById } = useSelector((state: RootState) => state.getLeadContactDetailsDataById);
  const { isError, resetActions, responseOfUpdateLeadContact } = useSelector((state: RootState) => state.LeadContactUpdate);
  const { leadCaptureId } = useParams();
  const [isEditing, setEditing] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (error) {
      toast.error("Duplicate numbers are not allowed");
    }
  }, [error]);

  const initialValues = getInitialValuesForContact(responseOfLeadContactDetailsById, leadCaptureId);

  const onUpdateLeadHandler = (data: any) => {
    const { values, actions } = data;

    if (error) {
      toast.error("Duplicate numbers are not allowed");
    } else {
      store.dispatch(updateLeadContact(values));
      store.dispatch(takeActionsForUpdateLeadContact(actions));
    }
  };

  useEffect(() => {
    if (!isError && responseOfUpdateLeadContact) {
      setEditing(false);
      resetActions.resetForm();
      store.dispatch(resetResponseForUpdateLeadContact());
    }
  }, [responseOfUpdateLeadContact]);

  const handleEditClick = () => {
    setEditing(true);
  };

  return (
    <>
      {responseOfLeadContactDetailsById !== null && !isLoading && (
        <div className="bg-white relative  mt-5  pb-1">
          <div className="flex justify-between items-center h-[50px] relative bg-blue-100 ">
            <h1 className="text-lg font-semibold px-4">Contacts</h1>
            {!isEditing && (
              <button className=" px-6 py-1.5  font-medium rounded-lg" onClick={handleEditClick}>
                <MdOutlineEdit size={20} />
              </button>
            )}
          </div>

          <div className="">
            <ContactDetailsForm
              btnText={"Save"}
              btnType={"submit"}
              initialValues={initialValues}
              validationschema={validationSchemaForContact}
              isEnableForAction={true}
              onSaveAndAddHandler={onUpdateLeadHandler}
              isEditing={isEditing}
              setEditing={setEditing}
              setError={setError}
              error={error}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ContactDetailsInfo;
