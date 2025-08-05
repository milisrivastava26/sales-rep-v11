import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

function WpPagination() {
  const {
    paginationActions: {
      canPreviousPage,
      canNextPage,
      gotoPage,
      setPageSize,
      previousPage,
      nextPage,
      pageIndex,
      dataLength,
      pageSize,
    },
  } = useSelector((state: RootState) => state.wpTable);

  const pageRange = `${pageIndex * pageSize + 1}-${Math.min(
    (pageIndex + 1) * pageSize,
    dataLength
  )} / ${dataLength}`;

  return (
    <div className="flex gap-2 items-center">
      <div className="flex items-center gap-x-2">
        <label htmlFor="">Size</label>
        <select
          className="border rounded px-1 text-sm py-0.5"
          value={pageSize}
          onChange={(e) => {
            const size = parseInt(e.target.value);
            gotoPage(0); // reset to first page
            setPageSize(size);
          }}
        >
          {[50, 100, 150, 200, 250].map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>

      <div className="flex gap-0 items-center text-sm">
        <button
          className={`px-2 ${!canPreviousPage && "opacity-50 cursor-not-allowed"}`}
          onClick={previousPage}
          disabled={!canPreviousPage}
        >
         <MdKeyboardArrowLeft className="text-3xl"/>
        </button>
        <span>{pageRange}</span>
        <button
          className={`px-2 ${!canNextPage && "opacity-50 cursor-not-allowed"}`}
          onClick={nextPage}
          disabled={!canNextPage}
        >
         <MdKeyboardArrowRight className="text-3xl"/>
        </button>
      </div>
    </div>
  );
}

export default WpPagination;
