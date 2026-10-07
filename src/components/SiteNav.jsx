import { NavLink } from "react-router-dom";

function SiteNav() {
  return (
    <nav className="site-nav">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/cart">Shopping Cart</NavLink>
    </nav>
  );
}

export default SiteNav;