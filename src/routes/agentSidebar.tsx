import CashIn from "@/pages/agent/CashIn";
import CashOut from "@/pages/agent/CashOut";
import Overview from "@/pages/agent/Overview";
import Transactions from "@/pages/agent/Transactions";

const agentSidebar = [
  {
    title: "Overview",
    url: "/agent/overview",
    component: Overview
  },
  {
    title:"Cash In",
    url:'/agent/cash-in',
    component:CashIn
  },
  {
    title:"Cash Out",
    url:'/agent/cash-out',
    component:CashOut
  },
  {
    title:"Transactions",
    url:'/agent/transactions',
    component:Transactions
  }
];

export default agentSidebar;
