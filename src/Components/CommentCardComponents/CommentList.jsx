import React from "react";
import CommentItem from "./CommentItem";

const CommentList = ({ comments, userAvatars }) => {
  return (
    <ul className="space-y-4">
      {comments.map((comment) => (
        <CommentItem
          key={comment.comment_id}
          comment={comment}
          avatarUrl={userAvatars[comment.author]}
        />
      ))}
    </ul>
  );
};

export default CommentList;
