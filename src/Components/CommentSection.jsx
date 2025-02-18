import React, { useEffect, useState } from "react";
import CommentsHeader from "../Components/CommentCardComponents/CommentsHeader";
import CommentForm from "../Components/CommentCardComponents/CommentForm";
import CommentList from "../Components/CommentCardComponents/CommentList";

const CommentSection = ({ articleId, currentUser }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userAvatars, setUserAvatars] = useState({});

  const [showAddForm, setShowAddForm] = useState(false);
  const [username, setUsername] = useState("");
  const [newComment, setNewComment] = useState("");
  const [posting, setPosting] = useState(false);
  const [postError, setPostError] = useState(null);
  const [postSuccess, setPostSuccess] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(
      `https://backend-nc-news-q8rj.onrender.com/api/articles/${articleId}/comments`
    )
      .then((res) => res.json())
      .then((data) => {
        setComments(data.comments || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [articleId]);

  useEffect(() => {
    const authors = [...new Set(comments.map((comment) => comment.author))];
    authors.forEach((author) => {
      if (!userAvatars[author]) {
        fetch(`https://backend-nc-news-q8rj.onrender.com/api/users/${author}`)
          .then((res) => res.json())
          .then((data) => {
            setUserAvatars((prev) => ({
              ...prev,
              [author]: data.user.avatar_url,
            }));
          })
          .catch((err) => console.error(err));
      }
    });
  }, [comments, userAvatars]);

  const handleAddComment = (e) => {
    e.preventDefault();
    setPosting(true);
    setPostError(null);
    setPostSuccess(null);

    fetch(
      `https://backend-nc-news-q8rj.onrender.com/api/articles/${articleId}/comments`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, body: newComment }),
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to post comment");
        }
        return res.json();
      })
      .then((data) => {
        setComments((prevComments) => [data.comment, ...prevComments]);
        setNewComment("");
        setUsername("");
        setShowAddForm(false);
        setPosting(false);
        setPostSuccess("Your comment has been posted!");
        setTimeout(() => setPostSuccess(null), 3000);
      })
      .catch((err) => {
        console.error(err);
        setPostError(
          " Unable to post comment. Please enter details on the form."
        );
        setPosting(false);
      });
  };

  const handleDeleteSuccess = (commentId) => {
    setComments((prevComments) =>
      prevComments.filter((comment) => comment.comment_id !== commentId)
    );
  };

  return (
    <div className="mt-6 p-4 rounded-xl border border-white/40 bg-transparent">
      <CommentsHeader onToggleForm={() => setShowAddForm((prev) => !prev)} />
      {postSuccess && <p className="mb-4 text-green-500">{postSuccess}</p>}
      {postError && <p className="mb-4 text-red-500">{postError}</p>}
      {showAddForm && (
        <CommentForm
          username={username}
          newComment={newComment}
          posting={posting}
          onUsernameChange={(e) => setUsername(e.target.value)}
          onCommentChange={(e) => setNewComment(e.target.value)}
          onSubmit={handleAddComment}
        />
      )}
      {loading ? (
        <p className="text-white">Loading comments...</p>
      ) : comments.length > 0 ? (
        <CommentList
          comments={comments}
          userAvatars={userAvatars}
          currentUser={currentUser}
          onDeleteSuccess={handleDeleteSuccess}
        />
      ) : (
        <p className="text-white">No comments yet.</p>
      )}
    </div>
  );
};

export default CommentSection;
