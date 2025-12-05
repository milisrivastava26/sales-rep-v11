import { BsGraphUpArrow } from "react-icons/bs";
import { FaUserEdit } from "react-icons/fa";
import { FaUserPlus, FaWhatsapp } from "react-icons/fa6";
import { RiExportFill, RiImportFill } from "react-icons/ri";
import { TiFlowMerge } from "react-icons/ti";

export const sectionHeadData = [
  {
    heading: "Manage Leads",
    sectionHeadSelectData: [
      {
        id: 2,
        icon: <FaUserPlus />,
        name: "Quick Add Form",
      },
      // {
      //   id: 3,
      //   name: "Add New Leads",
      //   path: "/manage-leads/add-new-leads",
      // },
      {
        id: 4,
        icon: <RiImportFill />,
        name: "Import Leads",
        subMenu: [
          {
            id: 1,
            icon: <RiImportFill />,
            name: "Fresh Import",
          },
          {
            id: 2,
            icon: <RiImportFill />,
            name: "Imported Leads",
            path: "/manage-leads-v1/imported-leads",
          },
        ],
      },
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
      // {
      //   id: 8,
      //   icon: <RiSearchLine />,
      //   name: "Advance Search",
      //   path: "/manage-leads-v1/advance-search",
      // },
      // {
      //   id: 81,
      //   icon: <RiSearchLine />,
      //   name: "Advance Search V1",
      //   path: "/manage-leads-v1/advance-search-v1",
      // },
      {
        id: 9,
        icon: <TiFlowMerge className="rotate-90 text-lg" />,
        name: "Merge Leads",
        path: "/manage-leads-v1/merge-leads",
      },

      {
        id: 10,
        icon: <FaWhatsapp className="text-lg" />,
        name: "Bulk Send Whatsapp",
      },
    ],

    sectionHeadSettingData: [
      {
        id: 1,
        name: "Select Columns",
      },

      {
        id: 2,
        name: "Manage Filters",
      },
      {
        id: 3,
        name: "Manage Filters",
      },
    ],

    sectionHeadManageFilterData: [
      {
        id: 1,
        name: "Small",
      },
      {
        id: 2,
        name: "Medium",
      },
      {
        id: 3,
        name: "Large",
      },
      {
        id: 4,
        name: "Extra Large",
      },
    ],
  },
];
