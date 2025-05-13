import Select from "react-select";
import { Tooltip } from "react-tooltip";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import store, { RootState } from "../../../../store";
import ManageHamburgerColumn from "./ManageHamburgerColumn";
import CustomModal from "../../../../util/custom/ui/CustomModal";
import { onDisableModalForHamburger, setSearchQuery } from "../../../../store/ui/ui-slice";
import { InputDataType } from "../../../../data/manage-leads/filter-head-data";
import { hamburgerModalData } from "../../../../data/manage-leads/ManageLeadsData";
import { getleadSubStagesById } from "../../../../store/lead-capturing/get-allLeadSubStages-byId-slice";
import { getApByCareerId } from "../../../../store/get/get-all-academic-program-by-academic-career-id-slice";
import {
  transformDataForLeadStagesAndSource,
  transformDataForLeadSubStages,
} from "../../../../util/actions/transformFilterApiData";
import { getLeadStageValues } from "../../../../store/lead-capturing/get-allLeadStage-slice";
import { getLeadSourceValues } from "../../../../store/lead-capturing/get-allLeadSource-slice";
import { getOwnerValues } from "../../../../store/lead-capturing/get-allOwner-slice";
import { getApplicationStatusValues } from "../../../../store/lead-capturing/get-allApplicationStatus-slice";
import { getAcademicCareerValues } from "../../../../store/get/get-all-academic-career-slice";
import { HiOutlineRefresh } from "react-icons/hi";
import { getPaginatedLeads } from "../../../../store/pagination-v1/get-paginatedLead-slice";
import { resetsearchedLeads } from "../../../../store/pagination-v1/get-searched-leads-slice";

interface PropsType {
  inputData: InputDataType[];
  filterpayload: any;
  setFilterPayload: any;
}

