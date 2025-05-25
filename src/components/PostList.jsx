import React from "react";
import PostCard from "./PostCard";

export default function PostList({ posts, title }) {
  return (
    <div className="content">
      <div id="popular">
        <h2 style={{ padding: "10px 20px" }}>{title}</h2>
        <div id="popularList" className="card-list">
          {posts.map((post, index) => (
            <PostCard key={index} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}