"use client";
import { HiOutlineXCircle } from "react-icons/hi2";

const MessageBox = () => {
  return (
    <div className="fixed bottom-4 right-4 w-fit boxMessage hidden">
      <div role="alert" className="message alert alert-error">
        <button
          className="outline-none absolute top-2 right-2"
          onClick={() =>
            document.querySelector(".boxMessage").classList.add("hidden")
          }
        >
          <HiOutlineXCircle className="text-[22px] text-white" />
        </button>
        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="h-6 w-6 shrink-0 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <span className="boxMessageContent pr-12">
            Sign In to create a post!
          </span>
        </div>
      </div>
    </div>
  );
};

export default MessageBox;
