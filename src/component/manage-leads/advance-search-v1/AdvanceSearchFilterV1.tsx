import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CheckboxSection } from "./CheckboxSection";
import { filterConfig } from "../../../data/manage-leads/advance-search-v1-data";
import store, { AppDispatch, RootState } from "../../../store";

import { getLeadSubStagesForAdvanceSearch } from "../../../store/advance-search-v1/leadSubStagesForAdvanceSearchSlice";
import { getCityRowWiseByStateId } from "../../../store/lead-attribute-update/get-CityRowWise-byStateId-slice";
import { getAcademicProgramForAdvanceSearch } from "../../../store/advance-search-v1/get-academic-program-for-advance-search";
import { fetchAdvancedSearchedLead } from "../../../store/advance-search-v1/get-advanced-searched-lead-slice";

const filterKeyMap: Record<string, string> = {
  state: "stateName",
  city: "cityName",
  academicProgram: "academicProgramDescription",
  leadStage: "currentLeadStageDisplayName",
  leadSubStage: "currentLeadSubStageDisplayName",
  owner: "currentSalesrepFullName",
  leadSource: "leadPrimarySource",
  application_status: "applicationStatusName",
  academicCareer: "academicCareerDescription",
  leadCaptureId: "leadCaptureId",
  phone: "phone"
} as const;

