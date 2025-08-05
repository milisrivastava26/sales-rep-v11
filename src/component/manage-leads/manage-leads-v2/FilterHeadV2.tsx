import Select from "react-select";
import { Tooltip } from "react-tooltip";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { InputDataType } from "../../../data/manage-leads/filter-head-data";
import store, { RootState } from "../../../store";
import { transformDataForLeadStagesAndSource, transformDataForLeadSubStages } from "../../../util/actions/transformFilterApiData";
import { getLeadStageValues } from "../../../store/lead-capturing/get-allLeadStage-slice";
import { getleadSubStagesById } from "../../../store/lead-capturing/get-allLeadSubStages-byId-slice";
import { getLeadSourceValues } from "../../../store/lead-capturing/get-allLeadSource-slice";
import { getOwnerValues } from "../../../store/lead-capturing/get-allOwner-slice";
import { getApplicationStatusValues } from "../../../store/lead-capturing/get-allApplicationStatus-slice";
import { getAcademicCareerValues } from "../../../store/get/get-all-academic-career-slice";
import { getApByCareerId } from "../../../store/get/get-all-academic-program-by-academic-career-id-slice";
import { onDisableModalForHamburger } from "../../../store/ui/ui-slice";
import CustomModal from "../../../util/custom/ui/CustomModal";
import { hamburgerModalData } from "../../../data/manage-leads/ManageLeadsData";
import ManageHamburgerColumn from "../table/heads/ManageHamburgerColumn";
import { getPaginatedLeads } from "../../../store/pagination-v1/get-paginatedLead-slice";



interface PropsType {
    inputData: InputDataType[];
    filterpayload: any;
    setFilterPayload: any;
}

const FilterHeadV2: React.FC<PropsType> = ({
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

    const { paginatedProps } = useSelector((state: RootState) => state.ui);


    // Load from localStorage on mount
    useEffect(() => {
        const storedSelected = localStorage.getItem("selectedValues");
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

    // Save to localStorage when filterpayload/selectedValues change
    useEffect(() => {
        localStorage.setItem("filterpayload", JSON.stringify(filterpayload));
        localStorage.setItem("selectedValues", JSON.stringify(selectedValues));
    }, [filterpayload, selectedValues]);

    const handleMenuOpen = (name: string) => {
        if (name === "current_lead_stage_display_name") {
            dispatch(getLeadStageValues());
        } else if (name === "current_lead_sub_stage_display_name") {
            dispatch(
                getleadSubStagesById(
                    selectedValues.current_lead_stage_display_name?.value
                )
            );
        } else if (name === "lead_source_description") {
            dispatch(getLeadSourceValues());
        } else if (name === "current_salesrep_full_name") {
            dispatch(getOwnerValues());
        } else if (name === "application_status_name") {
            dispatch(getApplicationStatusValues());
        } else if (name === "academic_career_description") {
            store.dispatch(getAcademicCareerValues());
        }
    };

    const handleFilterChange = (
        name: string,
        selectedOption: { value: string; label: string } | null
    ) => {
        setFilterPayload((prev: any) => {
            const updated = { ...prev };
            if (!selectedOption) delete updated[name];
            else updated[name] = selectedOption.label;
            return updated;
        });
        setSelectedValues((prev) => ({ ...prev, [name]: selectedOption }));

        if (selectedOption && name === "currentLeadStageDisplay_name") {
            dispatch(getleadSubStagesById(selectedOption.value));
        }
        if (selectedOption && name === "academicCareerDescription") {
            dispatch(getApByCareerId(selectedOption.value));
        }
    };

    const handleDateChange = (name: string, value: string) => {
        setFilterPayload((prev: any) => {
            const updated = { ...prev };
            if (!value) delete updated[name];
            else updated[name] = value;
            return updated;
        });
        setSelectedValues((prev) => ({ ...prev, [name]: value }));
    };

    const resetFilters = () => {
        setFilterPayload({});
        setSelectedValues({});
        localStorage.removeItem("filterpayload");
        localStorage.removeItem("selectedValues");
    };

    useEffect(() => {
        if (Object.keys(userDetails).length !== 0) {
            const isSalesRepUser = !userDetails?.authority?.some(
                (role: string) => role === "ROLE_ADMIN" || role === "ROLE_MANAGER"
            );
            const payload =
                Object.keys(filterpayload).length > 0
                    ? isSalesRepUser
                        ? { currentSalesrepFullName: fullName, ...filterpayload, pageSize: paginatedProps.pageSize, pageNumber: paginatedProps.pageNumber }
                        : {currentSalesrepFullName: fullName, ...filterpayload, pageSize: paginatedProps.pageSize, pageNumber: paginatedProps.pageNumber }
                    : { currentSalesrepFullName: fullName, pageSize: paginatedProps.pageSize, pageNumber: paginatedProps.pageNumber };
            dispatch(getPaginatedLeads(payload));
        }
    }, [filterpayload, userDetails, paginatedProps]);

    const closeModalForHamburger: () => void = () => dispatch(onDisableModalForHamburger());

    return (
        <>
            <div className="flex justify-between items-start px-3 py-2">
                <div className="flex flex-wrap gap-3">
                    {inputData.map((field) => {
                        if (field.type === "select") {
                            const options =
                                field.name === "current_lead_stage_display_name"
                                    ? optionForLeadStages
                                    : field.name === "current_lead_sub_stage_display_name"
                                        ? optionForLeadSubStages.length > 0
                                            ? optionForLeadSubStages
                                            : [{ label: "No data", value: "" }]
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
                                                            : [];

                            const loading =
                                field.name === "current_lead_stage_display_name"
                                    ? isLoadingForLeadStage
                                    : field.name === "current_lead_sub_stage_display_name"
                                        ? isLoadingForLeadSubStage
                                        : field.name === "lead_source_description"
                                            ? isLoadingForLeadSource
                                            : field.name === "current_salesrep_full_name"
                                                ? isLoadingForOwner
                                                : field.name === "application_status_name"
                                                    ? isLoadingForApplicationStatus
                                                    : field.name === "academic_career_description"
                                                        ? isLoadingForCareer
                                                        : field.name === "academic_program_description"
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
                                            field.name === "current_salesrep_full_name" &&
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
                    <div className="mt-[18px]">
                        {Object.keys(filterpayload).length > 0 && (
                            <button
                                onClick={resetFilters}
                                className="bg-red-500 text-white px-[9px] py-[1.5px] rounded text-nowrap"
                            >
                                Reset Filters
                            </button>
                        )}
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

export default FilterHeadV2;
