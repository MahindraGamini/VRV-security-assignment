import React, { createContext, useState, useContext } from 'react';


const BlogContext = createContext();


export const BlogProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);

  const addBlog = (newBlog) => {
    setBlogs((prevBlogs) => [...prevBlogs, newBlog]);
  };

  return (
    <BlogContext.Provider value={{ blogs, addBlog }}>
      {children}
    </BlogContext.Provider>
  );
};


export const useBlogs = () => {
  return useContext(BlogContext);
};
