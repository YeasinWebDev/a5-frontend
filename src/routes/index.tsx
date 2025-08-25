import DashboardLayout from "@/components/layout/DashboardLayout.tsx";
import { Loader } from "@/components/Loader.tsx";
import React, { lazy, Suspense } from "react";
import { createBrowserRouter, Navigate } from "react-router";
import adminSidebar from "./adminSidebar.tsx";
import { generateRoutes } from "@/utils/generateRoutes.tsx";
import { WithAuth } from "@/utils/WithAuth.tsx";
import userSidebar from "./userSidebar.tsx";
import agentSidebar from "./agentSidebar.tsx";

const App = lazy(() => import("../App.tsx"));
const Home = lazy(() => import("../pages/Home.tsx"));
const About = lazy(() => import("../pages/About.tsx"));
const Contact = lazy(() => import("../pages/Contact.tsx"));
const Faq = lazy(() => import("../pages/Faq.tsx"));
const Features = lazy(() => import("../pages/Features.tsx"));
const Pricing = lazy(() => import("../pages/Pricing.tsx"));
const SignIn = lazy(() => import("../pages/auth/SignIn.tsx"));
const SignUp = lazy(() => import("../pages/auth/SignUp.tsx"));
const Unauthorize = lazy(() => import("../pages/Unauthorize.tsx"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<Loader />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "about",
        element: (
          <Suspense fallback={<Loader />}>
            <About />
          </Suspense>
        ),
      },
      {
        path: "contact",
        element: (
          <Suspense fallback={<Loader />}>
            <Contact />
          </Suspense>
        ),
      },
      {
        path: "faq",
        element: (
          <Suspense fallback={<Loader />}>
            <Faq />
          </Suspense>
        ),
      },
      {
        path: "features",
        element: (
          <Suspense fallback={<Loader />}>
            <Features />
          </Suspense>
        ),
      },
      {
        path: "pricing",
        element: (
          <Suspense fallback={<Loader />}>
            <Pricing />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/admin",
    Component: () => <Suspense fallback={<Loader />}>{React.createElement(WithAuth(DashboardLayout, "admin"))}</Suspense>,
    children: [
      { index: true, element: <Navigate to="/admin/overview" /> },
      ...generateRoutes(adminSidebar).map(({ path, Component }) => ({
        path,
        Component: Component ? () => <Suspense fallback={<Loader />}>{React.createElement(WithAuth(Component, "admin"))}</Suspense> : undefined,
      })),
    ],
  },
  {
    path: "/user",
    Component: () => <Suspense fallback={<Loader />}>{React.createElement(WithAuth(DashboardLayout, "user"))}</Suspense>,
    children: [
      { index: true, element: <Navigate to="/user/overview" /> },
      ...generateRoutes(userSidebar).map(({ path, Component }) => ({
        path,
        Component: Component ? () => <Suspense fallback={<Loader />}>{React.createElement(WithAuth(Component, "user"))}</Suspense> : undefined,
      })),
    ],
  },
  {
    path: "/agent",
    Component: () => <Suspense fallback={<Loader />}>{React.createElement(WithAuth(DashboardLayout, "agent"))}</Suspense>,
    children: [
      { index: true, element: <Navigate to="/agent/overview" /> },
      ...generateRoutes(agentSidebar).map(({ path, Component }) => ({
        path,
        Component: Component ? () => <Suspense fallback={<Loader />}>{React.createElement(WithAuth(Component, "agent"))}</Suspense> : undefined,
      })),
    ],
  },
  {
    path: "/login",
    Component: SignIn,
  },
  {
    path: "/register",
    Component: SignUp,
  },
  {
    path: "/unauthorized",
    Component: Unauthorize,
  },
]);
