import React from "react";

export default function PostCard({ post }) {
  return (
    <div className="card">
      <img src={post.imageUrl} alt={post.title} className="thumb" />
      <div className="info">
        <strong>{post.title}</strong><br />
        <span>{post.region} · {post.category}</span><br />
        <small>🕒 {new Date(post.deadline).toLocaleString()}</small>
      </div>
    </div>
  );
}