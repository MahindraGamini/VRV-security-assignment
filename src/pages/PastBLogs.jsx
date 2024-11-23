import React from "react";
import { useBlogs } from "../context/BlogContext"; 
import CSidebar from "../components/CreatorNav";

const PastBlogs = () => {
  const { blogs } = useBlogs(); 

  return (
    <div className="flex">
      
      <CSidebar />
   
      <div className="flex-1 ml-64 p-8"> 
        <h1 className="text-2xl font-bold mb-4">Past Blogs</h1>
        <div className="grid grid-cols-1 gap-4">
          {blogs.length > 0 ? (
            blogs.map((blog) => (
              <div
                key={blog.id}
                className="p-4 bg-white rounded shadow-md hover:shadow-lg"
              >
                <h2 className="text-xl font-semibold">{blog.title}</h2>
                <p className="text-sm text-gray-600">{blog.date}</p>
                <p className="mt-2">{blog.content}</p>
              </div>
            ))
          ) : (
            <p>No blogs yet. Start writing!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PastBlogs;
