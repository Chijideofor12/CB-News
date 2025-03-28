import React, { useState } from "react";
import { useNavigate } from "react-router";

const DeleteArticleButton = ({ articleId }) => {
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);

  const handleDelete = () => {
    fetch(
      `https://backend-nc-news-q8rj.onrender.com/api/articles/${articleId}`,
      {
        method: "DELETE",
      }
    )
      .then((res) => {
        if (res.status === 204) {
          setSuccess(true);
          setTimeout(() => {
            navigate("/");
          }, 2000);
          throw new Error("Failed to delete the article");
        }
      })
      .catch((err) => {
        console.error("Error deleting article:", err);
      });
  };

  return (
    <div>
      {success ? (
        <p className="text-green-500 font-bold">
          Article successfully deleted!
        </p>
      ) : (
        <button
          onClick={handleDelete}
          className="bg-red-600 text-white py-2 px-4 rounded cursor-pointer hover:text-yellow-600"
        >
          Delete Article
        </button>
      )}
    </div>
  );
};

export default DeleteArticleButton;
