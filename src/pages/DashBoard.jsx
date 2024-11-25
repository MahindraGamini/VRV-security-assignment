import React, { useReducer, useState, useEffect } from "react";
import { initialState, reducer, actionTypes } from "../utils/Reducer";
import { AddMemberModal } from "../components/forms/AddModal";

// Mock data
const mockMembers = [
  { id: 1, email: "john.doe@example.com", role: "user" },
  { id: 2, email: "jane.doe@example.com", role: "creator" },
];

const mockRoles = ["user", "creator", "admin"];

const AdminDashboard = () => {
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    members: mockMembers, // Set mock members
    roles: mockRoles,     // Set mock roles
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newMember, setNewMember] = useState({ email: "", role: "" });
  const [newRole, setNewRole] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    console.log("Current members:", state.members);
    console.log("Available roles:", state.roles);
  }, [state]);

  const handleAddMember = () => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    

    if (emailRegex.test(newMember.email.trim())) {
      dispatch({ type: actionTypes.ADD_MEMBER, payload: newMember });
      setNewMember({ email: "", role: state.roles[0] }); 
      setIsModalOpen(false);
    } else {
      alert("Please enter a valid email.");
    }
  };

  const handleRoleChange = (id, newRole) => {
    dispatch({ type: actionTypes.UPDATE_MEMBER_ROLE, payload: { id, role: newRole } });
  };

  const handleDeleteMember = (id) => {
    if (window.confirm("Are you sure you want to delete this member?")) {
      dispatch({ type: actionTypes.DELETE_MEMBER, payload: id });
    }
  };

  const handleAddRole = () => {
    if (newRole.trim() && !state.roles.includes(newRole)) {
      dispatch({ type: actionTypes.ADD_ROLE, payload: newRole.trim() });
      setNewRole(""); // Reset role input
    } else {
      alert("Invalid or duplicate role.");
    }
  };

  const handleDeleteRole = (role) => {
    if (window.confirm(`Are you sure you want to delete the role "${role}"?`)) {
      dispatch({ type: actionTypes.REMOVE_ROLE, payload: role });
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 font-sans">
      {/* Sidebar */}
      <aside
        className={`fixed lg:relative ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition-transform duration-300 ease-in-out w-64 bg-gray-900 text-white min-h-screen z-40 shadow-lg`}
      >
        <div className="p-6 flex justify-between items-center border-b border-gray-800">
          <h1 className="text-xl font-bold py-5">Admin Dashboard</h1>
        </div>
        <nav className="flex-1 p-6">
          <ul>
            <li className="mb-2">
              <button className="w-full text-left px-4 py-2 hover:bg-gray-800 rounded">
                Manage Members
              </button>
            </li>
            <li>
              <button className="w-full text-left px-4 py-2 hover:bg-gray-800 rounded">
                Manage Roles
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)} // Toggle the sidebar state
        className="fixed left-2 lg:hidden px-4 py-2 bg-blue-600 text-white rounded shadow-md hover:bg-blue-700 z-50"
      >
        ☰
      </button>


      <main className="flex-1 p-8 bg-white">
        <header className="flex items-center justify-between pb-4 border-b">
          <h1 className="text-2xl font-bold text-gray-800">Members Management</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 flex items-center"
          >
            <span className="mr-2 hidden sm:block">Add Member</span>
            <span className="sm:hidden text-2xl">+</span> {/* Show "+" on small screens */}
          </button>
        </header>

        <section className="mt-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Members</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-gray-50 shadow-md rounded-lg">
              <thead>
                <tr>
                  <th className="py-2 px-4 text-left bg-gray-200 text-gray-700 text-xs sm:text-sm">
                    Email
                  </th>
                  <th className="py-2 px-4 text-left bg-gray-200 text-gray-700 text-xs sm:text-sm">
                    Role
                  </th>
                  <th className="py-2 px-4 text-left bg-gray-200 text-gray-700 text-xs sm:text-sm">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {state.members.map((member) => (
                  <tr key={member.id}>
                    <td className="py-2 px-4 border text-xs sm:text-sm">{member.email}</td>
                    <td className="py-2 px-4 border text-xs sm:text-sm">{member.role}</td>
                    <td className="py-2 px-4 border">
                      <select
                        value={member.role}
                        onChange={(e) => handleRoleChange(member.id, e.target.value)}
                        className="mr-2 px-2 py-1 border rounded text-xs sm:text-sm"
                      >
                        {state.roles.map((role) => (
                          <option key={role} value={role}>
                            {role}
                          </option>
                        ))}
                      </select>
                      <button
                        onClick={() => handleDeleteMember(member.id)}
                        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 text-xs sm:text-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Roles Management</h2>
          <div className="mb-4 flex items-center">
            <input
              type="text"
              value={newRole}
              onChange={(e) => setNewRole(e.target.value)}
              className="border rounded px-4 py-2 mr-4 text-xs sm:text-sm"
              placeholder="Add new role"
            />
            <button
              onClick={handleAddRole}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-xs sm:text-sm"
            >
              Add Role
            </button>
          </div>
          <ul>
            {state.roles.map((role) => (
              <li key={role} className="flex items-center justify-between mb-2 text-xs sm:text-sm">
                <span>{role}</span>
                <button
                  onClick={() => handleDeleteRole(role)}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 text-xs sm:text-sm"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </section>
      </main>

      <AddMemberModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        newMember={newMember}
        setNewMember={setNewMember}
        handleAddMember={handleAddMember}
        roles={state.roles}
      />
    </div>
  );
};

export default AdminDashboard;
