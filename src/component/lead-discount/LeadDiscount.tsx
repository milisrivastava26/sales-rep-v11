import React, { useState } from "react";

import { ConfigProvider, Tabs } from "antd";
import ProcessedDataTable from "./table/ProcessedDataTable";
import UnprocessedDataTable from "./table/UnprocessedDataTable";

export interface SelectedRowPayload {
  employeeId: number;
  amount: number;
  transactionType: string;
  captureId: string;
}
const LeadDiscount: React.FC = () => {
  const [activeKey, setActiveKey] = useState("1");
  const items = [
    {
      key: "1",
      label: "Unprocessed Data",
      children: <UnprocessedDataTable />,
      destroyInactiveTabPane: true,
    },
    {
      key: "2",
      label: "Processed Data",
      children: <ProcessedDataTable />,
      destroyInactiveTabPane: true,
    },
  ];
  return (
    <div className="my-4 mx-3 sm:mx-5 px-3 py-3 sm:px-6 sm:py-6 shadow-md rounded-md bg-white">
      <div className="flex gap-x-1 justify-between items-center">
        <h3 className="text-base sm:text-[22px] font-medium">Manage Lead Discount</h3>
      </div>
      <div className="overflow-x-auto">
        <div className="overflow-hidden pt-2">
          <div className="py-2">
            <ConfigProvider
              theme={{
                token: {
                  colorPrimary: "#0E2F46",
                },
              }}
            >
              <Tabs
                activeKey={activeKey}
                onChange={(key) => setActiveKey(key)}
                defaultActiveKey={"1"}
                items={items}
                renderTabBar={(props, DefaultTabBar) => (
                  <DefaultTabBar
                    {...props}
                    className="
              !border-none 
              [&_.ant-tabs-nav::before]:!border-none
              [&_.ant-tabs-tab]:!text-sm 
              [&_.ant-tabs-tab]:!text-gray-500 
              [&_.ant-tabs-tab]:!px-3 
              [&_.ant-tabs-tab]:!py-2 
              [&_.ant-tabs-tab[aria-selected='true']_.ant-tabs-tab-btn]:!text-[#0E2F46] 
              [&_.ant-tabs-tab[aria-selected='true']_.ant-tabs-tab-btn]:!font-semibold 
              [&_.ant-tabs-ink-bar]:!bg-[#0E2F46]
            "
                  />
                )}
              />
            </ConfigProvider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadDiscount;
