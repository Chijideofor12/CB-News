import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ArticleCard } from "../Components/ArticleCard";
import { Pagination } from "../Components/Pagination";
import FilterTopicBar from "../Components/FilterTopicBar";
import SortBar from "../Components/SortBar";

export const HomePage = () => {
  const [articleLists, setArticleLists] = useState([]);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const limit = 9;

  const [searchParams, setSearchParams] = useSearchParams();
  let topic = searchParams.get("topic") || "";
  let sortBy = searchParams.get("sort_by") || "created_at";
  let order = searchParams.get("order") || "desc";

  const allowedSortBy = ["title", "created_at", "votes"];
  if (!allowedSortBy.includes(sortBy)) {
    sortBy = "created_at";
    setSearchParams({ topic, sort_by: "created_at", order });
  }

  useEffect(() => {
    setPage(1);
  }, [topic, sortBy, order]);

  useEffect(() => {
    let url = `https://backend-nc-news-q8rj.onrender.com/api/articles?limit=${limit}&p=${page}`;
    if (topic) url += `&topic=${topic}`;
    if (sortBy) url += `&sort_by=${sortBy}`;
    if (order) url += `&order=${order}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setArticleLists(data.articles || []);
        setTotalCount(data.total_count || 0);
      })
      .catch((error) => console.error("Error fetching articles:", error));
  }, [page, topic, sortBy, order]);

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
    setSearchParams({ topic: newTopic, sort_by: sortBy, order: order });
  };

  const handleSortByChange = (newSortBy) => {
    setSearchParams({ topic: topic, sort_by: newSortBy, order: order });
  };

  const handleOrderChange = (newOrder) => {
    setSearchParams({ topic: topic, sort_by: sortBy, order: newOrder });
  };

  return (
    <section className="min-h-screen pt-16">
      <h1 className="text-center text-2xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
        Articles
      </h1>
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-wrap items-center justify-between">
          <FilterTopicBar topic={topic} setTopic={handleTopicChange} />
          <SortBar
            sortBy={sortBy}
            setSortBy={handleSortByChange}
            order={order}
            setOrder={handleOrderChange}
          />
        </div>
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
