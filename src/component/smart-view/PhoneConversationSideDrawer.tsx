import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { PhoneConversationFormData } from "../../data/smart-view/phone-conversation/PhoneConversationData";
import { formatDate, formatTime } from "../../util/custom/smartView/FormatDate";
import store from "../../store";
import { uiSliceAction } from "../../store/ui/ui-slice";

// Define the data structure for selectedData
interface PhoneConversationData {
  activityType: string;
  leadName: string;
  notes: string;
  outcomes: string;
  nextFollowUp: string;
  owner: string;
  activityDateTime: string;
}

interface EditSideDrawerProps {
  selectedData: PhoneConversationData;
}
type PhoneConversationFormValues = {
  activityType: string;
  leadName: string;
  notes: string;
  outcomes: string;
  nextFollowUp: string;
  owner: string;
  activityDateTime: string;
  activityDate: string;
  activityTime: string;
  [key: string]: any;
};
const EditSchema = Yup.object().shape({
  leadName: Yup.string().required("Lead name is required"),
  notes: Yup.string().required("Notes are required"),
  activityDate: Yup.date().required("Activity date is required"),
});

const SideDrawerForPhoneConversation: React.FC<EditSideDrawerProps> = ({ selectedData }) => {
  const initialValuesForPhoneConversationEdit = {
    activityType: "", // or set a default
    leadName: selectedData.leadName,
    notes: selectedData.notes,
    outcomes: "", // or set a default
    nextFollowUp: "", // or set a default
    owner: selectedData.owner, // or set a default
    activityDateTime: selectedData.activityDateTime,
    activityDate: formatDate(selectedData.activityDateTime.split(" ")[0]), // Get only the date
    activityTime: formatTime(selectedData.activityDateTime.split(" ")[1]), // Get only the time
  };
  const handleSubmit = () => {
    store.dispatch(uiSliceAction.onDrawrCloseHandler());
  };

  return (
    <>
      <div className="p-5   overflow-y-auto">
        <Formik<PhoneConversationFormValues> initialValues={initialValuesForPhoneConversationEdit} validationSchema={EditSchema} onSubmit={handleSubmit}>
          {({ values }) => (
            <Form className="flex flex-wrap">
              {PhoneConversationFormData.map((field, index) => {
                return (
                  <div key={index} className={`mb-4 ${index < 3 ? "w-full" : "w-full md:w-1/2"}`}>
                    <div>
                      {field.type === "select" ? (
                        <div>
                          <label className="block text-sm font-medium mb-2">{field.label}</label>
                          <Field as="select" name={field.name as keyof PhoneConversationFormValues} className="w-full border border-gray-300 p-2 rounded">
                            {field.options?.map((option, idx) => (
                              <option key={idx} value={option.name}>
                                {option.label}
                              </option>
                            ))}
                          </Field>
                        </div>
                      ) : field.type === "textarea" ? (
                        <div>
                          <label className="block text-sm font-medium mb-2">{field.label}</label>
                          <Field as="textarea" name={field.name as keyof PhoneConversationFormValues} className="w-full border border-gray-300 p-2 rounded" />
                        </div>
                      ) : field.type === "dateTime" ? (
                        <div className="ml-3">
                          <label className="block text-sm font-medium mb-2">{field.label}</label>

                          <div className="flex">
                            {field.splits?.map((data, index) => {
                              return (
                                <div key={index}>
                                  <Field
                                    type={data.type}
                                    name={data.name as keyof PhoneConversationFormValues}
                                    className="border border-gray-300 p-2 w-full rounded"
                                    value={values[data.name] || ""}
                                  />
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      ) : null}
                    </div>
                  </div>
                );
              })}
              <button type="submit" className="bg-blue-500 text-white p-2 rounded ">
                Save Changes
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default SideDrawerForPhoneConversation;
