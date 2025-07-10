import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import store, { RootState } from "../../store";
import Select from "react-select";
import { getSuperbotCallbackDetailsBySalesrepName } from "../../store/superbot-details/get-superbotCallbackDetails-slice";
import { CustomDetailsTable } from "../../util/custom/leadsFormat/CustomDetailsTable";
import { SuperbotCallbackColumns } from "./SuperbotCallbackColumns";
import { Spin, Empty } from "antd";
import { IoMdRefresh } from "react-icons/io";
import Search from "../../util/custom/customSearchPagination/Search";
import Pagination from "../../util/custom/customSearchPagination/Pagination";

const SuperbotDetails: React.FC = () => {
    const { isLoading, directions } = useSelector(
        (state: RootState) => state.getSuperbotDirections
    );
    const { userDetails } = useSelector(
        (state: RootState) => state.getLoggedInUserData
    );

    const fullName = userDetails?.fullName;

    const [selectedDirection, setSelectedDirection] = useState<null | {
        label: string;
        value: string;
        id: string;
    }>(null);

    const handleChange = (option: any) => {
        setSelectedDirection(option);
    };

    const {
        isLoading: isLoadingForDetails,
        callbackDetails
    } = useSelector((state: RootState) => state.getSuperbotCallbackDetails);

    useEffect(() => {
        if (fullName !== undefined) {
            const payload = selectedDirection
                ? { userName: fullName, direction: selectedDirection.value }
                : { userName: fullName };

            store.dispatch(getSuperbotCallbackDetailsBySalesrepName(payload));
        }
    }, [selectedDirection, userDetails]);

    const handleRefresh = () => {
        if (fullName !== undefined) {
            const payload = selectedDirection
                ? { userName: fullName, direction: selectedDirection.value }
                : { userName: fullName };

            store.dispatch(getSuperbotCallbackDetailsBySalesrepName(payload));
        }
    }

    return (
        <div className="m-5 bg-white rounded-lg shadow-md h-screen">
            <div className="p-4">
                <h2 className="text-xl font-semibold mb-4">Superbot Details</h2>

                <div className="mb-4 w-full bg-gray-100 p-2 rounded-md">
                    <div className="flex gap-2 items-center w-full">
                        <div><label className="block mb-2 text-sm font-medium text-gray-700">
                            Filter by Direction
                        </label>
                            <Select
                                isLoading={isLoading}
                                options={directions}
                                onChange={handleChange}
                                value={selectedDirection}
                                isClearable={true}
                                placeholder="Select a direction..."
                                className="text-sm w-80"
                                styles={{
                                    control: (base) => ({
                                        ...base,
                                        minHeight: "32px",
                                        height: "32px",
                                        fontSize: "0.875rem",
                                    }),
                                    dropdownIndicator: (base) => ({
                                        ...base,
                                        padding: "4px",
                                    }),
                                    clearIndicator: (base) => ({
                                        ...base,
                                        padding: "4px",
                                    }),
                                    valueContainer: (base) => ({
                                        ...base,
                                        padding: "0px 6px",
                                    }),
                                    input: (base) => ({
                                        ...base,
                                        margin: "0px",
                                        padding: "0px",
                                    }),
                                    option: (base) => ({
                                        ...base,
                                        paddingTop: "4px",
                                        paddingBottom: "4px",
                                        fontSize: "0.875rem",
                                    }),
                                }}
                            /></div>
                        <div onClick={handleRefresh}><IoMdRefresh className="text-xl mt-6 mx-2 cursor-pointer" /></div>
                        {selectedDirection !== null && <button className="text-white mt-7 bg-red-500 hover:bg-red-600 px-4 py-1 text-sm rounded-md font-medium" onClick={() => setSelectedDirection(null)}>Reset</button>}
                    </div>
                </div>

                <div>
                    {isLoadingForDetails ? (
                        <div className="flex justify-center items-center h-64">
                            <Spin tip="Loading data..." size="large" />
                        </div>
                    ) : callbackDetails && callbackDetails.length > 0 ? (
                        <div className="">
                            <div className="flex items-center gap-10 mb-4">
                                <Search />
                                <Pagination />
                            </div>

                            <div className="">
                                <CustomDetailsTable
                                    columns={SuperbotCallbackColumns}
                                    data={callbackDetails}
                                    isMode="superbot"
                                />
                            </div>

                        </div>
                    ) : (
                        <div className="flex justify-center items-center h-64">
                            <Empty description="No data found" />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SuperbotDetails;
