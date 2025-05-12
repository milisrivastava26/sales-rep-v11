import { Form, Formik } from "formik";
import ContactTable from "../../genral/ContactTable";
import ButtonInput from "../../../../util/custom/FormInputs/ButtonInput";
import { RxCheck, RxCross2 } from "react-icons/rx";
import store, { RootState } from "../../../../store";
import { getLeadContactDetailsById } from "../../../../store/lead-attribute-update/get-leadContactDetails-byId-slice";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

interface TabFormType {
  tabName?: string;
  isReadOnly?: boolean;
  isModeUpdate?: boolean;
  initialValues: any;
  validationschema: any;
  onSaveAndAddHandler: any;
  btnText: string;
  btnType: string | any;
  isEnableForAction: boolean;
  isEditing: boolean;
  setEditing: (e: any) => void;
  setError: (e: any) => void;
  error: boolean;
}

const ContactDetailsForm: React.FC<TabFormType> = ({
  initialValues,
  validationschema,
  onSaveAndAddHandler,
  btnType,
  isEnableForAction,
  isEditing,
  setEditing,
  setError,
  error,
}) => {
  const { leadCaptureId } = useParams();
  const { isLoading: isLoadingForUpdateContact } = useSelector((state: RootState) => state.LeadContactUpdate);

  return (
    <div className={` w-full`}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationschema}
        onSubmit={(values, actions) => {
          const updatedValues = { ...values };
          onSaveAndAddHandler?.({ values: updatedValues, actions });
        }}
      >
        {({ values }) => (
          <Form className="">
            {isEditing && (
              <div className="flex justify-end mb-10 gap-4 items-center mt-5 absolute -top-[11px] right-4">
                <button
                  type="button"
                  className=" py-1.5 font-medium rounded"
                  onClick={() => {
                    setEditing(false);
                    store.dispatch(getLeadContactDetailsById(leadCaptureId));
                  }}
                >
                  <RxCross2 size={22} color="red" />
                </button>
                <ButtonInput
                  style=" py-1.5 font-medium rounded"
                  isDisabled={isLoadingForUpdateContact}
                  icon={<RxCheck size={24} color="green" />}
                  btnType={btnType}
                  isEnableForAction={isEnableForAction}
                />
              </div>
            )}

            <ContactTable values={values} isEditing={isEditing} setError={setError} error={error} />
            {/* Submit Button */}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ContactDetailsForm;
