import Agents from "@/pages/admin/Agents";
import Overview from "@/pages/admin/Overview";
import Transactions from "@/pages/admin/Transactions";
import Users from "@/pages/admin/Users";
import Profile from "@/pages/Profile";

const adminSidebar = [
  {
    title: "Overview",
    url: "/admin/overview",
    component: Overview,
  },
  {
    title: "Agents",
    url: "/admin/agents",
    component: Agents,
  },
  {
    title: "Users",
    url: "/admin/users",
    component: Users,
  },
  {
    title: "Transactions",
    url: "/admin/transactions",
    component: Transactions,
  },
  {
    url: "/admin/profile",
    component: Profile,
  },
];

export default adminSidebar;
