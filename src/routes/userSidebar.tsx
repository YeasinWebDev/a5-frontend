import Profile from "@/pages/Profile";
import Deposit from "@/pages/user/Deposit";
import Overview from "@/pages/user/Overview";
import SendMoney from "@/pages/user/SendMoney";
import Transactions from "@/pages/user/Transactions";
import Withdraw from "@/pages/user/Withdraw";

const userSidebar = [
  {
    title: "Overview",
    url: "/user/overview",
    component: Overview,
  },
  {
    title:'Deposit',
    url:'/user/deposit',
    component:Deposit
  },
  {
    title:'Withdraw',
    url:'/user/withdraw',
    component:Withdraw
  },
  {
    title:'Send Money',
    url:'/user/send-money',
    component:SendMoney
  },
  {
    title:'Transactions',
    url:'/user/transactions',
    component:Transactions
  },
  {
    url:'/user/profile',
    component:Profile
  }
];

export default userSidebar;
