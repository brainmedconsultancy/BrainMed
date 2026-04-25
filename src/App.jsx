import { Suspense, lazy, } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import ScrollToTop from "./components/ui/ScrollToTop";
import FloatingCallButton from "./components/ui/FloatingCallButton";

const HomePage = lazy(() => import("./pages/HomePage"));
const AdminPage = lazy(() => import("./pages/AdminPage"));
const CountryDetails = lazy(() => import("./pages/CountryDetails"));

export default function App() {

  const location = useLocation();
  const isAdminPath = location.pathname.startsWith('/admin');

  return (
    <>
      <ScrollToTop />
      {!isAdminPath && <FloatingCallButton />}
      <Suspense
        fallback={
          <div className="flex min-h-screen items-center justify-center">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-brand-200 border-t-brand-600" />
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/countries/:countryName" element={<CountryDetails />} />
        </Routes>
      </Suspense>
    </>
  );
}
