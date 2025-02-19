import React from "react";
import { FaRegComment } from "react-icons/fa";
import { VoteComponent } from "../VoteComponent";
import { NavLink } from "react-router";

const ArticleFooter = ({ article, onVoteSuccess }) => (
  <div className="flex items-center space-x-6 mt-4 text-gray-400">
    <div className="flex items-center space-x-2">
      <VoteComponent
        articleId={article.article_id}
        currentVotes={article.votes}
        onVoteSuccess={onVoteSuccess}
      />
    </div>
    <NavLink
      to={`/article/${article.article_id}`}
      state={{ showComments: true }}
      className="flex items-center space-x-1 hover:text-white transition-colors"
    >
      <FaRegComment className="text-lg" />
      <span>{article.comment_count}</span>
    </NavLink>
  </div>
);

export default ArticleFooter;
