import ThirdPartyFilter from "./ThirdPartyFilter";
import SectionHeadForThirdParty from "./SectionHeadForThirdParty";
import ViewFilterThirdPartyData from "./ViewFilterThirdPartyData";
import Search from "../../util/custom/customSearchPagination/Search";
import Pagination from "../../util/custom/customSearchPagination/Pagination";

interface tyeoFor {
  loaderVal: any;
  resValue: any;
  actionVal: () => {}
}
const ThirdPartyHome: React.FC<tyeoFor> = ({ loaderVal, resValue, actionVal }) => {
  return (
    <div className="home__contianer">
      <div className="my-4 mx-3 sm:mx-5 px-3 py-3 sm:px-6 sm:py-6 shadow-md rounded-md bg-white">
        <div className="overflow-x-auto">
          {/* Section Head */}
          <SectionHeadForThirdParty />
          <div className="relative flex gap-10 items-center -mt-8 top-8 ">
            {/* <TableHead isMode={"thirdParty"} /> */}
            <Search />
            <Pagination />
          </div>
          <div className="overflow-x-auto  pt-10">
            <ThirdPartyFilter actionVal={actionVal} />
            <div className={`w-full`}>
              <ViewFilterThirdPartyData loaderVal={loaderVal} resValue={resValue} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThirdPartyHome;
