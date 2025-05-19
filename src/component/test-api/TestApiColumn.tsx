// @ts-nocheck
import { Column } from "react-table";
import store, { RootState } from "../../store";
import { fetchTestApiData } from "../../store/test-api/test-api-slice";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const TestApiColumn = () => {
  const [dataMap, setDataMap] = useState<Record<string, any[]>>({});

  // Define a key you want to fetch data for
  const [key, setKey] = useState("");

  // Use useSelector to access Redux state for that key
  const dataFromRedux = useSelector((state: RootState) => state.testApi[key]);

  // Update the dataMap whenever the data changes
  useEffect(() => {
    if (dataFromRedux) {
      setDataMap((prevState) => ({
        ...prevState,
        [key]: dataFromRedux,
      }));
    }
  }, [dataFromRedux, key]); // Dependency array ensures this runs when data changes

  const handleTest = (url: string, name: string) => {
    setKey(name);
    store.dispatch(
      fetchTestApiData({
        key: name,
        url: url,
      })
    );
  };

  const TestApiColumns: Column<any>[] = [
    {
      Header: "Service Name",
      accessor: "name",
      Cell: ({ row }: { row: { original: any } }) => <span>{row.original.name}</span>,
    },
    {
      Header: "URL",
      accessor: "url",
      Cell: ({ row }: { row: { original: any } }) => (
        <a href={row.original.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
          {row.original.url}
        </a>
      ),
    },
    {
      Header: "Test",
      Cell: ({ row }: { row: { original: any } }) => (
        <button
          className="px-6 py-1 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md"
          onClick={() => handleTest(row.original.url, row.original.name)}
        >
          Test
        </button>
      ),
    },
    {
      Header: "Status",
      Cell: ({ row }: { row: { original: any } }) => <p></p>,
    },
  ];

  // ✅ Return the column configuration
  return TestApiColumns;
};

export default TestApiColumn;
