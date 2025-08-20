import { Loader } from "@/components/Loader.tsx";
import React, { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router";

const App = lazy(() => import("../App.tsx"));
const Home = lazy(() => import("../pages/Home.tsx"));
const About = lazy(() => import("../pages/About.tsx"));
const Contact = lazy(() => import("../pages/Contact.tsx"));
const Faq = lazy(() => import("../pages/Faq.tsx"));
const Features = lazy(() => import("../pages/Features.tsx"));
const Pricing = lazy(() => import("../pages/Pricing.tsx"));


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
]);
