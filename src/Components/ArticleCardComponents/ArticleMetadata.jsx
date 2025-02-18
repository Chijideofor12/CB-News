import React from "react";

const ArticleMetadata = ({ article }) => (
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
);

export default ArticleMetadata;
