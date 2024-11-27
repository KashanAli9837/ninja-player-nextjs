import { HiOutlineXCircle } from "react-icons/hi2";
import PostItem from "./PostItem";

const PostModal = ({ post }) => {
  return (
    <dialog id="my_modal_1" className="modal">
      <div className="modal-box w-[80%] md:w-fit rounded-lg p-0">
        <form method="dialog" className="">
          <button className="absolute right-2 top-2 outline-none mix-blend-difference">
            <HiOutlineXCircle className="text-[22px] text-white" />
          </button>
          <PostItem post={post} />
        </form>
      </div>
    </dialog>
  );
};

export default PostModal;
