import { BsGraphUpArrow } from "react-icons/bs";
import { FaUserEdit } from "react-icons/fa";
import { RiExportFill } from "react-icons/ri";
import { TiFlowMerge } from "react-icons/ti";


export const advanceSearchSectionHeadData = [
  {
    id: 5,
    icon: <RiExportFill />,
    name: "Export Lead",
  },
  {
    id: 6,
    icon: <FaUserEdit />,
    name: "Change Owner",
  },
  {
    id: 7,
    icon: <BsGraphUpArrow />,
    name: "Change Stage",
  },
  {
    id: 9,
    icon: <TiFlowMerge className="rotate-90 text-lg"/>,
    name: "Merge Leads",
    path: "/manage-leads-v1/merge-leads"
  },
];