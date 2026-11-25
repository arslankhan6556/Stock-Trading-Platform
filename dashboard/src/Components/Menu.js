import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Menu = () => {
  const [selectedMenu, setSelectedMenu] = useState(0);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [userName, setUserName] = useState("USERID");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlUser = params.get("username") || params.get("user");

    if (urlUser) {
      localStorage.setItem("dashboardUser", urlUser);
      setUserName(urlUser);
      window.history.replaceState({}, document.title, window.location.pathname);
    } else {
      const savedUser = localStorage.getItem("dashboardUser");
      if (savedUser) {
        setUserName(savedUser);
      }
    }
  }, []);

  const handleMenuClick = (index) => {
    setSelectedMenu(index);
  };

  const handleProfileClick = () => {
    setIsProfileDropdownOpen((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem("dashboardUser");
    window.location.href = "http://localhost:3000/signup";
  };

  const avatarText =
    userName && userName !== "USERID"
      ? userName.slice(0, 2).toUpperCase()
      : "ZU";

  const menuClass = "menu";
  const activeMenuClass = "menu selected";

  return (
    <div className="menu-container">
      <img
        src="https://images.seeklogo.com/logo-png/48/1/zerodha-kite-logo-png_seeklogo-487028.png"
        alt="logo"
        style={{ width: "30px", height: "auto" }}
      />
      <div className="menus">
        <ul>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/"
              onClick={() => handleMenuClick(0)}
            >
              <p className={selectedMenu === 0 ? activeMenuClass : menuClass}>
                Dashboard
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/orders"
              onClick={() => handleMenuClick(1)}
            >
              <p className={selectedMenu === 1 ? activeMenuClass : menuClass}>
                Orders
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/holdings"
              onClick={() => handleMenuClick(2)}
            >
              <p className={selectedMenu === 2 ? activeMenuClass : menuClass}>
                Holdings
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/positions"
              onClick={() => handleMenuClick(3)}
            >
              <p className={selectedMenu === 3 ? activeMenuClass : menuClass}>
                Positions
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/funds"
              onClick={() => handleMenuClick(4)}
            >
              <p className={selectedMenu === 4 ? activeMenuClass : menuClass}>
                Funds
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/apps"
              onClick={() => handleMenuClick(5)}
            >
              <p className={selectedMenu === 5 ? activeMenuClass : menuClass}>
                Apps
              </p>
            </Link>
          </li>
        </ul>
        <hr />
        <div
          className="profile"
          onClick={handleProfileClick}
          style={{ position: "relative", cursor: "pointer" }}
        >
          <div className="avatar">{avatarText}</div>
          <p className="username">{userName}</p>

          {isProfileDropdownOpen && (
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                position: "absolute",
                top: "100%",
                right: 0,
                marginTop: "6px",
                background: "#fff",
                border: "1px solid #e0e0e0",
                borderRadius: "6px",
                padding: "8px 12px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                zIndex: 100,
              }}
            >
              <button
                type="button"
                onClick={handleLogout}
                style={{
                  background: "#e53935",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  padding: "6px 12px",
                  fontSize: "13px",
                  cursor: "pointer",
                }}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Menu;
