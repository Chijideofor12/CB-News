import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ArticleCard } from "../Components/ArticleCard";
import { Pagination } from "../Components/Pagination";
import FilterTopicBar from "../Components/filterTopicBar";

export const HomePage = () => {
  const [articleLists, setArticleLists] = useState([]);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const limit = 9;

  const [searchParams, setSearchParams] = useSearchParams();
  const topic = searchParams.get("topic") || "";

  useEffect(() => {
    setPage(1);
  }, [topic]);

  useEffect(() => {
    let url = `https://backend-nc-news-q8rj.onrender.com/api/articles?limit=${limit}&p=${page}`;
    if (topic) {
      url += `&topic=${topic}`;
    }
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setArticleLists(data.articles || []);
        setTotalCount(data.total_count || 0);
      })
      .catch((error) => console.error("Error fetching articles:", error));
  }, [page, topic]);

  const totalPages = Math.ceil(totalCount / limit);

  const updateArticleVote = (articleId, updatedVotes) => {
    setArticleLists((prevArticles) =>
      prevArticles.map((article) =>
        article.article_id === articleId
          ? { ...article, votes: updatedVotes }
          : article
      )
    );
  };

  const handleTopicChange = (newTopic) => {
    setSearchParams({ topic: newTopic });
  };

  return (
    <section className="min-h-screen pt-16">
      <h1 className="text-center text-2xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
        Articles
      </h1>
      <div className="max-w-6xl mx-auto px-4">
        <FilterTopicBar topic={topic} setTopic={handleTopicChange} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4">
        {articleLists.map((article) => (
          <ArticleCard
            key={article.article_id}
            article={article}
            onVoteSuccess={updateArticleVote}
          />
        ))}
      </div>
      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </section>
  );
};

export default HomePage;
