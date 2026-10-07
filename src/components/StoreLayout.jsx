import { Outlet } from "react-router-dom";
import Header from "./Header";
import SiteNav from "./SiteNav";

function StoreLayout() {
  return (
    <>
      <Header />
      <SiteNav />
      <Outlet />
    </>
  );
}

export default StoreLayout;