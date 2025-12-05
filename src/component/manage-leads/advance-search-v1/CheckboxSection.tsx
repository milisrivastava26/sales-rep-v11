import React, { useState, useMemo } from "react";

interface Option {
  id: string | number;
  label: string;
}

interface CheckboxSectionProps {
  options: Option[];
  selected: (string | number)[];
  onChange: (value: string | number) => void;
}

export const CheckboxSection: React.FC<CheckboxSectionProps> = ({
  options,
  selected,
  onChange,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredOptions = useMemo(() => {
    if (!searchTerm) return options;
    return options.filter((opt) =>
      opt.label.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [options, searchTerm]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full mb-2 px-2 py-1 border rounded text-sm"
      />

      <div className="max-h-60 grid grid-cols-1 sm:grid-cols-2 overflow-y-auto gap-1">
        {filteredOptions?.map((opt) => (
          <label key={opt.id} className="flex gap-2 text-sm items-center">
            <input
              type="checkbox"
              checked={selected.includes(opt.id)}
              onChange={() => onChange(opt.id)}
            />
            <span>{opt.label}</span>
          </label>
        ))}

        {filteredOptions.length === 0 && (
          <div className="col-span-full text-gray-400 text-sm text-center py-2">
            No results found
          </div>
        )}
      </div>
    </div>
  );
};
