import React, { useEffect, useState } from "react";
import { useParams, NavLink, useLocation } from "react-router";
import { FaRegComment } from "react-icons/fa";
import { VoteComponent } from "../Components/VoteComponent";
import CommentSection from "../Components/CommentSection";

export const SingleArticle = () => {
  const { article_id } = useParams();
  const location = useLocation();
  const [article, setArticle] = useState(null);
  const [votes, setVotes] = useState(null);
  const [showComments, setShowComments] = useState(false);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(
      `https://backend-nc-news-q8rj.onrender.com/api/articles/${article_id}`
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("Article not found");
        }
        return res.json();
      })
      .then((data) => {
        const fetchedArticle = data.article || data;
        if (!fetchedArticle || !fetchedArticle.article_id) {
          throw new Error("Article not found");
        }
        setArticle(fetchedArticle);
        setVotes(fetchedArticle.votes);
        setFetchError(null);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setFetchError("Article not found");
        setLoading(false);
      });
  }, [article_id]);

  useEffect(() => {
    if (location.state?.showComments) {
      setShowComments(true);
    }
  }, [location.state]);

  if (loading)
    return <p className="pt-16 text-center text-white">Loading...</p>;
  if (fetchError)
    return (
      <section className="pt-16 text-center text-red-500 font-bold">
        <p>{fetchError}</p>
        <NavLink to="/" className="text-blue-300 hover:underline">
          Back to Home
        </NavLink>
      </section>
    );

  return (
    <section className="min-h-screen pt-16 p-4">
      <header>
        <h1 className="text-center text-2xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
          {article.title}
        </h1>
      </header>
      <main className="max-w-6xl mx-auto grid grid-cols-1 gap-6 p-8">
        <div className="rounded-xl p-8 border border-white/30 hover:translate-y-1 transition-all">
          <NavLink to={`/article/${article.article_id}`}>
            <img
              src={article.article_img_url}
              alt={article.title}
              className="w-full h-auto max-h-96 object-contain rounded-md mb-4"
            />
          </NavLink>
          <p className="mb-4 text-white">{article.body}</p>
          <div className="mt-2">
            <p className="text-sm">
              <strong className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                Topic:
              </strong>{" "}
              <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                {article.topic}
              </span>
            </p>
            <p className="text-sm">
              <strong className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                Author:
              </strong>{" "}
              <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                {article.author}
              </span>
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4 mt-4 text-gray-400">
            <div className="flex items-center space-x-2">
              <VoteComponent
                articleId={article.article_id}
                currentVotes={votes}
                onVoteSuccess={(updatedVotes) => setVotes(updatedVotes)}
              />
            </div>
            <div
              className="flex items-center space-x-1 cursor-pointer"
              onClick={() => setShowComments((prev) => !prev)}
            >
              <FaRegComment className="text-lg" />
              <span>{article.comment_count}</span>
            </div>
          </div>
        </div>
        {showComments && (
          <CommentSection
            articleId={article.article_id}
            currentUser="cooljmessy"
          />
        )}
      </main>
    </section>
  );
};

export default SingleArticle;
