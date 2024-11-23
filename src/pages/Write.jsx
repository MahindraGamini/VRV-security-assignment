import React, { useState } from "react";
import { useBlogs } from "../context/BlogContext";
import CSidebar from "../components/CreatorNav";
import { Editor } from '@tinymce/tinymce-react';
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'; // Import the styles for the toast notifications

const WriteBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState(""); 
  const { addBlog } = useBlogs();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && content) {
      addBlog({ title, content, date: new Date().toLocaleDateString() });
      setTitle(""); // Reset title
      setContent(""); // Reset content after submission
      toast.success('Post published successfully!'); // Show success toast
    } else {
      toast.error('Please fill in all fields.'); // Show error toast if fields are missing
    }
  };

  return (
    <div className="write-blog-container flex">
      {/* Sidebar */}
      <CSidebar />
      
      {/* Main Content */}
      <main className="write-blog-content flex-1 ml-64 p-8">
        <h1 className="text-2xl font-bold mb-4">Create a New Post</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-group">
            <label htmlFor="title" className="form-label text-sm font-medium">
              Post Title:
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="form-control w-full p-2 border rounded"
              required
            />
          </div>

          {/* TinyMCE Editor for Post Content */}
          <div className="form-group">
            <label htmlFor="content" className="form-label text-sm font-medium">
              Post Content:
            </label>
            <Editor
              apiKey="3tyyaj049ws7lfwkluh6d4fq94g6g12kg47xsmsnj6qnb3yk" // API key
              value={content}
              onEditorChange={(newContent) => setContent(newContent)} // Capture content from editor
              init={{
                plugins:
                  "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount",
                toolbar:
                  "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat",
              }}
            />
          </div>

          <button
            type="submit"
            className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none"
          >
            Publish Post
          </button>
        </form>
      </main>

      {/* Toast container to render the notifications */}
      <ToastContainer />
    </div>
  );
};

export default WriteBlog;
