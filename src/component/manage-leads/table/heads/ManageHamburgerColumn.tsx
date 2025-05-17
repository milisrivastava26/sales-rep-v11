import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import store, { RootState } from "../../../../store";
import { hamburgerModalcolumnData } from "../../../../data/manage-leads/ManageLeadsData";
import { onDisableModalForHamburger, onsetSelectedColumnToDisplay } from "../../../../store/ui/ui-slice";

const LOCAL_STORAGE_KEY = "selectedColumns";

const ManageHamburgerColumn: React.FC = () => {
  const selectedColumnToDisplay = useSelector((state: RootState) => state.ui.selectedColumnToDisplay);

  const getInitialColumns = () => {
    const savedColumns = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || "[]");
    const mergedColumns = [...new Map([...selectedColumnToDisplay, ...savedColumns].map((col) => [col.name, col])).values()];
    return mergedColumns;
  };

  const [selectedColumn, setSelectedcolumn] = useState<Array<any>>(getInitialColumns);

  // const [selectedColumn, setSelectedcolumn] = useState<Array<any>>(selectedColumnToDisplay || []);
  const [showError, setShowerror] = useState(false);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, item: any) => {
    const { checked } = e.target;

    setSelectedcolumn((prev) => {
      if (checked) {
        return prev.some((col) => col.name === item.name) ? prev : [...prev, item];
      }
      return prev.filter((col) => col.name !== item.name);
    });
  };

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(selectedColumn));
    store.dispatch(onsetSelectedColumnToDisplay(selectedColumn));
  }, [selectedColumn]);

  useEffect(() => {
    if (selectedColumn.length < 5) {
      setShowerror(true);
    } else {
      setShowerror(false);
    }
  }, [selectedColumn]);

  const getSelectedColumn = () => {
    if (!showError) {
      store.dispatch(onsetSelectedColumnToDisplay(selectedColumn));
      store.dispatch(onDisableModalForHamburger());
    }
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-2 mx-5">
        {hamburgerModalcolumnData.map((item: any) => (
          <div className="flex gap-2" key={item.id}>
            <input
              type="checkbox"
              value={item.name}
              name={item.name}
              id = {item.id}
              disabled={item.isReadOnly}
              onChange={(e) => handleCheckboxChange(e, item)}
              checked={selectedColumn.some((col: any) => col.name === item.name)}
            />
            <label htmlFor={item.id}>{item.label}</label>
          </div>
        ))}
      </div>
      {showError && <p className="text-red-500 text-sm mx-5 my-3">Please select atleast five column to display</p>}
      <button
        disabled={showError}
        type="submit"
        className={`${showError ? "bg-opacity-50 cursor-not-allowed" : "cursor-pointer"} bg-blue-600 text-white px-4 py-2 rounded absolute bottom-[16px] right-[16px]`}
        onClick={getSelectedColumn}
      >
        Ok
      </button>
    </>
  );
};

export default ManageHamburgerColumn;
