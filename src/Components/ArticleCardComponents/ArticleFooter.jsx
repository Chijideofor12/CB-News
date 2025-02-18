import React from "react";
import { FaRegComment } from "react-icons/fa";
import { VoteComponent } from "../VoteComponent";

const ArticleFooter = ({ article, onVoteSuccess }) => (
  <div className="flex items-center space-x-6 mt-4 text-gray-400">
    <div className="flex items-center space-x-2">
      <VoteComponent
        articleId={article.article_id}
        currentVotes={article.votes}
        onVoteSuccess={(updatedVotes) =>
          onVoteSuccess(article.article_id, updatedVotes)
        }
      />
    </div>
    <div className="flex items-center space-x-1">
      <FaRegComment className="text-lg" />
      <span>{article.comment_count}</span>
    </div>
  </div>
);

export default ArticleFooter;
