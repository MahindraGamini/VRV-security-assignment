import React, { useReducer, useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { initialState, reducer, actionTypes } from "../utils/Reducer";
import AddMemberModal from "../components/forms/AddModal";

const AdminDashboard = () => {
  const { auth, logout } = useAuth(); 
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newMember, setNewMember] = useState({ email: "", role: "user" });

  
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
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-gray-800 text-white">
        <div className="p-4 text-2xl font-bold">Admin Panel</div>
        <nav>
          <ul>
            <li className="p-4 hover:bg-gray-700">
              Manage Users
            </li>
            <li className="p-4 hover:bg-gray-700">
              Manage Creators
            </li>
          </ul>
        </nav>
        <footer className="p-4 bg-gray-700">
          Logged in as: <strong>{auth.role}</strong>
        </footer>
        <button
          onClick={handleLogout}
          className="w-full mt-4 p-2 text-center bg-red-600 text-white rounded hover:bg-red-700"
        >
          Logout
        </button>
      </aside>

      <main className="flex-1 p-8 bg-white">
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
            <table className="min-w-full bg-gray-50 shadow-md rounded-lg">
              <thead>
                <tr>
                  <th className="py-2 px-4 text-left bg-gray-200 text-gray-700">Email</th>
                  <th className="py-2 px-4 text-left bg-gray-200 text-gray-700">Role</th>
                  <th className="py-2 px-4 text-left bg-gray-200 text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td className="py-2 px-4 border">{user.email}</td>
                    <td className="py-2 px-4 border">{user.role}</td>
                    <td className="py-2 px-4 border">
                      <button
                        onClick={() => handleRoleChange(user.id)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md mr-2 hover:bg-blue-700"
                      >
                        Make Creator
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>

        <section id="manage-creators" className="my-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Manage Creators</h2>
          {creators.length === 0 ? (
            <p>No creators found</p>
          ) : (
            <table className="min-w-full bg-gray-50 shadow-md rounded-lg">
              <thead>
                <tr>
                  <th className="py-2 px-4 text-left bg-gray-200 text-gray-700">Email</th>
                  <th className="py-2 px-4 text-left bg-gray-200 text-gray-700">Role</th>
                  <th className="py-2 px-4 text-left bg-gray-200 text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {creators.map((creator) => (
                  <tr key={creator.id}>
                    <td className="py-2 px-4 border">{creator.email}</td>
                    <td className="py-2 px-4 border">{creator.role}</td>
                    <td className="py-2 px-4 border">
                      <button
                        onClick={() => handleRoleChange(creator.id)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md mr-2 hover:bg-blue-700"
                      >
                        Make User
                      </button>
                      <button
                        onClick={() => handleDelete(creator.id)}
                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
