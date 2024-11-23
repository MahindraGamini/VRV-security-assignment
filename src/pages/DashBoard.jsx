import React, { useReducer, useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { initialState, reducer, actionTypes } from "../utils/Reducer";
import AddMemberModal from "../components/forms/AddModal";

const AdminDashboard = () => {
  const { auth, logout } = useAuth();
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newMember, setNewMember] = useState({ email: "", role: "user" });
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    console.log("Current members state:", state.members);
  }, [state.members]);

  const handleRoleChange = (id) => {
    dispatch({ type: actionTypes.TOGGLE_ROLE, id });
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this member?");
    if (confirmed) {
      dispatch({ type: actionTypes.DELETE_MEMBER, id });
    }
  };

  const handleAddMember = () => {
    if (newMember.email.trim()) {
      dispatch({ type: actionTypes.ADD_MEMBER, payload: newMember });
      setNewMember({ email: "", role: "user" });
      setIsModalOpen(false);
    } else {
      alert("Please provide a valid email.");
    }
  };

  const handleLogout = () => {
    logout();
  };

  const users = state.members.filter((member) => member.role === "user");
  const creators = state.members.filter((member) => member.role === "creator");

  useEffect(() => {
    console.log("Users:", users);
    console.log("Creators:", creators);
  }, [users, creators]);

  return (
    <div className="flex min-h-screen bg-gray-100 font-spaceGrotesk">
      <div
        className={`w-64 bg-gray-900 text-white min-h-screen flex flex-col transition-all duration-300 ${
          isSidebarOpen ? "block" : "hidden sm:block"
        }`}
      >
        <div className="p-6 border-b border-gray-700">
          <h1 className="text-2xl font-bold tracking-wide text-center">Admin Panel</h1>
        </div>

        <nav className="flex-1 overflow-y-auto">
          <ul className="space-y-1 mt-4">
            <li>
              <button
                onClick={() => console.log("Manage Users clicked")}
                className="w-full text-left px-6 py-3 text-gray-200 hover:bg-gray-800 hover:text-white transition-colors duration-300"
              >
                Manage Users
              </button>
            </li>
            <li>
              <button
                onClick={() => console.log("Manage Creators clicked")}
                className="w-full text-left px-6 py-3 text-gray-200 hover:bg-gray-800 hover:text-white transition-colors duration-300"
              >
                Manage Creators
              </button>
            </li>
          </ul>
        </nav>

        <div className="p-6 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="w-full mt-4 p-2 text-center bg-red-600 text-white rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </div>

      <main className="flex-1 p-8 bg-white">
        <div className="block sm:hidden p-4">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-gray-800 focus:outline-none"
          >
            {isSidebarOpen ? (
              <span className="text-xl">&#x2715; Close</span>
            ) : (
              <span className="text-xl">&#9776; Open</span>
            )}
          </button>
        </div>

        <header className="flex items-center justify-between pb-4 border-b border-gray-300">
          <h1 className="text-3xl font-semibold text-gray-800">Welcome, {auth.role}</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Add Member
          </button>
        </header>

        <section id="manage-users" className="my-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Manage Users</h2>
          {users.length === 0 ? (
            <p>No users found</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-gray-50 shadow-md rounded-lg">
                <thead>
                  <tr>
                    <th className="py-2 px-4 text-left bg-gray-200 text-gray-700 text-sm sm:text-base">
                      Email
                    </th>
                    <th className="py-2 px-4 text-left bg-gray-200 text-gray-700 text-sm sm:text-base">
                      Role
                    </th>
                    <th className="py-2 px-4 text-left bg-gray-200 text-gray-700 text-sm sm:text-base">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td className="py-2 px-4 border text-sm sm:text-base">{user.email}</td>
                      <td className="py-2 px-4 border text-sm sm:text-base">{user.role}</td>
                      <td className="py-2 px-4 border text-sm sm:text-base">
                        <button
                          onClick={() => handleRoleChange(user.id)}
                          className="px-2 sm:px-4 py-1 sm:py-2 bg-blue-600 text-white rounded-md mr-2 hover:bg-blue-700 text-xs sm:text-sm"
                        >
                          Make Creator
                        </button>
                        <button
                          onClick={() => handleDelete(user.id)}
                          className="px-2 sm:px-4 py-1 sm:py-2 bg-red-600 text-white rounded-md hover:bg-red-700 text-xs sm:text-sm"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <section id="manage-creators" className="my-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Manage Creators</h2>
          {creators.length === 0 ? (
            <p>No creators found</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-gray-50 shadow-md rounded-lg">
                <thead>
                  <tr>
                    <th className="py-2 px-4 text-left bg-gray-200 text-gray-700 text-sm sm:text-base">
                      Email
                    </th>
                    <th className="py-2 px-4 text-left bg-gray-200 text-gray-700 text-sm sm:text-base">
                      Role
                    </th>
                    <th className="py-2 px-4 text-left bg-gray-200 text-gray-700 text-sm sm:text-base">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {creators.map((creator) => (
                    <tr key={creator.id}>
                      <td className="py-2 px-4 border text-sm sm:text-base">{creator.email}</td>
                      <td className="py-2 px-4 border text-sm sm:text-base">{creator.role}</td>
                      <td className="py-2 px-4 border text-sm sm:text-base">
                        <button
                          onClick={() => handleRoleChange(creator.id)}
                          className="px-2 sm:px-4 py-1 sm:py-2 bg-blue-600 text-white rounded-md mr-2 hover:bg-blue-700 text-xs sm:text-sm"
                        >
                          Make User
                        </button>
                        <button
                          onClick={() => handleDelete(creator.id)}
                          className="px-2 sm:px-4 py-1 sm:py-2 bg-red-600 text-white rounded-md hover:bg-red-700 text-xs sm:text-sm"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>

      <AddMemberModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        newMember={newMember}
        setNewMember={setNewMember}
        handleAddMember={handleAddMember}
      />
    </div>
  );
};

export default AdminDashboard;
