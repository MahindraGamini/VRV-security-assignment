import React, { useEffect, useState } from "react";
import Sidebar from "../components/UserNav";
import Shimmer from "../components/Shimmer";
import { Link } from "react-router-dom";

const UserDashboard = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  // Fetch posts from the DummyJSON API
  useEffect(() => {
    const fetchPosts = async () => {
      const url = "https://dummyjson.com/posts";
      
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        const data = await response.json();
        setPosts(data.posts);  // Set posts data from the API response
      } catch (error) {
        setError("Failed to load posts");
        console.error(error);
      }
    };

    fetchPosts();
  }, []);

  if (error) {
    return <div className="text-center text-red-600 text-lg">{error}</div>;
  }

  return (
    <div className="flex min-h-screen bg-gray-100 font-spaceGrotesk">
      <Sidebar />

      <main className="ml-0 sm:ml-64 flex-1 p-8 bg-white transition-all duration-300">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Trending Posts
        </h1>

        {posts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <div
                key={post.id}
                className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <h2 className="text-lg font-semibold text-gray-800">{post.title}</h2>
                <p className="text-sm text-gray-600 mt-2">{post.body.slice(0, 100)}...</p>
                
             
                <div className="mt-2 text-xs text-gray-500">
                  {post.tags?.map((tag, idx) => (
                    <span key={idx} className="mr-2 inline-block bg-gray-200 px-2 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                
             
                <div className="flex justify-between text-sm text-gray-500 mt-4">
                  <span>{post.reactions?.likes} Likes</span>
                  <span>{post.reactions?.dislikes} Dislikes</span>
                </div>
                <div className="text-sm text-gray-500 mt-1">Views: {post.views}</div>

               
                <Link
                  to="#"
                  className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors duration-300"
                >
                  Read More
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <Shimmer />
        )}
      </main>
    </div>
  );
};

export default UserDashboard;
