import React from "react";
import ManageLeadsTableV1 from "./table/ManageLeadsTableV1";
import LeadExistModal from "../../util/custom/ui/LeadExistModal";

const ManageLeadsV1: React.FC = () => {

  return (
    <>
      <ManageLeadsTableV1 />

      {/* this modal will open only if same lead will registered */}
      <div>
        <LeadExistModal />
      </div>
    </>
  );
};

export default ManageLeadsV1;
