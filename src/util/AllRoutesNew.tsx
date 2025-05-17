import About from "../pages/About";
import HomePage from "../pages/HomePage";
import RootLayout from "../pages/RootLayout";
import ProfilePage from "../pages/ProfilePage";
import SmartViewPage from "../pages/smart-view/SmartViewPage";
import OAuth2RedirectHandler from "../component/OAuth2RedirectHandler";
import ViewManageLeadsPage from "../pages/manage-leads/ViewManageLeadsPage";
import CreateNewLeadsPage from "../pages/manage-leads/CreateNewLeadsPage";
import ViewDeclineCasesPage from "../pages/view-decline-cases/ViewDeclineCasesPage";
import ManageContractPage from "../pages/view-decline-cases/ManageContractPage";
import ManageLeadsV1Page from "../pages/manage-leads-v1/ManageLeadsV1Page";
import ViewCashPaymentPage from "../pages/view-cash-payments/ViewCashPaymentPage";
import InboundWPMessagesPage from "../pages/wpMessages/InboundWPMessagesPage";
import ThridpartyHomePage from "../pages/third-party/ThridpartyHomePage";
import ThirdPartyRootLayout from "../pages/third-party/ThirdPartyRootLayout";
import ImportedLeadPage from "../pages/imported-leads/ImportedLeadPage";
import TestApiPage from "../pages/test-api/TestApiPage";
import AdvanceSearchPage from "../pages/advance-search/AdvanceSearchPage";
import MergeLeadsPage from "../pages/merge-leads/MergeLeadsPage";
import ManageLeadsV2Page from "../pages/manage-leads-v2/ManageLeadsV2Page";
import ManageTaskPage from "../pages/manage-task/ManageTaskPage";

// Helper function that builds routes based on user details
export const getRoutes = (userDetails: any) => {
  // Define roles that should render the ThirdPartyPage
  const thirdPartyRoles = [
    "ROLE_COLLEGE_DKHO",
    "ROLE_COLLEGE_DUNIA",
    "ROLE_SHIKSHA",
    "ROLE_TWIGZ",
    "ROLE_DURGESH",
    "ROLE_CAREER_COACH",
    "ROLE_COLLEGE_SKY",
    "ROLE_WAKAR_CONSULTANCY",
    "ROLE_FAISAL_ALI",
    "ROLE_ADARSH_YADAV",
    "ROLE_COLLEGE_CONNECT",
    "ROLE_MERIT_ADMISSIONS",
  ];
  const isThirdPartyUser = userDetails?.authority?.some((role: any) =>
    thirdPartyRoles.includes(role)
  );

  if (isThirdPartyUser) {
    return [
      {
        path: "/",
        element: <ThirdPartyRootLayout />,
        children: [
          {
            index: true,
            element: <ThridpartyHomePage />,
          },
        ],
      },
    ];
  } else {
    // Default route configuration
    return [
      {
        path: "/login/oauth2/code/unifcrm",
        element: <OAuth2RedirectHandler />,
      },
      {
        path: "/",
        element: <RootLayout />,
        children: [
          {
            index: true,
            element: <HomePage />,
          },
          {
            path: "profile",
            element: <ProfilePage />,
          },
          {
            path: "manage-leads-v1",
            element: <ManageLeadsV1Page />,
            children: [
              {
                path: "add-new-leads",
                element: <CreateNewLeadsPage />,
              },
              {
                path: "details/:leadCaptureId",
                element: <ViewManageLeadsPage />,
              },
              {
                path: "imported-leads",
                element: <ImportedLeadPage />,
              },
              {
                path: "advance-search",
                element: <AdvanceSearchPage />
              },
              {
                path: "merge-leads",
                element: <MergeLeadsPage />
              }
            ],
          },
          {
            path: "inbound-whatsapp-messages",
            element: <InboundWPMessagesPage />,
          },
          {
            path: "smart-view",
            element: <SmartViewPage />,
          },
          {
            path: "manage-task",
            element: <ManageTaskPage />,
          },
          {
            path: "manage-leads-v2",
            element: <ManageLeadsV2Page />
          },
          {
            path: "view-decline-cases",
            element: <ViewDeclineCasesPage />,
            children: [
              {
                path: "manage-contract/:leadCaptureId",
                element: <ManageContractPage />,
              },
            ],
          },
          {
            path: "view-cash-payments",
            element: <ViewCashPaymentPage />,
          },
          {
            path: "about",
            element: <About />,
          },
        ],
      },
      {
        path: "testApi",
        element: <TestApiPage />,
      },

    ];
  }
};
