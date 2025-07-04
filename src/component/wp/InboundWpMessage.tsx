import React from "react";
import store from "../../store";
import WpNameColumn from "./column/WpNameColumn";
import { CustomTableForOthers } from "../Home/CustomTableForOthers";
import { updateNameWpLead } from "../../store/wp/updateNameWpLead-slice";
import { InboundWhatsappMessage } from "../../store/wp/get-allInboundWhatsappMessages-slice";
import { postWhatsAppAction, updateStatusThunk } from "../../store/wp/manageWp-action-slice";
import WpSearch from "./WpSearch";
import WpPagination from "./WpPagination";

interface typeFor {
  data: any;
}

const InboundWpMessage: React.FC<typeFor> = ({ data }) => {
  const dispatch = store.dispatch;
  const columnsWp = React.useMemo(() => WpNameColumn(handleCreateLead, handleReject), []);

  function handleReject(id: number | string) {
    dispatch(updateStatusThunk({ id, silent: false }))
  }
  function handleCreateLead(allRowsData: InboundWhatsappMessage) {
    const { leadCaptureClientR2nId, name, phone } = allRowsData;

    const wpActionAval = {
      id: leadCaptureClientR2nId,
      payload: {
        name,
        email: "whatsapp@example.com",
        phone,
        leadEnquiryDTOS: [
          {
            coreStateId: 36,
            coreCityId: 4143,
            academicCareerId: 5,
            academicProgramId: 123,
            leadSourceId: 75,
          },
        ],
      }
    }
    dispatch(postWhatsAppAction(wpActionAval) as any);
    // Perform API call or action with the full dataset
  }

  const nameUpdateHandler = (id: string | number, newName: string) => {
    dispatch(updateNameWpLead({ id, newName }))
  }
  return (
    <div>
      <div className="flex items-center justify-between w-full mb-2 gap-10 flex-wrap">
        <div className="flex-1 w-full">
          <WpSearch />
        </div>
        
          <WpPagination />
        
      </div>

      <CustomTableForOthers
        isModeType="wpTable"
        onNameChange={nameUpdateHandler}
        columns={columnsWp}
        data={data || []}
      />
    </div>
  );

};

export default InboundWpMessage;
