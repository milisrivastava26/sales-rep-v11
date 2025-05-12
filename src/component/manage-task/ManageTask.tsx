import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import {
    dropdownOptionsForTask,
    formInputSchemaForManageTask,
    initialValuesForManageTask,
    validationSchemaForManageTask,
} from '../../data/manage-task-data';

import { emptyDataIcon } from '../../data/savgIcons';
import store, { RootState } from '../../store';
import { getFilteredTaskDetails } from '../../store/manage-task/get-filtered-task-slice';

import ManageTaskFilter from './ManageTaskFilter';
import { ManageTaskColumn } from './ManageTaskColumn';
import { CustomDetailsTable } from '../../util/custom/leadsFormat/CustomDetailsTable';
import LoadingSpinner from '../../util/custom/ui/LoadingSpinner';
import Fallback from '../../util/custom/ui/Fallback';
import Search from '../../util/custom/customSearchPagination/Search';
import Pagination from '../../util/custom/customSearchPagination/Pagination';
import { RiArrowDropDownFill } from 'react-icons/ri';
import { bulkUpdateTaskCompletion } from '../../store/actions/bulk-updateTask-completion-status-slice';
import toast from 'react-hot-toast';
import CustomModal from '../../util/custom/ui/CustomModal';
import { bulkChangeOwnerData } from '../../data/bulk-changeOwner-data';
import { changeStageData } from '../../data/change-stage-data';
import { onDisableModalForChangeStage, onDisableModalForTestAction, onSetOpenModalForChangeStage, onShowModalForTestAction } from '../../store/ui/ui-slice';
import BulkChangeOwner from '../manage-leads/genral/BulkChangeOwner';
import ChangeStage from '../manage-leads/genral/ChangeStage';

const ManageTask: React.FC = () => {
    const { filteredTasks, isLoading } = useSelector(
        (state: RootState) => state.getFilteredTask
    );

    const { getLeadsForManageTask, isShowModalForChangeStage, isShowModalForTestAction } = useSelector((state: RootState) => state.ui);
    const closeModalForTestAction = () => store.dispatch(onDisableModalForTestAction());
    const closeModalForChangeStage = () =>
        store.dispatch(onDisableModalForChangeStage());
    const onSubmitHandler = (values: any) => {
        const filterPayload = Object.fromEntries(
            Object.entries(values).filter(
                ([_, val]) => val !== "" && val !== null && val !== undefined
            )
        );

        store.dispatch(getFilteredTaskDetails(filterPayload));
    };

    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicked outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(e.target as Node)
            ) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleActionClick = (id: any) => {
        if (id === 1) {
            if (getLeadsForManageTask.length === 0) {
                toast.error("Please select atleast one lead");
            } else {
                let leadScheduledTaskIds: Array<number> = [];
                getLeadsForManageTask.forEach((item: any) => {
                    leadScheduledTaskIds.push(item.leadScheduledTaskId);
                });

                const bulkUpdateData = {
                    leadScheduledTaskIds,
                    completed: true,
                };

                store.dispatch(bulkUpdateTaskCompletion(bulkUpdateData));
            }
        }
        else if (id === 2) {
            store.dispatch(onShowModalForTestAction());
        }
        else {
            store.dispatch(onSetOpenModalForChangeStage());
        }
    };

    return (
        <div className='bg-white py-6 h-screen overflow-x-hidden'>
            <div className='flex justify-between items-center mr-5'>

                <h3 className="text-base sm:text-[22px] font-medium px-6">Manage Task</h3>
                <div className="flex justify-center items-center gap-x-2 -mt-2">
                    <div ref={dropdownRef} className="relative pl-4">
                        <button
                            onClick={() => setIsOpen((prev) => !prev)}
                            className="flex items-center gap-1 px-4 py-1.5 bg-white border border-gray-300 font-medium rounded text-sm text-gray-700 hover:bg-gray-100 shadow-sm w-[190px]"
                        >
                            More Action
                            <RiArrowDropDownFill size={20} className="text-gray-600" />
                        </button>

                        {isOpen && (
                            <div className="absolute left-4 mt-2 w-48 bg-white border rounded shadow-md z-10">
                                {dropdownOptionsForTask.map((item: any) => (
                                    <button
                                        key={item.id}
                                        onClick={() => {
                                            handleActionClick(item.id);
                                            setIsOpen(false);
                                        }}
                                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        {item.name}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className='px-6 pt-4'>
                <hr />
            </div>
            <div className='flex justify-between gap-10 items-center px-6 mt-4'>
                <Search />
                <Pagination />
            </div>
            <div className="py-4 my-2 bg-gray-100 px-8">
                <ManageTaskFilter
                    inputSchema={formInputSchemaForManageTask}
                    initialValues={initialValuesForManageTask}
                    validationSchema={validationSchemaForManageTask}
                    onSubmit={onSubmitHandler}
                />
            </div>

            {isLoading && (
                <LoadingSpinner
                    centered={false}
                    mainLoading={false}
                    message="Loading Tasks"
                    size={25}
                />
            )}

            {!isLoading && filteredTasks.length === 0 && (
                <Fallback
                    isCenter={true}
                    errorInfo="Please Select Some Filters"
                    icon={emptyDataIcon}
                />
            )}

            {!isLoading && filteredTasks.length > 0 && (
                <div className='px-6 mt-5 overflow-x-auto'>
                    <CustomDetailsTable
                        data={filteredTasks}
                        columns={ManageTaskColumn}
                        isMode="manageTask"
                    />
                </div>
            )}

            {isShowModalForTestAction && (
                <CustomModal
                    isMode="testAction"
                    isShowModal={isShowModalForTestAction}
                    onHideModal={closeModalForTestAction}
                    data={bulkChangeOwnerData}
                >
                    <BulkChangeOwner onHideModal={closeModalForTestAction} isMode="manageTask"/>
                </CustomModal>
            )}
            {isShowModalForChangeStage && (
                <CustomModal
                    isMode="testAction"
                    isShowModal={isShowModalForChangeStage}
                    onHideModal={closeModalForChangeStage}
                    data={changeStageData}
                >
                    <ChangeStage
                        onHideModal={closeModalForChangeStage}
                        isMode="manageTask"
                    />
                </CustomModal>
            )}
        </div>
    );
};

export default ManageTask;
