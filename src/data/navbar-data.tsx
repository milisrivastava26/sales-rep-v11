// Type for dropdown items
interface DropdownItem {
  label: string;
  href: string;
}

export const dashboardItems: DropdownItem[] = [
  { label: "New Lead", href: "/new-lead" },
  { label: "All Leads", href: "/all-lead" },
];

export const leadsItems: DropdownItem[] = [
  // { label: "Manage Leads", href: "/manage-leads" },
  { label: "Manage Leads", href: "/manage-leads-v1" },
  { label: "Inbound Whatsapp Messages", href: "/inbound-whatsapp-messages" },
  { label: "Smart View", href: "/smart-view" },
  { label: "View Declined Cases", href: "/view-decline-cases" },
  { label: "View Cash Payments", href: "/view-cash-payments" },
];
export const leadAuthorityItems = [{ label: "View Declined Cases", href: "/view-decline-cases" }];

export const profileItems: DropdownItem[] = [
  { label: "Profile", href: "/profile" },
  { label: "Log out", href: "" },
];
