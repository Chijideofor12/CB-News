import React, { useState, useEffect } from "react";
import { FaRegThumbsUp, FaRegThumbsDown } from "react-icons/fa";

const votedArticles = {};

export const VoteComponent = ({ articleId, currentVotes, onVoteSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [localVotes, setLocalVotes] = useState(currentVotes);
  const [hasVoted, setHasVoted] = useState(!!votedArticles[articleId]);

  useEffect(() => {
    setLocalVotes(currentVotes);
  }, [currentVotes]);

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
        console.log("API response:", data);
        const updatedVotes =
          data.article && typeof data.article.votes === "number"
            ? data.article.votes
            : localVotes + increment;
        console.log("Updated votes:", updatedVotes);
        setLocalVotes(updatedVotes);
        setHasVoted(true);
        // Mark this article as voted globally
        votedArticles[articleId] = true;
        setLoading(false);
        if (onVoteSuccess) {
          onVoteSuccess(updatedVotes);
        }
      })
      .catch((err) => {
        console.error("Vote error:", err);
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
      <span>{localVotes}</span>
    </div>
  );
};
