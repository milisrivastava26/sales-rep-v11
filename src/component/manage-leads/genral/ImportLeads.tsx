import { FC, useEffect, useState } from "react";
import store, { RootState } from "../../../store";
import {
  importLeads,
  resetResponseForImportLeads,
} from "../../../store/actions/import-leads-slice";
import { useSelector } from "react-redux";
import { uiSliceAction } from "../../../store/ui/ui-slice";
import { useNavigate } from "react-router-dom";
import { Progress } from "antd";

const ImportLeadsForm: FC = () => {
  const dispatch = store.dispatch;
  const [error, setError] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const { isLoading, responseOfImportLeads } = useSelector(
    (state: RootState) => state.importLeads
  );
  const [progressPercent, setProgressPercent] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isLoading === "requestHit") {
      setProgressPercent(0);

      // Simulate gradual progress while loading
      interval = setInterval(() => {
        setProgressPercent((prev) => (prev < 90 ? prev + 10 : prev)); // Progress until 90%
      }, 1500);
    } else if (isLoading === "success") {
      // On success, complete progress and hide after a delay
      setProgressPercent(100);
      setTimeout(() => {
        setProgressPercent(0); // Reset after success
      }, 500);
    }

    else if(isLoading==="error"){
      setProgressPercent(0);
    }

    return () => clearInterval(interval);
  }, [isLoading]);
  const navigate = useNavigate();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setError(""); // Reset error on new selection
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      if (
        !selectedFile.name.endsWith(".xls") &&
        !selectedFile.name.endsWith(".xlsx")
      ) {
        setError("Please upload an Excel file (.xls or .xlsx) only.");
        setIsDisabled(true);
        return;
      }
      if (selectedFile.size > 50 * 1024 * 1024) {
        setError("File size must be less than 50MB.");
        setIsDisabled(true);
        return;
      }
      setFile(selectedFile);
      setIsDisabled(false);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!file) {
      setError("Please select a file before submitting.");
      setIsDisabled(true);
      return;
    }
    const formData = new FormData();
    formData.append("multipartFile", file);
    dispatch(importLeads(formData));
  };

  useEffect(() => {
    if (isLoading === "success" && responseOfImportLeads !== "") {
      setTimeout(() => {
        dispatch(uiSliceAction.onManageLeadsImportModal(false));
        navigate("/manage-leads-v1/imported-leads");
      }, 1000);
      store.dispatch(resetResponseForImportLeads());
    }
  }, [responseOfImportLeads]);

  return (
    <>
      <div className="flex-cols justify-center items-center p-5">
        <div className="px-6">
          <Progress percent={progressPercent} size={[580, 20]} strokeColor={"green"}/>
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-6 space-y-4">
          <input
            type="file"
            accept=".xls,.xlsx"
            onChange={handleFileChange}
            className="border p-2 w-full rounded mb-2"
          />
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button
            type="submit"
            disabled={isDisabled || isLoading==="requestHit"}
            className={`w-full py-2 rounded ${
              isDisabled || isLoading==="requestHit"
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            Upload File
          </button>
        </form>
      </div>
    </>
  );
};

export default ImportLeadsForm;
