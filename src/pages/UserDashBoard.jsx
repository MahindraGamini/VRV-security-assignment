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
        console.log(response)
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
    return <div>{error}</div>;
  }

  return (
    
    <>  
    
      <div className="flex min-h-screen bg-gray-100">
    
      <Sidebar/>

      <main className="ml-64 flex-1 p-8 bg-white">
        <h1 className="text-2xl font-bold text-center">News Articles</h1>
        {articles.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {articles.map((article, index) => (
              <div
                key={index}
                className="article-card p-4 bg-white rounded-lg shadow-md"
              >
                {article.urlToImage && (
                  <img
                    src={article.urlToImage}
                    alt={article.title}
                    className="w-full h-56 object-cover rounded-md"
                  />
                )}
                <h2 className="text-xl font-semibold mt-4">{article.title}</h2>
                <p className="text-sm text-gray-600">{article.description}</p>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 text-blue-600"
                >
                  Read Full Article
                </a>
              </div>
            ))}
          </div>
        ) : (
         <Shimmer/>
        )}

        
      </main>
     
    </div>
    </>

  );
};

export default UserDashboard;
