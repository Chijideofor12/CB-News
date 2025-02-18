import React, { createContext, useState } from "react";

export const VoteContext = createContext();

export const VoteProvider = ({ children }) => {
  const [votedArticles, setVotedArticles] = useState({});
  const [voteCounts, setVoteCounts] = useState({});

  const updateVote = (articleId, increment, currentServerVotes) => {
    if (votedArticles[articleId]) return;
    setVotedArticles((prev) => ({ ...prev, [articleId]: true }));
    setVoteCounts((prev) => ({
      ...prev,
      [articleId]:
        (prev[articleId] !== undefined ? prev[articleId] : currentServerVotes) +
        increment,
    }));
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
        setVoteCounts((prev) => ({
          ...prev,
          [articleId]: data.article.votes,
        }));
      })
      .catch((err) => {
        console.error(err);
        setVoteCounts((prev) => ({
          ...prev,
          [articleId]:
            (prev[articleId] !== undefined
              ? prev[articleId]
              : currentServerVotes) - increment,
        }));
        setVotedArticles((prev) => {
          const updated = { ...prev };
          delete updated[articleId];
          return updated;
        });
      });
  };

  return (
    <VoteContext.Provider value={{ votedArticles, voteCounts, updateVote }}>
      {children}
    </VoteContext.Provider>
  );
};
