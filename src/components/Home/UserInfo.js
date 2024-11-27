import Image from "next/image";

function UserInfo({ user }) {
  return (
    <div className="mt-2">
      <p className="font-bold">Posted By :</p>

      <div className="flex gap-2 items-center mb-3 mt-2">
        <Image
          src={user?.userImage || "/images/user.png"}
          alt="user-image"
          width={40}
          height={40}
          className={`${image && "rounded-full"}`}
        />
        <div>
          <h2 className="text-[14px] font-medium">
            {user?.userName || "Anonymous"}
          </h2>
          <h2 className="text-sm font-normal">{user?.email}</h2>
        </div>
      </div>
    </div>
  );
}

export default UserInfo;
