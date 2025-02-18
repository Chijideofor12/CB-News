import React, { useEffect, useState } from "react";

const CommentSection = ({ articleId }) => {
  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(false);
  const [userAvatars, setUserAvatars] = useState({});

  useEffect(() => {
    setLoadingComments(true);
    fetch(
      `https://backend-nc-news-q8rj.onrender.com/api/articles/${articleId}/comments`
    )
      .then((res) => res.json())
      .then((data) => {
        setComments(data.comments || []);
        setLoadingComments(false);
      })
      .catch((err) => {
        console.error(err);
        setLoadingComments(false);
      });
  }, [articleId]);

  useEffect(() => {
    const authors = [...new Set(comments.map((comment) => comment.author))];
    authors.forEach((author) => {
      if (!userAvatars[author]) {
        fetch(`https://backend-nc-news-q8rj.onrender.com/api/users/${author}`)
          .then((res) => res.json())
          .then((data) => {
            // Adjust property names if your API returns a different structure.
            setUserAvatars((prev) => ({
              ...prev,
              [author]: data.user.avatar_url,
            }));
          })
          .catch((err) => console.error(err));
      }
    });
  }, [comments, userAvatars]);

  return (
    <div className="mt-6 p-4 rounded-xl border border-white/40 bg-transparent">
      <h2 className="text-lg font-bold mb-4 text-white">Comments</h2>
      {loadingComments ? (
        <p className="text-white">Loading comments...</p>
      ) : comments.length > 0 ? (
        <ul className="space-y-4">
          {comments.map((comment) => (
            <li
              key={comment.comment_id}
              className="border-b border-white/30 pb-2"
            >
              <div className="flex items-center space-x-2 mb-1">
                {userAvatars[comment.author] ? (
                  <img
                    src={userAvatars[comment.author]}
                    alt={`${comment.author}'s avatar`}
                    className="w-6 h-6 rounded-full"
                  />
                ) : (
                  <div className="w-6 h-6 rounded-full bg-gray-500" />
                )}
                <span className="font-bold text-sm text-white">
                  {comment.author}
                </span>
                <span className="text-xs text-gray-300">
                  {new Date(comment.created_at).toLocaleString()}
                </span>
              </div>
              <p className="text-sm text-white">{comment.body}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-white">No comments yet.</p>
      )}
    </div>
  );
};

export default CommentSection;
