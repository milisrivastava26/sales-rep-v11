import React from "react";
import { Table } from "antd";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { RootState } from "../../../../store";
import { useSelector } from "react-redux";


interface propsType {
  leadEnquiryId: string;
}

const ViewLeadStepStatusAndFee: React.FC<propsType> = ({leadEnquiryId}) => {

   const { responseOfLeadEnquiryDetailsById } = useSelector((state: RootState) => state.getLeadEnquiryDetailsDataById);
  const activeEnquiry = Array.isArray(responseOfLeadEnquiryDetailsById)
  ? responseOfLeadEnquiryDetailsById.filter(
      (item: any) => item.leadEnquiryId === leadEnquiryId
    )
  : [];
  // Columns for Steps Table
  const stepsColumns = [
    {
      title: "Step Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: boolean) =>
        status ? (
          <CheckCircleOutlined style={{ color: "green", fontSize: "18px" }} />
        ) : (
          <CloseCircleOutlined style={{ color: "red", fontSize: "18px" }} />
        ),
    },
  ];

  return (
    <div className="flex flex-col md:flex-row gap-6 px-6 pb-6">
      {/* Steps Table */}
      <div className="w-full ">
        <h3 className="text-lg font-semibold mb-3">Application Progress</h3>
        <Table
          columns={stepsColumns}
          dataSource={activeEnquiry[0].leadApplicationStatusDTOS}
          pagination={false}
          rowKey="name"
          size="small"
          bordered
        />
      </div>
    </div>
  );
};

export default ViewLeadStepStatusAndFee;
