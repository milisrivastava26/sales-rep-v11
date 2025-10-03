import React, { useEffect, useState, useCallback, useRef } from "react";
import store, { RootState } from "../../../store";
import { useSelector } from "react-redux";
import { getsearchedLeads, resetsearchedLeads } from "../../../store/pagination-v1/get-searched-leads-slice";
import { setSearchQuery } from "../../../store/ui/ui-slice";
import { debounce } from "lodash";
import { getAutocompleteResults } from "../../../store/pagination-v1/get-autocomplete-lead-slice";

const SearchV2: React.FC = () => {
  const { paginatedProps } = useSelector((state: RootState) => state.ui);
  const { searchQuery } = useSelector((state: RootState) => state.ui);
  const { userDetails } = useSelector((state: RootState) => state.getLoggedInUserData);

  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);

  const wrapperRef = useRef<HTMLDivElement>(null); // ref for click outside
  const fullName = userDetails?.fullName;

  // ✅ Autocomplete API call
  const fetchAutocomplete = (query: string) => {
    if (query.trim().length >= 3) {
      store.dispatch(getAutocompleteResults(query)).then((res: any) => {
        const data = res?.payload;

        // Ensure suggestions is always an array
        if (Array.isArray(data) && data.length > 0) {
          setSuggestions(data);
          setShowSuggestions(true);
          setHighlightedIndex(-1);
        } else if (typeof data === "string" && data.trim() !== "") {
          setSuggestions([data]);
          setShowSuggestions(true);
          setHighlightedIndex(-1);
        } else {
          setSuggestions([]);
          setShowSuggestions(false);
        }
      });
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const debouncedAutocomplete = useCallback(debounce(fetchAutocomplete, 500), [fullName]);

  // ✅ Search API call
  const fetchSearchResults = (query: string) => {
    if (!query.trim()) return;
    const role = userDetails?.authority?.includes("ROLE_ADMIN") ? "ROLE_ADMIN" : "ROLE_USER";

    const payload = {
      salesrepname: fullName,
      query: query.trim(),
      page: paginatedProps.pageNumber,
      size: paginatedProps.pageSize,
      role: role,
    };
    store.dispatch(getsearchedLeads(payload));
    setShowSuggestions(false);
    setHighlightedIndex(-1);
  };

  // ✅ Input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    store.dispatch(setSearchQuery(value));
    debouncedAutocomplete(value);
  };

  // ✅ Enter + arrow navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (highlightedIndex >= 0 && highlightedIndex < suggestions.length) {
        handleSuggestionClick(suggestions[highlightedIndex]);
      } else {
        fetchSearchResults(searchQuery);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) => (suggestions.length > 0 ? (prev + 1) % suggestions.length : -1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) => (suggestions.length > 0 ? (prev - 1 + suggestions.length) % suggestions.length : -1));
    }
  };

  // ✅ Click on suggestion
  const handleSuggestionClick = (suggestion: string) => {
    store.dispatch(setSearchQuery(suggestion));
    fetchSearchResults(suggestion);
  };

  // ✅ Reset when query is empty
  useEffect(() => {
    if (searchQuery === "") {
      store.dispatch(resetsearchedLeads());
      setSuggestions([]);
      setShowSuggestions(false);
      setHighlightedIndex(-1);
    }
  }, [searchQuery]);

  // ✅ Click outside detection
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
        setHighlightedIndex(-1);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={wrapperRef} className="relative flex flex-col w-full">
      <div className="flex items-center gap-2 py-4 rounded-md w-full">
        <input type="text" value={searchQuery} onChange={handleChange} onKeyDown={handleKeyDown} placeholder="Search..." className="flex-1 px-3 py-2 border rounded-md text-sm" />
        <button onClick={() => fetchSearchResults(searchQuery)} className="px-4 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
          Search
        </button>
      </div>

      {/* ✅ Autocomplete dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <ul className="absolute top-full left-0 w-full bg-white border rounded-md shadow-md z-10 max-h-60 overflow-y-auto">
          {suggestions.map((suggestion, idx) => (
            <li
              key={idx}
              onClick={() => handleSuggestionClick(suggestion)}
              className={`px-3 py-2 cursor-pointer text-sm ${highlightedIndex === idx ? "bg-blue-100" : "hover:bg-gray-200"}`}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchV2;
