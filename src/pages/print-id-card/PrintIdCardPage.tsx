import React, { useEffect } from "react";
import { getMetriculatedLeads } from "../../store/print-id-card/get-metriculated-lead-slice";
import store from "../../store";
import PrintIdCard from "../../component/print-id-card/PrintIdCard";

const PrintIdCardPage: React.FC = () => {
  useEffect(() => {
    store.dispatch(getMetriculatedLeads());
  });
  return (
    <div>
      <PrintIdCard />
    </div>
  );
};

export default PrintIdCardPage;
