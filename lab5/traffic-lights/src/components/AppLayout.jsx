import { NavLink, Outlet } from "react-router";

const NAV_LINKS = [
  { to: "/", label: "Головна", end: true },
  { to: "/traffic-light", label: "Світлофор" },
  { to: "/stats", label: "Статистика" },
];

function AppLayout() {
  return (
    <div className="site-shell">
      <nav className="site-nav" aria-label="Головна навігація">
        {NAV_LINKS.map(({ to, label, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `site-nav__link${isActive ? " site-nav__link--active" : ""}`
            }
          >
            {label}
          </NavLink>
        ))}
      </nav>
      <main className="app">
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
