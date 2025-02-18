import React from "react";
import ArticleImage from "../Components/ArticleCardComponents/ArticleImage";
import ArticleTitle from "../Components/ArticleCardComponents/ArticleTitle";
import ArticleMetadata from "../Components/ArticleCardComponents/ArticleMetadata";
import ArticleFooter from "../Components/ArticleCardComponents/ArticleFooter";

export const ArticleCard = ({ article, onVoteSuccess }) => {
  return (
    <div className="rounded-xl p-8 border border-white/30 hover:translate-y-1 transition-all">
      <ArticleImage article={article} />
      <ArticleTitle article={article} />
      <ArticleMetadata article={article} />
      <ArticleFooter article={article} onVoteSuccess={onVoteSuccess} />
    </div>
  );
};
