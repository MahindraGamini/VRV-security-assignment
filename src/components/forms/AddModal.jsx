import React from 'react';

const AddMemberModal = ({ isOpen, setIsOpen, newMember, setNewMember, handleAddMember }) => {
  if (!isOpen) return null;
    console.log(newMember)
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Add Member</h2>
        <div className="mb-4">
          <label className="block text-gray-700">Email:</label>
          <input
            type="email"
            value={newMember.email}
            onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
            className="w-full border rounded px-3 py-2 mt-1"
            placeholder="Enter email"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Role:</label>
          <select
            value={newMember.role}
            onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
            className="w-full border rounded px-3 py-2 mt-1"
          >
            <option value="user">User</option>
            <option value="vendor">Creator</option>
          </select>
        </div>
        <div className="flex justify-end">
          <button
            onClick={() => setIsOpen(false)}
            className="px-4 py-2 bg-gray-600 text-white rounded mr-2 hover:bg-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={handleAddMember}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddMemberModal;
