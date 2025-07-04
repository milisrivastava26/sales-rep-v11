import { useSelector } from "react-redux";
import { Fragment } from "react/jsx-runtime";
import { RootState } from "../../store";

const WpSearch: React.FC = () => {
  const {
    filterActions: { globalFilter, setGlobalfilter },
  } = useSelector((state: RootState) => state.wpTable);

  return (
    <Fragment>
      <div className="w-full">
        <input
          className="border border-stroke focus:border-stroke rounded-md px-4 py-1 w-full outline-none dark:bg-form-input dark:border-strokedark"
          value={globalFilter || ""}
          onChange={(e) => {
            setGlobalfilter(e.target.value.trimStart());
          }}
          placeholder="Search..."
        />
      </div>
    </Fragment>
  );
};

export default WpSearch;
