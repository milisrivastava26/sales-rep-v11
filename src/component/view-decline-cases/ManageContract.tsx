import React from "react";
import Classes from "../../util/Global.module.css";
import { RootState } from "../../store";
import { useSelector } from "react-redux";
import DeclinedOfferAnalysisPage from "../../pages/view-decline-cases/DeclinedOfferAnalysisPage";

export interface TableData {
  id: number;
  name: string;
  value: string;
}
const ManageContract: React.FC = () => {

  const {isLoading} = useSelector((state:RootState) => state.getLeadEnquiryDetailsDataById);

  return (
    <section className={`${Classes["container"]} mt-4 px-3 sm:px-6`}>
      {!isLoading && <DeclinedOfferAnalysisPage />}
    </section>
  );
};

export default ManageContract;
