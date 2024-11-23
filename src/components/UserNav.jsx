import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Sidebar = () => {
  const { logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogOut = () => {
    logout();
  };

  return (
    <>
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="sm:hidden fixed top-4 left-4 mt-10 z-50 bg-[#2B3A33] p-3 rounded text-[#F7E200]"
      >
        {isSidebarOpen ? "Close" : "Menu"}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-[#2B3A33] shadow-lg flex flex-col transform transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0 sm:w-64 z-40`}
      >
        <div className="p-6 text-2xl font-bold text-[#F7E200] border-b border-gray-600">
          User Role
        </div>
        <nav className="flex-1 p-4">
          <ul className="space-y-4">
            <li>
              <Link
                to="/user"
                className="block p-4 rounded-md text-lg text-white bg-transparent hover:bg-[#3C4C43] hover:text-[#F7E200] transition"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/user/following"
                className="block p-4 rounded-md text-lg text-white bg-transparent hover:bg-[#3C4C43] hover:text-[#F7E200] transition"
              >
                Creators-Following
              </Link>
            </li>
          </ul>
        </nav>
        <div className="p-4 border-t border-gray-600">
          <button
            onClick={handleLogOut}
            className="w-full p-3 text-center bg-red-600 rounded-md hover:bg-red-700 transition text-lg font-medium text-white"
          >
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
