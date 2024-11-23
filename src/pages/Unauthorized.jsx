import React from "react";

const Unauthorized = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center bg-white p-10 rounded-lg shadow-lg">
        <h1 className="text-6xl font-bold text-red-600 mb-4">🚫</h1>
        <h2 className="text-2xl font-semibold text-gray-800">
          Oops! Access Denied
        </h2>
        <p className="text-gray-600 mt-2">
          You just entered the *"High Security Zone™"* 🤖.
        </p>
        <p className="text-gray-500 mt-1 italic">
          {" "}
          "If you're not supposed to be here, you're already in trouble!"
        </p>

        <div className="mt-6">
          <p className="text-gray-700 font-semibold">What you can do now:</p>
          <ul className="mt-2 text-sm text-gray-500 list-disc list-inside">
            <li>Head back to safety before the alarms go off 🚨</li>
            <li>Check your credentials</li>
            <li>Bribe the admin (Just kidding. Or are we? 🤔)</li>
          </ul>
        </div>

        <button
          onClick={() => (window.location.href = "/")}
          className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Go Back Home
        </button>
      </div>
    </div>
  );
};

export default Unauthorized;
