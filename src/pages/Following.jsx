import React, { useReducer } from "react";
import { initialState, reducer, actionTypes } from "../utils/Reducer";
import Sidebar from "../components/UserNav";

const Following = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const creators = state.members.filter((member) => member.role === "creator");

  // Handle follow/unfollow
  const toggleFollow = (id) => {
    dispatch({ type: actionTypes.TOGGLE_FOLLOW, id });
  };

  

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar/>

      <main className="ml-64 flex-1 p-8">
        <h1 className="text-2xl font-bold mb-4">Creators</h1>
        {creators.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {creators.map((creator) => (
              <div
                key={creator.id}
                className="creator-card p-4 bg-white rounded-lg shadow-md flex flex-col items-center"
              >
                <h2 className="text-xl font-semibold">{creator.email}</h2>
                <p className="text-sm text-gray-600">Role: {creator.role}</p>
                <button
                  onClick={() => toggleFollow(creator.id)}
                  className={`mt-2 px-4 py-2 rounded ${
                    creator.isFollowing
                      ? "bg-red-500 text-white"
                      : "bg-green-500 text-white"
                  }`}
                >
                  {creator.isFollowing ? "Unfollow" : "Follow"}
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p>No creators found.</p>
        )}
      </main>
    </div>
  );
};

export default Following;
