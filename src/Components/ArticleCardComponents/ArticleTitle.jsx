import React from "react";
import { NavLink } from "react-router";

const ArticleTitle = ({ article }) => (
  <h2 className="text-xl font-bold">
    <NavLink to={`/article/${article.article_id}`}>{article.title}</NavLink>
  </h2>
);

export default ArticleTitle;
