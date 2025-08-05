import { useField } from "formik";
// import store from "../../../store";
// import { resetIsNumberExistsState } from "../../../store/lead-capture/checkIfNumberExists-slice";

interface typeForPhoneInput {
  name: string;
  response?: any;
  onIsPhoneExist?: (phone: string) => void;
  isMode?: string;
}
const PhoneInput: React.FC<typeForPhoneInput> = ({ name, response, onIsPhoneExist, isMode }) => {
  const [field, meta, helpers] = useField(name);

  const handleBlur = () => {
    response = null;
    const phoneValue = field.value?.trim();
    //  Validation for 10-digit phone number
    if (!/^\d{10}$/.test(phoneValue)) {
      helpers.setError("Phone number must be exactly 10 digits");
    } else {
      helpers.setError(undefined); //  Clear error if valid
      if (onIsPhoneExist && response === null) {
        onIsPhoneExist(phoneValue); //  Calls function only when valid
      }
    }

    helpers.setTouched(true); // Ensures validation runs after blur
  };

  return (
    <div>
      <input
        {...field}
        type="text"
        maxLength={10}
        disabled={isMode === "personalDetails"}
        className={`border ${isMode === "personalDetails" ? "bg-transparent border-none" : "bg-gray-100 border-gray-200 focus:outline-none focus:border-gray-400"} py-1 px-2 rounded-md w-full ${meta.touched && meta.error ? "border-red-500" : ""
          }`}
        onBlur={handleBlur} //  Runs validation on blur
      />
      {/* {meta.touched && meta.error && <div className="text-red-500 text-sm mt-1">{meta.error}</div>} */}
    </div>
  );
};

export default PhoneInput;
