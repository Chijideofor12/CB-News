import React, { useEffect, useState, useContext } from "react";
import { useParams, NavLink } from "react-router";
import { FaRegThumbsUp, FaRegThumbsDown, FaRegComment } from "react-icons/fa";
import { VoteContext } from "../Components/VoteContext";
import CommentSection from "../Components/CommentSection";

export const SingleArticle = () => {
  const { article_id } = useParams();
  const [article, setArticle] = useState(null);
  const { votedArticles, voteCounts, updateVote } = useContext(VoteContext);
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    fetch(
      `https://backend-nc-news-q8rj.onrender.com/api/articles/${article_id}`
    )
      .then((res) => res.json())
      .then((data) => {
        setArticle(data.article || data);
      })
      .catch((err) => console.error(err));
  }, [article_id]);

  if (!article) return <p className="pt-16 text-center">Loading...</p>;
  const currentVotes =
    votedArticles[article.article_id] ||
    voteCounts[article.article_id] !== undefined
      ? voteCounts[article.article_id]
      : article.votes;

  return (
    <section className="min-h-screen pt-16 p-4">
      <h1 className="text-center text-2xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
        {article.title}
      </h1>
      <div className="max-w-6xl mx-auto grid grid-cols-1 gap-6 p-8">
        <div className="rounded-xl p-8 border border-white/40 hover:translate-y-1 transition-all">
          <NavLink to={`/article/${article.article_id}`}>
            <img
              src={article.article_img_url}
              alt={article.title}
              className="w-full h-64 object-cover rounded-md mb-4"
            />
          </NavLink>
          <p className="mb-4">{article.body}</p>
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
            <div className="flex items-center space-x-2">
              <button
                onClick={() => updateVote(article.article_id, 1, article.votes)}
                className="focus:outline-none cursor-pointer disabled:cursor-not-allowed"
                aria-label="Upvote"
                disabled={!!votedArticles[article.article_id]}
                style={{ opacity: votedArticles[article.article_id] ? 0.5 : 1 }}
              >
                <FaRegThumbsUp className="text-lg hover:text-blue-900" />
              </button>
              <button
                onClick={() =>
                  updateVote(article.article_id, -1, article.votes)
                }
                className="focus:outline-none cursor-pointer disabled:cursor-not-allowed"
                aria-label="Downvote"
                disabled={!!votedArticles[article.article_id]}
                style={{ opacity: votedArticles[article.article_id] ? 0.5 : 1 }}
              >
                <FaRegThumbsDown className="text-lg hover:text-red-400" />
              </button>
              <span>{currentVotes}</span>
            </div>
            <div
              className="flex items-center space-x-1 cursor-pointer"
              onClick={() => setShowComments((prev) => !prev)}
            >
              <FaRegComment className="text-lg" />
              <span>{article.comment_count}</span>
            </div>
          </div>
          {showComments && (
            <div className="mt-6">
              <CommentSection articleId={article.article_id} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
