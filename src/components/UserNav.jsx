import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Sidebar = ({ handleLogout }) => {
  const {logout } = useAuth();
const handleLogOut =()=>{
  logout();
}
  return (
    <aside className="w-64 bg-gray-800 text-white h-screen fixed top-0 left-0">
      <div className="p-4 text-2xl font-bold">User Role</div>
      <nav>
        <ul>
          <li className="p-4 hover:bg-gray-700">
            <Link to="/user">Dashboard</Link>
          </li>
          <li className="p-4 hover:bg-gray-700">
            <Link to="/user/following">Creators-Following</Link>
          </li>
        </ul>
      </nav>
      <button
        onClick={handleLogOut}
        className="w-full mt-4 p-2 text-center bg-red-600 text-white rounded hover:bg-red-700"
      >
        Logout
      </button>
    </aside>
  );
};

export default Sidebar;
