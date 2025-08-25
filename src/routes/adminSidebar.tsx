import Overview from "@/pages/admin/Overview";
import Profile from "@/pages/Profile";

const adminSidebar = [
  {
    title: "Overview",
    url: "/admin/overview",
    component: Overview,
  },
    {
      url:'/admin/profile',
      component:Profile
    }
];

export default adminSidebar;
