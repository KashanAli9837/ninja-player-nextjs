"use client";
import { HiOutlineCalendar, HiOutlineLocationMarker } from "react-icons/hi";
import UserInfo from "./UserInfo";
import Image from "next/image";

const PostItem = ({ post, modal = false, setPost, forProfile = false, handleDelete = () => {} }) => {
  const handleClick = (item) => {
    setPost(item);
    document.getElementById("my_modal_1").showModal();
  };

  return (
    <div
      className="max-w-[350px] bg-white border border-gray-200 rounded-lg shadow
     dark:bg-gray-800 dark:border-gray-700 w-full h-full flex flex-col"
    >
      <Image
        className="rounded-t-lg w-full h-[180px] object-cover bg-[#F1F1FA]"
        src={post?.image || "/images/placeholder.jpg"}
        alt="banner"
        width={100}
        height={100}
        priority="true"
        onError={(e) => {
          e.target.src = "/images/placeholder.jpg";
        }}
      />
      <div className="p-6 flex flex-col flex-1">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {post?.title}
        </h5>
        <div className="flex items-center gap-2 mb-2 text-orange-500 text-xs justify-start">
          <HiOutlineCalendar size={"15px"} />
          {post?.date}
        </div>
        <div className="flex items-center gap-2 mb-2 text-blue-500 text-xs justify-start">
          <HiOutlineLocationMarker size={"15px"} />
          {post?.location}
        </div>
        <p className="mb-3 font-normal text-sm text-gray-700 dark:text-gray-400">
          {!modal ? post?.desc : `${post?.desc?.length > 50 ? post?.desc.slice(0, 50) + "..." : post?.desc}`}
        </p>
        {modal ? (
          <div className="flex items-end flex-1">
            {forProfile ? (
              <a
                onClick={() => handleDelete(post.id)}
                className="button inline-flex items-center px-6 py-3 cursor-pointer text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 h-fit"
              >
                Delete
              </a>
            ) : (
              <a
                onClick={() => handleClick(post)}
                className="button inline-flex items-center px-3 py-3 cursor-pointer text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 h-fit"
              >
                Read more
                <svg
                  className="rtl:rotate-180 w-3 h-3.5 ms-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </a>
            )}
          </div>
        ) : (
          <UserInfo user={post} />
        )}
      </div>
    </div>
  );
};

export default PostItem;
