/*!

=========================================================
* Material Dashboard React - v1.10.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import GavelOutlinedIcon from "@material-ui/icons/GavelOutlined";
import CardMembershipOutlinedIcon from "@material-ui/icons/CardMembershipOutlined";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";
import EmojiPeopleOutlinedIcon from "@material-ui/icons/EmojiPeopleOutlined";
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import PolicyIcon from '@material-ui/icons/Policy';
import WebIcon from '@material-ui/icons/Web';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import RateReview from '@material-ui/icons/RateReview';
import WarningIcon from '@material-ui/icons/Warning';
import ContactSupport from '@material-ui/icons/ContactSupport';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.js";
import AdminUsers from "views/adminUsers/AdminUsers.js";
import userRoles from "views/adminUsers/UserRoles";
import UserProfile from "views/UserProfile/UserProfile.js";
import TableList from "views/TableList/TableList.js";
import Manage from "views/Customer/Manage.js";
import Subscription from "views/Subscription/Sub.js";
import Payments from "views/payments/Payment.js"
import NotificationsPage from "views/Notifications/Notifications.js";
import LiveHelpIcon from '@material-ui/icons/LiveHelp';
import Faq from "views/Faq/Faq.js";
import privacyPolicy from "views/webSettings/PrivacyPolicy.js";
import Reviews from "views/reviews/Reviews.js";
import EmailTemplate from "views/EmailTemplate/EmailTemplate.js";
// core components/views for RTL layout

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin",
    showLink: true
  },
  {
    path: "/admin-users",
    name: "Admin users",
    rtlName: "لوحة القيادة",
    icon: PeopleAltIcon,
    component: AdminUsers,
    layout: "/admin",
    showLink: true
  },
  {
    path: "/user-roles",
    name: "Users Roles",
    rtlName: "لوحة القيادة",
    icon: AssignmentTurnedInIcon,
    component: userRoles,
    layout: "/admin",
    showLink: true
  },
  {
    path: "/lawyers",
    name: "Lawyer Management",
    rtlName: "قائمة الجدول",
    icon: GavelOutlinedIcon,
    component: TableList,
    layout: "/admin",
    showLink: true
  },
  {
    path: "/customers",
    name: "Customer Management",
    rtlName: "طباعة",
    icon: EmojiPeopleOutlinedIcon,
    component: Manage,
    layout: "/admin",
    showLink: true
  },
  {
    path: "/subscription",
    name: "Subscription Management",
    rtlName: "الرموز",
    icon: CardMembershipOutlinedIcon,
    component: Subscription,
    layout: "/admin",
    showLink: true
  },
  {
    path: "/payments",
    name: "Payment History",
    rtlName: "الرموز",
    icon: AccountBalanceIcon,
    component: Payments,
    layout: "/admin",
    showLink: true
  },
  {
    path: "/reviews",
    name: "Reviews & Ratings",
    rtlName: "الرموز",
    icon: RateReview,
    component: Reviews,
    layout: "/admin",
    showLink: true
  },
  {
    path: "/notifications",
    name: "Notifications",
    rtlName: "الرموز",
    component: NotificationsPage,
    layout: "/admin",
    showLink: false
  },
  {
    path: "/faq",
    name: "Faq",
    rtlName: "الرموز",
    icon: LiveHelpIcon,
    component: Faq,
    layout: "/admin",
    showLink: true
  },
  {
    path: "/email-templates",
    name: "Email Templates",
    rtlName: "الرموز",
    icon: MailOutlineIcon,
    component: EmailTemplate,
    layout: "/admin",
    showLink: true
  },
  {
    path: "/webSettings",
    name: "Web Settings",
    rtlName: "خرائط",
    icon: WebIcon,
    layout: "/admin",
    showLink: true,
    dropdown: true,
    dropdownLinks:[
      {
        path: "/privacyPolicy",
        name: "Privacy Policy",
        rtlName: "خرائط",
        component: privacyPolicy,
        layout: "/admin",
        icon: PolicyIcon,
      },
      {
        path: "/Terms_and_Conditions",
        name: "Terms & Conditions",
        rtlName: "خرائط",
        component: privacyPolicy,
        layout: "/admin",
        icon: MenuBookIcon,
      },
      {
        path: "/about-us",
        name: "About Us",
        rtlName: "خرائط",
        component: privacyPolicy,
        layout: "/admin",
        icon: ContactSupport,
      },
      {
        path: "/disclaimer",
        name: "Disclaimer",
        rtlName: "خرائط",
        component: privacyPolicy,
        layout: "/admin",
        icon: WarningIcon,
      }
    ]
  },
  {
    path: "/settings",
    name: "Settings",
    rtlName: "خرائط",
    icon: SettingsOutlinedIcon,
    component: UserProfile,
    layout: "/admin",
    showLink: true
  },
];

export default dashboardRoutes;
