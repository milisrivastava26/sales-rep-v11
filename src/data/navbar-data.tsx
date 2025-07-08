export const dashboardItems: DropdownItem[] = [
  { label: "New Lead", href: "/new-lead" },
  { label: "All Leads", href: "/all-lead" },
];

export interface DropdownItem {
  label: string;
  href: string;
  roles?: string[]; // optional: means visible to all if undefined
}

export const leadsItems: DropdownItem[] = [
  { label: "Manage Leads", href: "/manage-leads-v1", roles: ["ROLE_USER"] },
  { label: "Inbound Whatsapp Messages", href: "/inbound-whatsapp-messages", roles: ["ROLE_USER"] },
  { label: "Smart View", href: "/smart-view", roles: ["ROLE_USER"] },
  { label: "View Declined Cases", href: "/view-decline-cases", roles: ["ROLE_AUTHORITY"] },
  { label: "View Cash Payments", href: "/view-cash-payments", roles: ["ROLE_FINANCE"] },
  { label: "View Payment Info", href: "/payment-info", roles: ["ROLE_ADMIN"] },
  { label: "Document Review", href: "/document-review", roles: ["ROLE_DOCUMENT_REVIEWER"] },
  { label: "Manage Task", href: "/manage-task", roles: ["ROLE_MANAGER", "ROLE_ADMIN"] },
  { label: "Super Bot Callback Details", href: "/superbot-details", roles: ["ROLE_MANAGER", "ROLE_ADMIN", "ROLE_USER"] },
];

export const leadAuthorityItems = [{ label: "View Declined Cases", href: "/view-decline-cases" }];

export const profileItems: DropdownItem[] = [
  { label: "Profile", href: "/profile" },
  { label: "Log out", href: "" },
];
