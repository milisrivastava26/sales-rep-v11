import Select from "react-select";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { InputDataType } from "../../../data/manage-leads/filter-head-data";
import store, { RootState } from "../../../store";
import {
  transformDataForLeadStagesAndSource,
  transformDataForLeadSubStages,
} from "../../actions/transformFilterApiData";
import { getleadSubStagesById } from "../../../store/lead-capturing/get-allLeadSubStages-byId-slice";
import { getApByCareerId } from "../../../store/get/get-all-academic-program-by-academic-career-id-slice";
import { getLeadCaptureByFullName } from "../../../store/lead-capture/get-allLeadCapture-By-fullName-slice";
import { getNewLeadFilterData } from "../../../store/smart-view/get-newLead-filterData-slice";

interface PropsType {
  inputData: InputDataType[];
  filterpayload: any;
  setFilterPayload: any;
}

const CustomFilterContainer: React.FC<PropsType> = ({
  inputData,
  filterpayload,
  setFilterPayload,
}) => {
  const dispatch = store.dispatch;
  // const [filterpayload, setFilterPayload] = useState<Record<string, { key: string; value: string }>>({});
  const [selectedValues, setSelectedValues] = useState<Record<string, any>>({});
  const { responseForLeadStage: leadStageData } = useSelector(
    (state: RootState) => state.leadStageValues
  );
  const { responseForLeadSource } = useSelector(
    (state: RootState) => state.leadSourceValues
  );
  const { userDetails } = useSelector(
    (state: RootState) => state.getLoggedInUserData
  );
  const { leadSubStagesDataById } = useSelector(
    (state: RootState) => state.getleadSubStagesDataById
  );
  const { responseForOwner } = useSelector(
    (state: RootState) => state.getAllOwner
  );
  const { responseForApplicationStatus } = useSelector(
    (state: RootState) => state.getAllApplicationStatus
  );
  // const { isHamburgerModalOpen } = useSelector((state: RootState) => state.ui);

  const fullName = userDetails?.fullName;
  const optionForLeadStages =
    transformDataForLeadStagesAndSource(leadStageData);
  const optionForLeadSource = transformDataForLeadStagesAndSource(
    responseForLeadSource
  );
  const optionForLeadSubStages = transformDataForLeadSubStages(
    leadSubStagesDataById
  );
  const { responseForFilterHeadAcademicCareer: careerOptions } = useSelector(
    (state: RootState) => state.getAllAcademicCareer
  );
  const { responseForFilterHeadAcademicProgram: programOptions } = useSelector(
    (state: RootState) => state.getAllAcademicProgramByCareer
  );

  const handleFilterChange = (
    name: string,
    selectedOption: { value: string; label: string } | null
  ) => {
    setFilterPayload((prev: any) => {
      if (!selectedOption) {
        const updatedPayload = { ...prev };
        delete updatedPayload[name];
        return updatedPayload;
      }
      return { ...prev, [name]: selectedOption ? selectedOption.label : null };
    });
    setSelectedValues((prev) => ({ ...prev, [name]: selectedOption }));

    if (selectedOption && name === "current_lead_stage_display_name") {
      dispatch(getleadSubStagesById(selectedOption.value));
    }
    if (selectedOption && name === "academic_career_description") {
      dispatch(getApByCareerId(selectedOption.value));
    }
  };

  const handleDateChange = (name: string, value: string) => {
    setFilterPayload((prev: any) => {
      if (!value) {
        const updatedPayload = { ...prev };
        delete updatedPayload[name];
        return updatedPayload;
      }
      return { ...prev, [name]: value || null };
    });
    setSelectedValues((prev) => ({ ...prev, [name]: value }));
  };

  const resetFilters = () => {
    setFilterPayload({});
    setSelectedValues({});
  };

  useEffect(() => {
    if (Object.keys(filterpayload).length > 0) {
      const isSalesRepUser = !userDetails?.authority?.some(
        (role: string) => role === "ROLE_ADMIN" || role === "ROLE_MANAGER"
      );
     
      dispatch(
        getLeadCaptureByFullName(
          isSalesRepUser
            ? { current_salesrep_full_name: fullName, ...filterpayload }
            : filterpayload
        )
      );
    }
    if (Object.keys(filterpayload).length === 0) {
      let payload = {
        current_salesrep_full_name: fullName,
      };
      dispatch(getNewLeadFilterData(payload));
    }
  }, [filterpayload]);

  // const closeModalForHamburger = () => {
  //   dispatch(onDisableModalForHamburger());
  // };

  return (
    <>
      <div className="absolute  -top-[38px]">
        {Object.keys(filterpayload).length > 0 && (
          <button
            onClick={resetFilters}
            className="bg-red-500 text-white px-[9px] py-[2px]  rounded text-nowrap"
          >
            Reset Filters
          </button>
        )}
      </div>
      <div className="flex justify-between items-start  px-3 py-2">
        <div className="flex flex-wrap gap-3 items-center">
          {inputData.map((field: InputDataType) =>
            field.type === "select" ? (
              <div
                key={field.id}
                className=" flex  gap-y-1 items-start flex-col"
              >
                <label className="text-sm font-medium pl-[1px]">
                  {field.label}
                </label>
                {/* @ts-ignore */}
                <Select
                  className="min-w-[180px]"
                  options={
                    field.name === "current_lead_stage_display_name"
                      ? optionForLeadStages
                      : field.name === "current_lead_sub_stage_display_name"
                      ? optionForLeadSubStages.length > 0
                        ? optionForLeadSubStages
                        : [
                            {
                              label: "No data found for this Lead Stage",
                              value: "",
                            },
                          ]
                      : field.name === "lead_source_description"
                      ? optionForLeadSource
                      : field.name === "current_salesrep_full_name"
                      ? responseForOwner
                      : field.name === "application_status_name"
                      ? responseForApplicationStatus
                      : field.name === "academic_career_description"
                      ? careerOptions
                      : field.name === "academic_program_description"
                      ? programOptions
                      : null
                  }
                  value={selectedValues[field.name] || null}
                  onChange={(selectedOption) =>
                    handleFilterChange(field.name, selectedOption)
                  }
                  isClearable
                  isDisabled={
                    field.name === "current_salesrep_full_name" &&
                    !userDetails?.authority?.some(
                      (role: string) =>
                        role === "ROLE_ADMIN" || role === "ROLE_MANAGER"
                    )
                  }
                  styles={{
                    control: (provided) => ({
                      ...provided,
                      minHeight: "27px",
                      height: "27px",
                      padding: "0 5px",
                    }),
                    placeholder: (provided) => ({
                      ...provided,
                      fontSize: "14px", // Reduce placeholder font size
                    }),
                    valueContainer: (provided) => ({
                      ...provided,
                      padding: "0 5px",
                    }),
                    input: (provided) => ({
                      ...provided,
                      margin: "0px",
                      padding: "0px",
                    }),
                    indicatorsContainer: (provided) => ({
                      ...provided,
                      height: "27px",
                    }),
                  }}
                />
              </div>
            ) : field.type === "date" ? (
              <div
                key={field.id}
                className="flex  gap-y-1 items-start flex-col"
              >
                <label className="text-sm font-medium pl-[1px]">
                  {field.label}
                </label>
                <input
                  type="date"
                  className="border border-[#c9cccd] focus:outline-none focus:border-gray-400 rounded-[0.26rem] px-[6px] py-[1.7px] text-gray-600 text-sm min-w-[212px]"
                  name={field.name}
                  value={selectedValues[field.name] || ""}
                  onChange={(e) => handleDateChange(field.name, e.target.value)}
                />
              </div>
            ) : null
          )}
          <div className="mt-6">
        {Object.keys(filterpayload).length > 0 && (
          <button
            onClick={resetFilters}
            className="bg-red-500 text-white px-[9px] py-[2px]  rounded text-nowrap"
          >
            Reset Filters
          </button>
        )}
      </div>
        </div>

        {/* <i className="fa fa-bars cursor-pointer text-gray-500 text-[20px] mt-[20px] column" aria-hidden="true" onClick={() => store.dispatch(onShowModalForHamburger())}></i> */}

        {/* <Tooltip anchorSelect=".column" place="left" className="custom-tooltip">
          <div className="tooltip-content">
            Click to manage table columns. <br />
            Select checkboxes to add or remove columns dynamically.
          </div>
        </Tooltip> */}
      </div>

      {/* <div className={`${isHamburgerModalOpen ? "block" : "hidden"}`}>
        <CustomModal isMode="testAction" isShowModal={isHamburgerModalOpen} onHideModal={closeModalForHamburger} data={hamburgerModalData}>
          <ManageHamburgerColumn />
        </CustomModal>
      </div> */}
    </>
  );
};

export default CustomFilterContainer;