interface FilterProps {
  onClose: () => void;
}
const AdvanceSearchFilterV1: React.FC<FilterProps> = ({ onClose }) => {
  const dispatch = useDispatch<AppDispatch>();

  // ============================
  // TAG STATES
  // ============================
  const [leadCaptureTags, setLeadCaptureTags] = useState<string[]>([]);
  const [leadCaptureIdInput, setLeadCaptureIdInput] = useState("");
  const [phoneTags, setPhoneTags] = useState<string[]>([]);
  const [phoneInput, setPhoneInput] = useState("");

  // ============================
  // ACCORDION STATES
  // ============================
  const [leadCaptureAccordionOpen, setLeadCaptureAccordionOpen] = useState(true);
  const [phoneAccordionOpen, setPhoneAccordionOpen] = useState(true);

  const [selectedMap, setSelectedMap] = useState<Record<string, any>>({
    state: [],
    city: {},
    leadStage: [],
    leadSubStage: {},
    leadSource: [],
    owner: [],
    academicCareer: [],
    academicProgram: {},
    application_status: [],
    leadCaptureId: [],
    phone: [],
  });

  const safeSlice = (slice: any) => (slice ? slice : []);

  const slices = {
    state: safeSlice(
      useSelector((state: RootState) => state.getAllStatesData.responseForState)
    ),
    city: useSelector(
      (state: RootState) =>
        state.getCityRowWiseByStateId.CityRowWiseDataByStateId
    ),
    academicCareer: safeSlice(
      useSelector(
        (state: RootState) =>
          state.getAllAcademicCareer.responseForFilterHeadAcademicCareer
      )
    ),
    academicProgram: useSelector(
      (state: RootState) =>
        state.getAcademicProgramForAdvanceSearch.dataByCareerId
    ),
    leadStage: safeSlice(
      useSelector(
        (state: RootState) => state.leadStageValues.responseForLeadStage
      )
    ),
    leadSubStage: useSelector(
      (state: RootState) =>
        state.leadSubStageForAdvanceSearch.dataByLeadStageId
    ),
    owner: safeSlice(
      useSelector((state: RootState) => state.getAllOwner.responseForOwner)
    ),
    leadSource: safeSlice(
      useSelector(
        (state: RootState) =>
          state.getAllLeadSoursesData.responseofLeadSourceAdvanceSearch
      )
    ),
    application_status: safeSlice(
      useSelector(
        (state: RootState) =>
          state.getAllApplicationStatus.responseForApplicationStatus
      )
    ),
  };

  type SliceKey = keyof typeof slices;

  // Parent fetch
  useEffect(() => {
    filterConfig.forEach((cfg) => {
      if (!cfg.dependsOn && typeof cfg.fetchThunk === "function") {
        dispatch(cfg.fetchThunk());
      }
    });
  }, [dispatch]);

  // City fetch
  useEffect(() => {
    selectedMap.state.forEach((stateId: number) => {
      if (!slices.city[stateId]) {
        dispatch(getCityRowWiseByStateId({ stateId, index: stateId }));
      }
    });
  }, [selectedMap.state, slices.city, dispatch]);

  // Programs fetch
  useEffect(() => {
    selectedMap.academicCareer.forEach((careerId: number) => {
      if (!slices.academicProgram[careerId]) {
        dispatch(getAcademicProgramForAdvanceSearch({ careerId }));
      }
    });
  }, [selectedMap.academicCareer, slices.academicProgram, dispatch]);

  // Substage fetch
  useEffect(() => {
    selectedMap.leadStage.forEach((stageId: number) => {
      if (!slices.leadSubStage[stageId]) {
        dispatch(getLeadSubStagesForAdvanceSearch({ leadStageId: stageId }));
      }
    });
  }, [selectedMap.leadStage, slices.leadSubStage, dispatch]);

  const normalize = (rawData: any[]) => {
    if (!Array.isArray(rawData)) return [];
    return rawData.map((i) => ({
      id: i.id || i.value || i.coreStateId,
      label: i.name || i.label || i.value,
      raw: i,
    }));
  };

  const handleChange = (cfg: any, value: any, parentId?: number) => {
    setSelectedMap((prev) => {
      let next = { ...prev };

      if (cfg.id === "state") {
        const newStateArray = next.state.includes(value)
          ? next.state.filter((x: any) => x !== value)
          : [...next.state, value];

        const updatedCityMap: Record<number, any[]> = {};
        newStateArray.forEach((stId: number) => {
          if (next.city[stId]) updatedCityMap[stId] = next.city[stId];
        });

        next.state = newStateArray;
        next.city = updatedCityMap;
        return next;
      }

      if (cfg.id === "academicCareer") {
        const newCareerArray = next.academicCareer.includes(value)
          ? next.academicCareer.filter((x: any) => x !== value)
          : [...next.academicCareer, value];

        const updatedProgMap: Record<number, any[]> = {};
        newCareerArray.forEach((cId: number) => {
          if (next.academicProgram[cId])
            updatedProgMap[cId] = next.academicProgram[cId];
        });

        next.academicCareer = newCareerArray;
        next.academicProgram = updatedProgMap;

        return next;
      }

      if (cfg.id === "leadStage") {
        const newStageArray = next.leadStage.includes(value)
          ? next.leadStage.filter((x: any) => x !== value)
          : [...next.leadStage, value];

        const updatedSubstageMap: Record<number, any[]> = {};
        newStageArray.forEach((stId: number) => {
          if (next.leadSubStage[stId])
            updatedSubstageMap[stId] = next.leadSubStage[stId];
        });

        next.leadStage = newStageArray;
        next.leadSubStage = updatedSubstageMap;

        return next;
      }

      if (
        (cfg.id === "city" ||
          cfg.id === "academicProgram" ||
          cfg.id === "leadSubStage") &&
        parentId !== undefined
      ) {
        const arr = next[cfg.id][parentId] || [];
        next[cfg.id][parentId] = arr.includes(value)
          ? arr.filter((x: any) => x !== value)
          : [...arr, value];

        return next;
      }

      const arr = next[cfg.id] || [];
      next[cfg.id] = arr.includes(value)
        ? arr.filter((x: any) => x !== value)
        : [...arr, value];

      return next;
    });
  };

  // =========================
  // TAG LOGIC
  // =========================
  const addTag = () => {
    const value = leadCaptureIdInput.trim();
    if (value && !leadCaptureTags.includes(value)) setLeadCaptureTags([...leadCaptureTags, value]);
    setLeadCaptureIdInput("");
  };
  const removeTag = (tag: string) => setLeadCaptureTags(leadCaptureTags.filter(t => t !== tag));
  const handleLeadCaptureKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === "," || e.key === " ") { e.preventDefault(); addTag(); }
  };

  const addPhoneTag = () => {
    const value = phoneInput.trim();
    if (value && !phoneTags.includes(value)) setPhoneTags([...phoneTags, value]);
    setPhoneInput("");
  };
  const removePhoneTag = (tag: string) => setPhoneTags(phoneTags.filter(t => t !== tag));
  const handlePhoneKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === "," || e.key === " ") { e.preventDefault(); addPhoneTag(); }
  };

  // =========================
  // PAYLOAD GENERATION
  // =========================
  const getPayload = () => {
    const filters: Record<string, string[]> = {};
    if (leadCaptureTags.length) filters["leadCaptureId"] = leadCaptureTags;
    if (phoneTags.length) filters["phone"] = phoneTags;

    (Object.keys(selectedMap) as SliceKey[]).forEach(filterId => {
      // if (filterId === "leadCaptureId" || filterId === "phone") return;
      const apiKey = filterKeyMap[filterId]; if (!apiKey) return;
      let selectedIds = selectedMap[filterId];
      if (filterId === "city" || filterId === "academicProgram" || filterId === "leadSubStage") {
        selectedIds = Object.values(selectedIds).flat();
      }
      if (!selectedIds || !selectedIds.length) return;
      const list: string[] = [];
      const rawData = slices[filterId];
      selectedIds.forEach((id: any) => {
        const item = (filterId === "city" || filterId === "academicProgram" || filterId === "leadSubStage")
          ? Object.values(rawData).flat().find((x: any) => x.id === id)
          : rawData?.find((x: any) => x.id === id || x.coreStateId === id);
        if (item) list.push(item.name || item.label || item.value);
      });
      filters[apiKey] = list;
    });
    return { page: 0, size: 1000, filters };
  };
  const payload = getPayload();

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div>
        <h2 className="text-[20px] font-semibold bg-gradient-to-r from-[#1F4E8C] to-[#3A7CC8] bg-clip-text text-transparent">
          Advanced Search Filters
        </h2>
        <p className="text-[#6A6A6A] text-[13px] mt-1">
          Refine results using structured and hierarchical filters.
        </p>
      </div>

      {/* ============ LEAD CAPTURE ACCORDION ============ */}
      <div className="border rounded-xl shadow-sm overflow-hidden">
        <button
          className="w-full flex justify-between items-center px-4 py-3 bg-[#FAFAFA] hover:shadow-md transition"
          onClick={() => setLeadCaptureAccordionOpen(!leadCaptureAccordionOpen)}
        >
          <span className="text-[16px] font-semibold text-[#1F4E8C]">Lead Capture ID</span>
          <span className="text-[16px] text-[#9A9A9A]">{leadCaptureAccordionOpen ? "⌄" : "›"}</span>
        </button>
        {leadCaptureAccordionOpen && (
          <div className="px-4 py-4 bg-white">
            <div className="flex flex-wrap gap-2 mb-2">
              {leadCaptureTags.map(tag => (
                <div key={tag} className="flex items-center bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm transition-all duration-200 hover:scale-105">
                  <span>{tag}</span>
                  <button onClick={() => removeTag(tag)} className="ml-2 text-blue-700 hover:text-red-500">✕</button>
                </div>
              ))}
            </div>
            <input
              type="text"
              value={leadCaptureIdInput}
              onChange={e => setLeadCaptureIdInput(e.target.value)}
              onKeyDown={handleLeadCaptureKeyDown}
              placeholder="Type and press Enter"
              className="w-full border rounded-lg p-2 text-[14px] outline-none focus:ring focus:ring-blue-200"
            />
          </div>
        )}
      </div>

      {/* ============ PHONE ACCORDION ============ */}
      <div className="border rounded-xl shadow-sm overflow-hidden">
        <button
          className="w-full flex justify-between items-center px-4 py-3 bg-[#FAFAFA] hover:shadow-md transition"
          onClick={() => setPhoneAccordionOpen(!phoneAccordionOpen)}
        >
          <span className="text-[16px] font-semibold text-[#1F4E8C]">Phone Number</span>
          <span className="text-[16px] text-[#9A9A9A]">{phoneAccordionOpen ? "⌄" : "›"}</span>
        </button>
        {phoneAccordionOpen && (
          <div className="px-4 py-4 bg-white">
            <div className="flex flex-wrap gap-2 mb-2">
              {phoneTags.map(tag => (
                <div key={tag} className="flex items-center bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm transition-all duration-200 hover:scale-105">
                  <span>{tag}</span>
                  <button onClick={() => removePhoneTag(tag)} className="ml-2 text-blue-700 hover:text-red-500">✕</button>
                </div>
              ))}
            </div>
            <input
              type="text"
              value={phoneInput}
              onChange={e => setPhoneInput(e.target.value)}
              onKeyDown={handlePhoneKeyDown}
              placeholder="Type and press Enter"
              className="w-full border rounded-lg p-2 text-[14px] outline-none focus:ring focus:ring-blue-200"
            />
          </div>
        )}
      </div>

      {/* PARENT ACCORDION */}
      <div className="space-y-4">
        {filterConfig.map(cfg => {
          const options = normalize(slices[cfg.id]);
          if (!options.length) return null;

          return (
            <div key={cfg.id} className="border rounded-xl shadow-sm overflow-hidden">
              <button
                className="w-full flex justify-between items-center px-4 py-3 bg-[#FAFAFA] hover:shadow-md transition"
                onClick={() => document.getElementById(`parent-${cfg.id}`)?.classList.toggle("hidden")}
              >
                <span className="text-[16px] font-semibold text-[#1F4E8C]">{cfg.label}</span>
                <span className="text-[16px] text-[#9A9A9A]">⌄</span>
              </button>

              <div id={`parent-${cfg.id}`} className="hidden px-4 py-4 space-y-4 bg-white">
                <CheckboxSection options={options} selected={selectedMap[cfg.id]} onChange={v => handleChange(cfg, v)} />

                <div className="space-y-3 ml-4">
                  {/* STATE → CITY */}
                  {cfg.id === "state" && selectedMap.state.map((stateId: number) => {
                    const cities = slices.city[stateId] || [];
                    const cityOptions = normalize(cities);
                    if (!cityOptions.length) return null;
                    return (
                      <div key={`city-${stateId}`} className="border rounded-lg bg-[#F7F7F7]">
                        <button
                          className="w-full px-3 py-2 text-[14px] font-medium text-[#1F4E8C] text-left"
                          onClick={() => document.getElementById(`child-city-${stateId}`)?.classList.toggle("hidden")}
                        >
                          Cities under {slices.state.find((s: any) => s.id === stateId)?.name}
                        </button>
                        <div id={`child-city-${stateId}`} className="hidden p-3">
                          <CheckboxSection options={cityOptions} selected={selectedMap.city[stateId] || []} onChange={v => handleChange({ id: "city" }, v, stateId)} />
                        </div>
                      </div>
                    )
                  })}
                  {/* CAREER → PROGRAM */}
                  {cfg.id === "academicCareer" && selectedMap.academicCareer.map((careerId: number) => {
                    const programs = slices.academicProgram[careerId] || [];
                    const programOptions = normalize(programs);
                    if (!programOptions.length) return null;
                    return (
                      <div key={`prog-${careerId}`} className="border rounded-lg bg-[#F7F7F7]">
                        <button className="w-full px-3 py-2 text-[14px] font-medium text-[#1F4E8C] text-left"
                          onClick={() => document.getElementById(`child-prog-${careerId}`)?.classList.toggle("hidden")}>
                          Programs under {slices.academicCareer.find((c: any) => c.id === careerId)?.label}
                        </button>
                        <div id={`child-prog-${careerId}`} className="hidden p-3">
                          <CheckboxSection options={programOptions} selected={selectedMap.academicProgram[careerId] || []} onChange={v => handleChange({ id: "academicProgram" }, v, careerId)} />
                        </div>
                      </div>
                    )
                  })}
                  {/* LEAD STAGE → SUB-STAGE */}
                  {cfg.id === "leadStage" && selectedMap.leadStage.map((stageId: number) => {
                    const subs = slices.leadSubStage[stageId] || [];
                    const subOptions = normalize(subs);
                    if (!subOptions.length) return null;
                    return (
                      <div key={`sub-${stageId}`} className="border rounded-lg bg-[#F7F7F7]">
                        <button className="w-full px-3 py-2 text-[14px] font-medium text-[#1F4E8C] text-left"
                          onClick={() => document.getElementById(`child-sub-${stageId}`)?.classList.toggle("hidden")}>
                          Sub-stages under {slices.leadStage.find((s: any) => s.id === stageId)?.name}
                        </button>
                        <div id={`child-sub-${stageId}`} className="hidden p-3">
                          <CheckboxSection options={subOptions} selected={selectedMap.leadSubStage[stageId] || []} onChange={v => handleChange({ id: "leadSubStage" }, v, stageId)} />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* APPLY BUTTON */}
      <button
        className="bg-[#1F4E8C] text-white py-2.5 rounded-lg w-full text-[14px] font-medium shadow hover:bg-[#19406F] transition-all"
        onClick={() => { store.dispatch(fetchAdvancedSearchedLead(payload)); onClose(); }}
      >
        Apply Filters
      </button>
    </div>
  );
};

export default AdvanceSearchFilterV1;
