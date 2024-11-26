"use client";
import { useState } from "react";
import PostItem from "./PostItem";
import PostModal from "./PostModal";

const Posts = ({ posts, forProfile, handleDelete }) => {
  const [post, setPost] = useState({});

  return (
    <>
      {posts.length === 0 ? (
        <p className="capitalize text-center my-12 text-2xl font-semibold">
          no posts
        </p>
      ) : (
        <div className="mt-14 pb-10 sm:px-5">
          <PostModal post={post} />
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
            2xl:grid-cols-6 gap-4"
          >
            {posts.map((item) => (
              <div
                key={item.id}
                className="w-full h-full flex justify-center items-center"
              >
                <PostItem
                  forProfile={forProfile}
                  post={item}
                  modal={true}
                  setPost={setPost}
                  handleDelete={handleDelete}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Posts;