const FilterHeadV1: React.FC<PropsType> = ({
  inputData,
  filterpayload,
  setFilterPayload,
}) => {
  const dispatch = store.dispatch;
  const [selectedValues, setSelectedValues] = useState<Record<string, any>>({});

  const {
    isLoading: isLoadingForLeadStage,
    responseForLeadStage: leadStageData,
  } = useSelector((state: RootState) => state.leadStageValues);
  const { isLoading: isLoadingForLeadSource, responseForLeadSource } =
    useSelector((state: RootState) => state.leadSourceValues);
  const { userDetails } = useSelector(
    (state: RootState) => state.getLoggedInUserData
  );
  const { isLoading: isLoadingForLeadSubStage, leadSubStagesDataById } =
    useSelector((state: RootState) => state.getleadSubStagesDataById);
  const { isLoading: isLoadingForOwner, responseForOwner } = useSelector(
    (state: RootState) => state.getAllOwner
  );
  const {
    isLoading: isLoadingForApplicationStatus,
    responseForApplicationStatus,
  } = useSelector((state: RootState) => state.getAllApplicationStatus);
  const { isHamburgerModalOpen } = useSelector((state: RootState) => state.ui);
  const { paginatedProps, searchQuery } = useSelector((state: RootState) => state.ui);
  console.log("searchQuery", searchQuery);
  const {
    isLoading: isLoadingForCareer,
    responseForFilterHeadAcademicCareer: careerOptions,
  } = useSelector((state: RootState) => state.getAllAcademicCareer);
  const {
    isLoading: isLoadingForProgram,
    responseForFilterHeadAcademicProgram: programOptions,
  } = useSelector((state: RootState) => state.getAllAcademicProgramByCareer);

  const fullName = userDetails?.fullName;

  const optionForLeadStages =
    transformDataForLeadStagesAndSource(leadStageData);
  const optionForLeadSource = transformDataForLeadStagesAndSource(
    responseForLeadSource
  );
  const optionForLeadSubStages = transformDataForLeadSubStages(
    leadSubStagesDataById
  );

  // Load from localStorage on mount
  useEffect(() => {
    const storedSelected = sessionStorage.getItem("selectedValues");
    if (storedSelected) {
      const parsed = JSON.parse(storedSelected);
      setSelectedValues(parsed);
      const restoredPayload: any = {};
      Object.entries(parsed).forEach(([key, val]: any) => {
        restoredPayload[key] =
          typeof val === "object" && val !== null ? val.label : val;
      });
      setFilterPayload(restoredPayload);
    }
  }, []);

  const { isLoading: isLoadingForSearchedLeads } = useSelector((state: RootState) => state.getsearchedLeads);

  useEffect(() => {
    if (isLoadingForSearchedLeads) {
      setFilterPayload({});
      setSelectedValues({});
      sessionStorage.removeItem("filterpayload");
      sessionStorage.removeItem("selectedValues");
    }
  }, [isLoadingForSearchedLeads])

  // Save to localStorage when filterpayload/selectedValues change
  useEffect(() => {
    sessionStorage.setItem("filterpayload", JSON.stringify(filterpayload));
    sessionStorage.setItem("selectedValues", JSON.stringify(selectedValues));
  }, [filterpayload, selectedValues]);

  const handleMenuOpen = (name: string) => {
    if (name === "currentLeadStageDisplayName") {
      dispatch(getLeadStageValues());
    } else if (name === "currentLeadSubStageDisplayName") {
      dispatch(
        getleadSubStagesById(
          selectedValues.currentLeadStageDisplayName?.value
        )
      );
    } else if (name === "leadSourceDescription") {
      dispatch(getLeadSourceValues());
    } else if (name === "currentSalesrepFullName") {
      dispatch(getOwnerValues());
    } else if (name === "applicationStatusName") {
      dispatch(getApplicationStatusValues());
    } else if (name === "academicCareerDescription") {
      store.dispatch(getAcademicCareerValues());
    }
  };

  const handleFilterChange = (
    name: string,
    selectedOption: { value: string; label: string } | null
  ) => {
    store.dispatch(resetsearchedLeads());
    store.dispatch(setSearchQuery(""));
    setFilterPayload((prev: any) => {
      const updated = { ...prev };
      if (!selectedOption) delete updated[name];
      else updated[name] = selectedOption.label;
      return updated;
    });
    setSelectedValues((prev) => ({ ...prev, [name]: selectedOption }));

    if (selectedOption && name === "currentLeadSubStageDisplayName") {
      dispatch(getleadSubStagesById(selectedOption.value));
    }
    if (selectedOption && name === "academicCareerDescription") {
      dispatch(getApByCareerId(selectedOption.value));
    }
  };


  const handleDateChange = (name: string, value: string) => {
    store.dispatch(resetsearchedLeads());
    store.dispatch(setSearchQuery(""));
    setFilterPayload((prev: any) => {
      const updated = { ...prev };
      if (!value) delete updated[name];
      else updated[name] = value;
      return updated;
    });
    setSelectedValues((prev) => ({ ...prev, [name]: value }));
  };

  const resetFilters = () => {
    store.dispatch(resetsearchedLeads());
    store.dispatch(setSearchQuery(""));
    setFilterPayload({});
    setSelectedValues({});
    sessionStorage.removeItem("filterpayload");
    sessionStorage.removeItem("selectedValues");
  };



  useEffect(() => {
    if (Object.keys(userDetails).length !== 0 && searchQuery === "") {
      const isSalesRepUser = !userDetails?.authority?.some(
        (role: string) => role === "ROLE_ADMIN" || role === "ROLE_MANAGER"
      );
      const payload =
        Object.keys(filterpayload).length > 0
          ? isSalesRepUser
            ? { currentSalesrepFullName: fullName, ...filterpayload, pageSize: paginatedProps.pageSize, pageNumber: paginatedProps.pageNumber }
            : { currentSalesrepFullName: fullName, ...filterpayload, pageSize: paginatedProps.pageSize, pageNumber: paginatedProps.pageNumber }
          : { currentSalesrepFullName: fullName, pageSize: paginatedProps.pageSize, pageNumber: paginatedProps.pageNumber };
      dispatch(getPaginatedLeads(payload));
    }
  }, [filterpayload, userDetails, paginatedProps, searchQuery]);

  const closeModalForHamburger: () => void = () => dispatch(onDisableModalForHamburger());

  const handleRefresh = () => {
    if (Object.keys(userDetails).length !== 0) {
      store.dispatch(resetsearchedLeads());
      store.dispatch(setSearchQuery(""));
      const isSalesRepUser = !userDetails?.authority?.some(
        (role: string) => role === "ROLE_ADMIN" || role === "ROLE_MANAGER"
      );
      const payload =
        Object.keys(filterpayload).length > 0
          ? isSalesRepUser
            ? { currentSalesrepFullName: fullName, ...filterpayload, pageSize: paginatedProps.pageSize, pageNumber: paginatedProps.pageNumber }
            : { currentSalesrepFullName: fullName, ...filterpayload, pageSize: paginatedProps.pageSize, pageNumber: paginatedProps.pageNumber }
          : { currentSalesrepFullName: fullName, pageSize: paginatedProps.pageSize, pageNumber: paginatedProps.pageNumber };
      dispatch(getPaginatedLeads(payload));
    }
  }

  return (
    <>
      <div className="px-3 py-2">
        <div className="flex flex-wrap gap-3">
          {inputData.map((field) => {
            if (field.type === "select") {
              const options =
                field.name === "currentLeadStageDisplayName"
                  ? optionForLeadStages
                  : field.name === "currentLeadSubStageDisplayName"
                    ? optionForLeadSubStages.length > 0
                      ? optionForLeadSubStages
                      : [{ label: "No data", value: "" }]
                    : field.name === "leadSourceDescription"
                      ? optionForLeadSource
                      : field.name === "currentSalesrepFullName"
                        ? responseForOwner
                        : field.name === "applicationStatusName"
                          ? responseForApplicationStatus
                          : field.name === "academicCareerDescription"
                            ? careerOptions
                            : field.name === "academicProgramDescription"
                              ? programOptions
                              : [];

              const loading =
                field.name === "currentLeadSubStageDisplayName"
                  ? isLoadingForLeadStage
                  : field.name === "currentLeadSubStageDisplayName"
                    ? isLoadingForLeadSubStage
                    : field.name === "leadSourceDescription"
                      ? isLoadingForLeadSource
                      : field.name === "currentSalesrepFullName"
                        ? isLoadingForOwner
                        : field.name === "applicationStatusName"
                          ? isLoadingForApplicationStatus
                          : field.name === "academicCareerDescription"
                            ? isLoadingForCareer
                            : field.name === "academicProgramDescription"
                              ? isLoadingForProgram
                              : false;

              return (
                <div key={field.id} className="flex flex-col gap-y-1">
                  <label className="text-xs font-medium pl-[1px]">
                    {field.label}
                  </label>
                  <Select
                    className="min-w-[165px]"
                    options={options}
                    value={selectedValues[field.name] || null}
                    onChange={(option) =>
                      handleFilterChange(field.name, option)
                    }
                    isLoading={loading}
                    isSearchable
                    onMenuOpen={() => handleMenuOpen(field.name)}
                    isClearable
                    isDisabled={
                      field.name === "currentSalesrepFullName" &&
                      !userDetails?.authority?.some((role: string) =>
                        ["ROLE_ADMIN", "ROLE_MANAGER"].includes(role)
                      )
                    }
                    styles={{
                      control: (base) => ({
                        ...base,
                        minHeight: "27px",
                        height: "27px",
                        padding: "0 5px",
                      }),
                      placeholder: (base) => ({ ...base, fontSize: "13px" }),
                      valueContainer: (base) => ({
                        ...base,
                        padding: "0 5px",
                        fontSize: "12px",
                      }),
                      input: (base) => ({
                        ...base,
                        margin: "0px",
                        padding: "0px",
                      }),
                      indicatorsContainer: (base) => ({
                        ...base,
                        height: "27px",
                      }),
                    }}
                  />
                </div>
              );
            } else if (field.type === "date") {
              return (
                <div
                  key={field.id}
                  className="flex min-w-[150px] flex-col gap-y-1"
                >
                  <label className="text-xs font-medium pl-[1px]">
                    {field.label}
                  </label>
                  <input
                    type="date"
                    name={field.name}
                    className="border min-w-[165px] border-[#c9cccd] focus:outline-none focus:border-gray-400 rounded-[0.26rem] px-[6px] py-[1.7px] text-gray-600 text-sm"
                    value={selectedValues[field.name] || ""}
                    onChange={(e) =>
                      handleDateChange(field.name, e.target.value)
                    }
                  />
                </div>
              );
            }
            return null;
          })}


        </div>
        <div className="flex gap-3 items-center justify-end mt-2">
          <div className="">
            {Object.keys(filterpayload).length > 0 && (
              <button
                onClick={resetFilters}
                className="bg-red-500 text-white px-[9px] py-[1.5px] rounded text-nowrap"
              >
                Reset Filters
              </button>
            )}
          </div>

          <div className=" flex justify-end cursor-pointer" onClick={handleRefresh}>
            <HiOutlineRefresh className="text-xl" />
          </div>
        </div>

        <Tooltip anchorSelect=".column" place="left" className="custom-tooltip">
          <div className="tooltip-content">
            Click to manage table columns.
            <br />
            Select checkboxes to add or remove columns dynamically.
          </div>
        </Tooltip>
      </div>

      {isHamburgerModalOpen && (
        <CustomModal
          isMode="testAction"
          isShowModal={isHamburgerModalOpen}
          onHideModal={closeModalForHamburger}
          data={hamburgerModalData}
        >
          <ManageHamburgerColumn />
        </CustomModal>
      )}
    </>
  );
};

export default FilterHeadV1;
