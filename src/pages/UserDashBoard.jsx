import React, { useEffect, useState } from "react";
import Sidebar from "../components/UserNav";
import Shimmer from "../components/Shimmer";

const UserDashboard = () => {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      const url = `https://newsapi.org/v2/everything?q=apple&from=2024-11-22&to=2024-11-22&sortBy=popularity&apiKey=5bd1609590214caf9e4f5386b690dd39`;
      const options = { method: "GET" };

      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error("Failed to fetch articles");
        }
        const result = await response.json();
        if (result.status === "ok") {
          setArticles(result.articles);
        } else {
          throw new Error("Failed to fetch valid articles");
        }
      } catch (error) {
        setError("Failed to load articles");
        console.error(error);
      }
    };

    fetchArticles();
  }, []);

  if (error) {
    return <div className="text-center text-red-600 text-lg">{error}</div>;
  }

  return (
    <div className="flex min-h-screen bg-gray-100 font-spaceGrotesk">
      <Sidebar />

      <main className="ml-0 sm:ml-64 flex-1 p-8 bg-white transition-all duration-300">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Trending News
        </h1>

        {articles.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article, index) => (
              <div
                key={index}
                className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                {article.urlToImage && (
                  <img
                    src={article.urlToImage}
                    alt={article.title}
                    className="w-full h-48 object-cover rounded-md"
                  />
                )}
                <h2 className="text-lg font-semibold text-gray-800 mt-4">{article.title}</h2>
                <p className="text-sm text-gray-600 mt-2">
                  {article.description?.slice(0, 100)}...
                </p>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors duration-300"
                >
                  Read More
                </a>
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
