import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export const NewArticle = () => {
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [topic, setTopic] = useState("");
  const [body, setBody] = useState("");
  const [articleImgUrl, setArticleImgUrl] = useState("");
  const [topics, setTopics] = useState([]);
  const [error, setError] = useState(null);
  const [posting, setPosting] = useState(false);
  const [postSuccess, setPostSuccess] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://backend-nc-news-q8rj.onrender.com/api/topics")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch topics");
        }
        return res.json();
      })
      .then((data) => {
        setTopics(data.topics || []);
      })
      .catch((err) => {
        console.error("Error fetching topics:", err);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    setPostSuccess(null);

    if (!author.trim() || !title.trim() || !topic.trim() || !body.trim()) {
      setError("Please fill in all required fields.");
      return;
    }

    setPosting(true);

    const requestBody = {
      author,
      title,
      topic,
      body,
      article_img_url: articleImgUrl,
    };

    fetch("https://backend-nc-news-q8rj.onrender.com/api/articles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    })
      .then((res) => {
        if (!res.ok) {
          return res.text().then((text) => {
            throw new Error(text || "Failed to post article");
          });
        }
        return res.json();
      })
      .then(() => {
        setPostSuccess("Article posted successfully!");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      })
      .catch((err) => {
        console.error("Error posting article:", err);
        setError(err.message || "An error occurred. Please try again.");
      })
      .finally(() => setPosting(false));
  };

  return (
    <section className="min-h-screen pt-16 flex justify-center items-center bg-[rgba(10,10,10,0.8)] text-white">
      <div className="w-full max-w-2xl p-12 border border-white/30 rounded-xl bg-gray-800 shadow-lg">
        <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
          Post a New Article
        </h1>
        {error && <p className="text-red-500 mb-6 text-center">{error}</p>}
        {postSuccess && (
          <p className="text-green-500 mb-6 text-center">{postSuccess}</p>
        )}
        <form onSubmit={handleSubmit} noValidate className="space-y-6">
          <div>
            <label htmlFor="author" className="block mb-2 text-lg">
              Author *
            </label>
            <input
              id="author"
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Enter author"
              className="w-full p-4 rounded bg-transparent border border-white/40 text-white placeholder-gray-300"
              required
            />
          </div>
          <div>
            <label htmlFor="title" className="block mb-2 text-lg">
              Title *
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter title"
              className="w-full p-4 rounded bg-transparent border border-white/40 text-white placeholder-gray-300"
              required
            />
          </div>
          <div>
            <label htmlFor="topic" className="block mb-2 text-lg">
              Topic *
            </label>
            <select
              id="topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full p-4 rounded bg-transparent border border-white/40 text-white"
              required
            >
              <option value="">Select a topic</option>
              {topics.map((t) => (
                <option key={t.slug} value={t.slug}>
                  {t.slug}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="body" className="block mb-2 text-lg">
              Body *
            </label>
            <textarea
              id="body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Enter article body"
              className="w-full p-4 rounded bg-transparent border border-white/40 text-white placeholder-gray-300"
              required
            ></textarea>
          </div>
          <div>
            <label htmlFor="articleImgUrl" className="block mb-2 text-lg">
              Article Image URL (optional)
            </label>
            <input
              id="articleImgUrl"
              type="text"
              value={articleImgUrl}
              onChange={(e) => setArticleImgUrl(e.target.value)}
              placeholder="Enter image URL"
              className="w-full p-4 rounded bg-transparent border border-white/40 text-white placeholder-gray-300"
            />
          </div>
          <button
            type="submit"
            disabled={posting}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white p-4 rounded transition-colors"
          >
            {posting ? "Posting..." : "Post Article"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default NewArticle;
