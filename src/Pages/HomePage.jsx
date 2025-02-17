import React, { useEffect, useState } from "react";
import { FaRegThumbsUp, FaRegComment } from "react-icons/fa";

export const HomePage = () => {
  const [articleLists, setArticleLists] = useState([]);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const limit = 9;

  useEffect(() => {
    fetch(
      `https://backend-nc-news-q8rj.onrender.com/api/articles?limit=${limit}&p=${page}`
    )
      .then((response) => response.json())
      .then((data) => {
        setArticleLists(data.articles || []);
        setTotalCount(data.total_count || 0);
      })
      .catch((error) => console.error("Error fetching articles:", error));
  }, [page]);

  const totalPages = Math.ceil(totalCount / limit);

  return (
    <section className="min-h-screen pt-16">
      <h1 className="text-center text-2xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
        Articles
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4">
        {articleLists.map((article) => (
          <div
            key={article.article_id}
            className="rounded-xl p-8 border border-white/30 hover:translate-y-1 transition-all"
          >
            <img
              src={article.article_img_url}
              alt={article.title}
              className="w-full h-48 object-cover rounded-md mb-4"
            />

            <h2 className="text-xl font-bold">{article.title}</h2>

            <div className="mt-2">
              <p className="text-sm">
                <span className="font-semibold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                  Topic:
                </span>{" "}
                <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                  {article.topic}
                </span>
              </p>
              <p className="text-sm">
                <span className="font-semibold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                  Author:
                </span>{" "}
                <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                  {article.author}
                </span>
              </p>
            </div>

            <div className="flex items-center space-x-6 mt-4 text-gray-400">
              <div className="flex items-center space-x-1">
                <FaRegThumbsUp className="text-lg" />
                <span>{article.votes}</span>
              </div>

              <div className="flex items-center space-x-1">
                <FaRegComment className="text-lg" />
                <span>{article.comment_count}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-4 space-x-4">
        <button
          disabled={page <= 1}
          onClick={() => setPage(page - 1)}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-lg">
          Page {page} of {totalPages}
        </span>
        <button
          disabled={page >= totalPages}
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </section>
  );
};
