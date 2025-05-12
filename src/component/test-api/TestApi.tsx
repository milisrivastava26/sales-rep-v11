import React from "react";
import { CustomDetailsTable } from "../../util/custom/leadsFormat/CustomDetailsTable";
import { testApiData } from "../../data/test-api-data";
import TestApiColumn from "./TestApiColumn";
import NavbarThirdParty from "../third-party-components/NavbarThirdParty";

const TestApi: React.FC = () => {
  const columns = TestApiColumn();
  return (
    <>
      <NavbarThirdParty />
      <div className="mt-5 px-5">
        <CustomDetailsTable
          columns={columns}
          data={testApiData}
          isMode="testApi"
        />
      </div>
    </>
  );
};

export default TestApi;
