import React, { useState, useEffect } from "react";
import { useBlogs } from "../context/BlogContext";
import CSidebar from "../components/CreatorNav";

const PastBlogs = () => {
  const { blogs } = useBlogs();
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // For mobile sidebar toggle

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [search]);

  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-gray-100 font-spaceGrotesk">
     
      <CSidebar isOpen={isSidebarOpen} />

      
      <div
        className={`flex-1 transition-all duration-300 ${
          isSidebarOpen ? "ml-64 sm:ml-64" : "ml-0 sm:ml-64"
        } p-8`}
      >
        <header className="flex flex-col sm:flex-row items-center justify-between pb-4 border-b space-y-4 sm:space-y-0">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center sm:text-left">
            Your Published Blogs
          </h1>
          <input
            type="text"
            placeholder="Search your blogs..."
            value={search}
            onChange={handleSearchChange}
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 w-full sm:w-auto"
          />
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {filteredBlogs.length > 0 ? (
            filteredBlogs.map((blog) => (
              <div
                key={blog.id}
                className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <h2 className="text-xl font-semibold text-gray-800">{blog.title}</h2>
                <p className="text-sm text-gray-500 font-light">{blog.date}</p>
                <p className="mt-4 text-gray-700 font-medium">{blog.content}</p>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500 font-light">
              You haven't written any blogs yet. Start sharing your thoughts!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PastBlogs;
