import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import TopHeaderCards from "./TopHeaderCards";
import untouchedLeadsLogo from "../../../assets/home/untouched-leads.png";
import pendingTaskLogo from "../../../assets/home/pendingTask.png";
import scheduledTaskLogo from "../../../assets/home/scheduled-task.png";
import overdueTaskLogo from "../../../assets/home/overdue-task.png";

const TopHomeHeader: React.FC = () => {
  const { isLoading: unTLoader, responseOfGetUntouchedLeads } = useSelector((state: RootState) => state.getUntouchedLeadsData);
  const { isLoading: pendingLoader, responseOfGetTotalPendingTasks } = useSelector((state: RootState) => state.getTotalPendingTasksData);
  const { isLoading: scheduleLoader, responseOfGetTodayPendingTasks } = useSelector((state: RootState) => state.getTodayPendingTasksData);
  const { isLoading: overdueLoader, responseOfGetPreviousPendingTasks } = useSelector((state: RootState) => state.getPreviousPendingTasksData);
  
  const renderContentUntouched = unTLoader ? "Loading..." : responseOfGetUntouchedLeads;
  const renderContentPending = pendingLoader ? "Loading..." : responseOfGetTotalPendingTasks;
  const scheduleContentPending = scheduleLoader ? "Loading..." : responseOfGetTodayPendingTasks;
  const overdueContentPending = overdueLoader ? "Loading..." : responseOfGetPreviousPendingTasks;
  const stocks = [
    { name: "Untouched Leads Count", logo: untouchedLeadsLogo, price: renderContentUntouched, change: "11.01%", isPositive: true },
    { name: "Total Pending Tasks", logo: pendingTaskLogo, price: renderContentPending, change: "9.05%", isPositive: false },
    { name: "Scheduled Tasks for Today", logo: scheduledTaskLogo, price: scheduleContentPending, change: "11.01%", isPositive: true },
    { name: "Overdue Tasks Count", logo: overdueTaskLogo, price: overdueContentPending, change: "11.01%", isPositive: true },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 xl:grid-cols-4 p-3">
      {stocks.map((stock, index) => (
        <TopHeaderCards key={index} {...stock} />
      ))}
    </div>
  );
};

export default TopHomeHeader;
