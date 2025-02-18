import React, { useState } from "react";
import { FaRegThumbsUp, FaRegThumbsDown } from "react-icons/fa";

export const VoteComponent = ({ articleId, currentVotes, onVoteSuccess }) => {
  const [hasVoted, setHasVoted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleVote = (increment) => {
    if (hasVoted || loading) return;
    setLoading(true);
    fetch(
      `https://backend-nc-news-q8rj.onrender.com/api/articles/${articleId}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ inc_votes: increment }),
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("Vote update failed");
        }
        return res.json();
      })
      .then((data) => {
        setHasVoted(true);
        setLoading(false);
        if (onVoteSuccess) {
          onVoteSuccess(data.article.votes);
        }
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={() => handleVote(1)}
        className="focus:outline-none cursor-pointer disabled:cursor-not-allowed"
        disabled={hasVoted || loading}
        aria-label="Upvote"
      >
        <FaRegThumbsUp className="text-lg hover:text-blue-400" />
      </button>
      <button
        onClick={() => handleVote(-1)}
        className="focus:outline-none cursor-pointer disabled:cursor-not-allowed"
        disabled={hasVoted || loading}
        aria-label="Downvote"
      >
        <FaRegThumbsDown className="text-lg hover:text-red-400" />
      </button>
      <span>{currentVotes}</span>
    </div>
  );
};
