import { HiOutlineXCircle } from "react-icons/hi";
import PostItem from "./PostItem";

const PostModal = ({ post }) => {
  return (
    <dialog id="my_modal_1" className="modal">
      <div className="modal-box w-fit rounded-lg p-0">
        <form method="dialog">
          <button className="absolute right-2 top-2 outline-none">
            <HiOutlineXCircle className="text-[22px] text-white" />
          </button>
          <PostItem post={post} />
        </form>
      </div>
    </dialog>
  );
};

export default PostModal;
