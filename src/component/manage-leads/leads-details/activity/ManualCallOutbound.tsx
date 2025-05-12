import React, { useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useParams } from "react-router-dom";
import {
  createManualCallOutbound,
  resetManualCallResponse,
  takeManualCallAction,
} from "../../../../store/activity/create-manualCallOutbound-slice";
import store, { RootState } from "../../../../store";
import { useSelector } from "react-redux";
import { uiSliceAction } from "../../../../store/ui/ui-slice";

// Utility to convert minutes to hh:mm:ss
const convertMinutesToHHMMSS = (minutes: number) => {
  const totalSeconds = Math.floor(minutes * 60);
  const hours = Math.floor(totalSeconds / 3600);
  const mins = Math.floor((totalSeconds % 3600) / 60);
  const secs = totalSeconds % 60;
  return `${String(hours).padStart(2, "0")}:${String(mins).padStart(
    2,
    "0"
  )}:${String(secs).padStart(2, "0")}`;
};

// Utility to format time input (HH:mm) to HH:mm:ss
const formatTimeToHHMMSS = (time: string) => {
  return time ? `${time}:00` : "";
};

const validationSchema = Yup.object({
  callDuration: Yup.number()
  .required("Call Duration is required")
  .min(0, "Call Duration cannot be negative")
  .typeError("Call Duration must be a number"),


  callTime: Yup.string().required("Call Time is required"),
  callStatus: Yup.string().required("Call Status is required"),
});

const optionsForCallStatus = [
  { value: "CANCEL", label: "CANCEL" },
  { value: "BUSY", label: "BUSY" },
  { value: "ANSWER", label: "ANSWER" },
  { value: "NOANSWER", label: "NO ANSWER" },
];

const ManualCallOutbound: React.FC = () => {
  const { leadCaptureId } = useParams();
  const { responseOfManualCall, isLoading, resetActions } = useSelector(
    (state: RootState) => state.createManualCallOutbound
  );

  const saveManualCallOutboundData = (
    data: {
      callDuration: string;
      callTime: string;
      callStatus: string;
    },
    actions: any
  ) => {
    const callData = {
      callDuration: data.callDuration,
      callTime: data.callTime,
      leadCaptureId: leadCaptureId,
      coreLeadActionId: 34,
      callStatus: data.callStatus,
    };

    store.dispatch(createManualCallOutbound(callData));
    store.dispatch(takeManualCallAction(actions));
  };

  useEffect(() => {
    if (Object.keys(responseOfManualCall).length > 0 && !isLoading) {
      store.dispatch(uiSliceAction.onDrawrCloseHandler());
      if (resetActions) {
        resetActions.resetForm();
      }
      store.dispatch(resetManualCallResponse());
    }
  }, [responseOfManualCall, isLoading]);

  return (
    <div className="flex w-full mt-5">
      <div className="rounded-lg w-full">
        <Formik
          initialValues={{ callDuration: "", callTime: "", callStatus: "" }}
          validationSchema={validationSchema}
          onSubmit={(values, actions) => {
            const formattedDuration = convertMinutesToHHMMSS(
              Number(values.callDuration)
            );
            const formattedTime = formatTimeToHHMMSS(values.callTime);

            const finalPayload = {
              callDuration: formattedDuration,
              callTime: formattedTime,
              callStatus: values.callStatus,
            };

            saveManualCallOutboundData(finalPayload, actions);
          }}
        >
          <Form className="">
            <div className="flex justify-between gap-4 items-center">
              {/* Call Duration Field */}
              <div className="flex w-full flex-col">
                <label
                  htmlFor="callDuration"
                  className="text-sm font-medium text-black"
                >
                  Call Duration (in minutes){" "}
                  <span className="text-red-500">*</span>
                </label>
                <Field
                  type="number"
                  id="callDuration"
                  name="callDuration"
                  placeholder="Enter Call Duration"
                  className="mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="text-sm mt-2 min-h-[1.25rem] text-red-500">
                  <ErrorMessage name="callDuration" />
                </div>
              </div>

              {/* Call Time Field */}
              <div className="flex w-full flex-col">
                <label
                  htmlFor="callTime"
                  className="text-sm font-medium text-black"
                >
                  Call Time <span className="text-red-500">*</span>
                </label>
                <Field
                  type="time"
                  id="callTime"
                  name="callTime"
                  className="mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="text-sm mt-2 min-h-[1.25rem] text-red-500">
                  <ErrorMessage name="callTime" />
                </div>
              </div>

              {/* Call status */}
            </div>
            <div className="flex w-full flex-col -mt-1">
              <label
                htmlFor="callStatus"
                className="text-sm font-medium text-black"
              >
                Call Status <span className="text-red-500">*</span>
              </label>
              <Field
                as="select"
                id="callStatus"
                name="callStatus"
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Call Status</option>
                {optionsForCallStatus.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Field>
              <div className="text-sm mt-2 min-h-[1.25rem] text-red-500">
                <ErrorMessage name="callStatus" />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isLoading}
                className={`py-2 px-6 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${isLoading? "bg-opacity-50 cursor-not-allowed" : ""}`}
              >
                Save
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default ManualCallOutbound;
