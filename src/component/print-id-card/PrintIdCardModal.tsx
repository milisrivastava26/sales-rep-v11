import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Spin } from "antd";
import IdFront from "./IdFront";
import IdBack from "./IdBack";

const PrintIdCardModal: React.FC = () => {
  const { isLoading } = useSelector((state: RootState) => state.getMetriculatedLeadDetailbyId);

  if (isLoading) {
    return (
      <div className="flex justify-center my-10">
        <Spin tip="Loading..." size="large" />
      </div>
    );
  }

  return (
    <div className="flex justify-center my-10">
      <div className="flex justify-evenly">
        <IdFront />
        <IdBack />
      </div>
    </div>
  );
};

export default PrintIdCardModal;
