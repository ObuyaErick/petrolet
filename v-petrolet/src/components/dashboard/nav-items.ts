export interface SubItem {
  title: string;
  icon: string;
}

export const navItems: {
  static: SubItem[];
  dynamic: Record<string, { icon: string; sub: SubItem[] }>;
} = {
  dynamic: {
    Account: {
      icon: "mdi-account-circle-outline",
      sub: [
        { title: "Profile", icon: "mdi-account-outline" },
        { title: "Settings", icon: "mdi-cog-outline" },
        { title: "Password Change", icon: "mdi-lock-reset" },
        { title: "Logout", icon: "mdi-logout" },
      ],
    },
    Fees: {
      icon: "mdi-cash-multiple",
      sub: [
        { title: "View Fees", icon: "mdi-cash-check" },
        { title: "Pay Fees", icon: "mdi-credit-card-outline" },
        { title: "Fee Reports", icon: "mdi-file-document-outline" },
        { title: "Invoices", icon: "mdi-invoice-text-multiple-outline" },
      ],
    },
    Students: {
      icon: "mdi-school-outline",
      sub: [
        { title: "Student List", icon: "mdi-account-group-outline" },
        { title: "Attendance", icon: "mdi-calendar-check-outline" },
        { title: "Performance", icon: "mdi-chart-line" },
        { title: "Disciplinary Actions", icon: "mdi-alert-outline" },
      ],
    },
    Teachers: {
      icon: "mdi-magic-staff",
      sub: [
        { title: "Teacher List", icon: "mdi-account-group-outline" },
        { title: "Schedules", icon: "mdi-calendar-clock-outline" },
        { title: "Subjects", icon: "mdi-book-outline" },
        { title: "Performance Reviews", icon: "mdi-chart-bar" },
      ],
    },
  },
  static: [
    { title: "Notifications", icon: "mdi-bell-outline" },
    { title: "Support", icon: "mdi-help-circle-outline" },
    { title: "Log out", icon: "mdi-logout" },
  ],
};
