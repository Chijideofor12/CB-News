import React from "react";
import { NavLink } from "react-router";

const ArticleImage = ({ article }) => (
  <NavLink to={`/article/${article.article_id}`}>
    <img
      src={article.article_img_url}
      alt={article.title}
      className="w-full h-48 object-cover rounded-md mb-4"
    />
  </NavLink>
);

export default ArticleImage;
