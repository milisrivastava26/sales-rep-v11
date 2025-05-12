import { useEffect } from "react";
import { useSelector } from "react-redux";
import store, { RootState } from "../../store";
import Fallback from "../../util/custom/ui/Fallback";
import { emptyDataIcon } from "../../data/savgIcons";
import LoadingSpinner from "../../util/custom/ui/LoadingSpinner";
import InboundWpMessage from "../../component/wp/InboundWpMessage";
import { getAllInboundWhatsappMessages } from "../../store/wp/get-allInboundWhatsappMessages-slice";

const InboundWPMessagesPage: React.FC = () => {
  const dispatch = store.dispatch;
  const { isLoading, responseOfGetAllInboundWhatsappMessages: wpResponse } = useSelector(
    (state: RootState) => state.getAllInboundWhatsappMessagesData
  );
  const { isRunURL1, isRunURL2 } = useSelector((state: RootState) => state.manageWhatsAppActionsData);
  const { isRun } = useSelector((state: RootState) => state.updateNameWpLeadsData);

  useEffect(() => {
    // // console.log("inisde the useEffect ")
    dispatch(getAllInboundWhatsappMessages());
  }, [dispatch, isRunURL1, isRunURL2, isRun]);

  return (
    <div className="my-4 mx-3 sm:mx-5 px-3 py-3 sm:px-6 sm:py-6 shadow-md rounded-md bg-white">
      <h1 className="text-base sm:text-[22px] font-medium mb-5 ">Inbound Whatsapp Messages</h1>
      {isLoading && <LoadingSpinner centered={false} size={20} message="loading.." mainLoading={true} />}
      {!isLoading && wpResponse.length === 0 && <Fallback isCenter={true} errorInfo="Data not found" icon={emptyDataIcon} />}
      {!isLoading && wpResponse.length > 0 && (
        <>
          <InboundWpMessage data={wpResponse} />
        </>
      )}
    </div>
  );
};

export default InboundWPMessagesPage;
