import React from "react";
import WindowedSelect from "react-windowed-select";

interface VirtualizedSelectProps {
  options: { label: string; value: string }[];
  value: { label: string; value: string }[];
  onChange: (selected: any) => void;
  placeholder?: string;
  isClearable?: boolean;
  styles?: any;
}

const VirtualizedLeadSelect: React.FC<VirtualizedSelectProps> = ({
  options,
  value,
  onChange,
  placeholder = "Select...",
  isClearable = true,
  styles,
}) => {
  return (
    <WindowedSelect
          options={options}
          value={value}
          onChange={onChange}
          isMulti
          placeholder={placeholder}
          isClearable={isClearable}
          classNamePrefix="react-select"
          styles={styles} 
          windowThreshold={30}    />
  );
};

export default VirtualizedLeadSelect;
