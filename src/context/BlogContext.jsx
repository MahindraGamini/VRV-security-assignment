import React, { createContext, useState, useContext } from 'react';


const BlogContext = createContext();


export const BlogProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([

    { id: 1, title: "The Future of Technology", content: "Technology is evolving rapidly, and the possibilities are endless...", date: "2024-01-01" },
    { id: 2, title: "A Guide to Web Development", content: "Web development has come a long way with the introduction of new tools and frameworks...", date: "2024-02-15" },
    { id: 3, title: "Understanding React Hooks", content: "React hooks are one of the most exciting features of React, and they allow you to manage state and side effects...", date: "2024-03-10" },
    { id: 4, title: "How to Build a Node.js API", content: "Node.js makes it easier to build scalable and fast server-side applications...", date: "2024-04-01" },
    { id: 5, title: "CSS Grid: The Future of Layouts", content: "CSS Grid is a powerful layout system that makes it easier to build complex, responsive layouts...", date: "2024-05-18" },
  ]);

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
