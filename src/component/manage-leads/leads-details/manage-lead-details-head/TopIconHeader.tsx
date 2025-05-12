import React from "react";
import store from "../../../../store";
import { TopIconHeaderData } from "../../../../data/manage-leads/leadDetails-data";
import { onDrawrOpenHandler, onGetHeaderTabIconsName, onSetOpenModalForChangeStage } from "../../../../store/ui/ui-slice";

const TopIconHeader: React.FC = () => {
  const dispatch = store.dispatch;
  const onIconHandler = (name: string) => {
    dispatch(onGetHeaderTabIconsName(name));
    dispatch(onDrawrOpenHandler());
  };

  return (
    <>
      <div className="mt-3 sm:mt-0 sm:ml-auto flex gap-2 flex-wrap">
        {TopIconHeaderData.map((element: any) => (
          <button
            className="border border-gray-300 px-2 py-1 rounded text-sm"
            key={element.id}
            onClick={
              element?.name === "Note" || element?.name === "Tasks" || element?.name === "Upload Docs" || element?.name === "Activity"
                ? onIconHandler.bind({}, element.name)
                : element?.name === "Change Stage"
                ? () => store.dispatch(onSetOpenModalForChangeStage())
                : undefined
            }
          >
            <div className="flex items-center gap-x-1">
              {element?.icon}
              {element?.name}
            </div>
          </button>
        ))}
      </div>
      {/* <TopHeaderTabsActions /> */}
    </>
  );
};

export default TopIconHeader;
