import React from "react";
import CommentItem from "./CommentItem";

const CommentList = ({
  comments,
  userAvatars,
  currentUser,
  onDeleteSuccess,
}) => {
  return (
    <ul className="space-y-4">
      {comments.map((comment) => (
        <CommentItem
          key={comment.comment_id}
          comment={comment}
          avatarUrl={userAvatars[comment.author]}
          currentUser={currentUser}
          onDeleteSuccess={onDeleteSuccess}
        />
      ))}
    </ul>
  );
};

export default CommentList;
