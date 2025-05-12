import { GoClock } from "react-icons/go";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import { formatTime } from "../../../../util/actions/extractDateAndTime";

const ViewTask: React.FC = () => {
  const { isLoading, leadTaskDetailsDataById: res } = useSelector((state: RootState) => state.getLeadTaskDetailsDataById);

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {!isLoading && !res && <p>data not found</p>}
      {!isLoading && res && (
        <div className="text-gray-500 text-sm pt-2 ml-[15px]">
          <div>
            <p className="break-all">{res?.subject}</p>
          </div>
          <div>
            <p className="break-all">{res?.taskDetails}</p>
          </div>
          <div className="flex gap-x-1 mt-2">
            <div className="flex flex-wrap gap-1 items-center">
              {<GoClock />}
              <p className="font-normal">{res?.scheduledDate}</p>
              <p className="font-normal">{formatTime(res?.scheduledTime)}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ViewTask;
