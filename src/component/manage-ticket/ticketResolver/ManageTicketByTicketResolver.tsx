import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import store, { RootState } from "../../../store";
import { CustomDetailsTable } from "../../../util/custom/leadsFormat/CustomDetailsTable";
import Search from "../../../util/custom/customSearchPagination/Search";
import Pagination from "../../../util/custom/customSearchPagination/Pagination";
import LoadingSpinner from "../../../util/custom/ui/LoadingSpinner";
import {
  getTicketLeadsDataByUsername,
  resetTicketLeadsResponse,
} from "../../../store/manage-ticket/get-leadTicketData-slice";
import { TicketLeadsColumn } from "../admin/ManageTicketColumn";
import ManageTicketFilter from "../ManageTicketFilter";

const ManageTicketByTicketResolver: React.FC = () => {
  const { userDetails } = useSelector(
    (state: RootState) => state.getLoggedInUserData
  );

  useEffect(() => {
    if (userDetails !== null && userDetails !== undefined) {
      const userName = userDetails.email;
      if (userName !== undefined) {
        const initalPayload = {
          typeId: null,
          subTypeId: null,
          status: null,
          assigneeUserName: userName,
          fromDate: null,
          toDate: null,
        };

        store.dispatch(getTicketLeadsDataByUsername(initalPayload));
      }
    }
  }, [userDetails]);

  const { isLoading, ticketLeadsData } = useSelector(
    (state: RootState) => state.getLeadTicketData
  );

  const onSubmit = (values: any) => {
    const userName = userDetails.email;
    const payload = {
      typeId: values.typeId || null,
      subTypeId: values.subTypeId || null,
      status: values.status || null,
      department: values.department || null,
      assigneeUserName: userName,
      fromDate: values.fromDate || null,
      toDate: values.toDate || null,
    };
    store.dispatch(resetTicketLeadsResponse());
    store.dispatch(getTicketLeadsDataByUsername(payload));
  };

  return (
    <div className="bg-white rounded-lg m-6">
      <div className="p-6">
        <h3 className="text-base sm:text-[22px] font-medium mb-2">
          Manage Tickets
        </h3>
        <hr />
        <div className="flex justify-between gap-10 items-center my-5">
          <Search />
          <Pagination />
        </div>

        <ManageTicketFilter onSubmit={onSubmit} />

        {isLoading ? (
          <div className="flex justify-center items-center py-10">
            <LoadingSpinner
              centered={false}
              mainLoading={true}
              message="Loading..."
              size={20}
            />
          </div>
        ) : ticketLeadsData &&
          Array.isArray(ticketLeadsData) &&
          ticketLeadsData.length > 0 ? (
          <div className="overflow-x-auto">
            <CustomDetailsTable
              columns={TicketLeadsColumn}
              data={ticketLeadsData}
              isMode="manageTicketForResolver"
            />
          </div>
        ) : (
          <div className="flex justify-center items-center py-10">
            <span className="text-gray-500 text-sm">No tickets found</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageTicketByTicketResolver;
