"use client";

import { doc, getFirestore, setDoc } from "firebase/firestore";
import { HiOutlineXCircle } from "react-icons/hi";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CldUploadWidget } from "next-cloudinary";
import gamesListData from "@/lib/gamesListData";
import app from "@/lib/firebaseConfig";
import Link from "next/link";

const today = new Date();
const formattedDate = today.toISOString().split("T")[0];
const db = getFirestore(app);

function Form() {
  const { data: session } = useSession();
  const initial = {
    title: "",
    desc: "",
    location: "",
    game: "Cricket",
    date: formattedDate,
    userName: session?.user?.name,
    userImage: session?.user?.image || null,
    email: session?.user?.email,
  };
  const [inputs, setInputs] = useState(initial);
  const [showLoader, setShowLoader] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push("/");
      document.querySelector(".boxMessage").classList.remove("hidden");
    }
  }, [session]);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowLoader(true);
    const id = Date.now().toString();
    await setDoc(doc(db, "posts", id), { id, ...inputs });
    setShowLoader(false);
    setShowSuccess(true);
    setInputs(initial);
  };

  return (
    <>
      {showSuccess && (
        <div className="fixed bottom-4 right-4 w-fit boxMessage2">
          <div role="alert" className="message alert alert-success">
            <button
              className="outline-none absolute top-2 right-2"
              onClick={() => setShowSuccess(false)}
            >
              <HiOutlineXCircle className="text-[22px] text-white" />
            </button>
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 shrink-0 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="boxMessageContent pr-12">
                Post created successfully! <br />
                <Link href="/" className="underline underline-offset-2">Go To Homepage</Link>
              </span>
            </div>
          </div>
        </div>
      )}

      <CldUploadWidget
        options={{ sources: ["local", "url"] }}
        uploadPreset="preset for ninja player - nextjs"
        onSuccess={(result, { widget }) => {
          const image =
            "https://res.cloudinary.com/dhri1x2cv/image/upload/" +
            result.info.public_id;
          setInputs({ ...inputs, image });
        }}
        onQueuesEnd={(result, { widget }) => {
          widget.close();
        }}
      >
        {({ open }) => {
          function handleOnClick() {
            setInputs({ ...inputs, image: undefined });
            open();
          }
          return (
            <button
              onClick={() => handleOnClick()}
              className={`btn w-full mb-4 ${
                inputs?.image && "btn-disabled"
              }`}
            >
              {inputs?.image
                ? "Image uploaded successfully!"
                : "Upload an image - optional"}
            </button>
          );
        }}
      </CldUploadWidget>

      <form onSubmit={handleSubmit} className="flex flex-col items-end gap-4">
        <input
          type="text"
          name="title"
          placeholder="Title"
          required
          value={inputs?.title}
          onChange={handleChange}
          maxLength={30}
          className="input input-bordered w-full"
        />
        <textarea
          name="desc"
          className="w-full resize-none textarea textarea-bordered"
          required
          value={inputs?.desc}
          onChange={handleChange}
          rows={3}
          maxLength={150}
          placeholder="Write Description here"
        />
        <input
          type="text"
          placeholder="Location"
          name="location"
          required
          value={inputs?.location}
          onChange={handleChange}
          maxLength={30}
          className="input input-bordered w-full"
        />
        <select
          name="game"
          onChange={handleChange}
          required
          value={inputs?.game}
          className="select select-bordered w-full"
        >
          <option disabled defaultValue={""}>
            Select Game
          </option>
          {gamesListData.map((item) => (
            <option key={item.id} value={item.name}>
              {item.name}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className={`btn bg-blue-500 w-full md:w-[30%] max-w-[150px] text-white
             hover:bg-blue-600 rounded-full my-4 ${
               showLoader && "btn-disabled"
             }`}
        >
          <span className={`${showLoader && "hidden"}`}>Submit</span>
          {showLoader && (
            <span className="loading loading-infinity loading-md"></span>
          )}
        </button>
      </form>
    </>
  );
}

export default Form;
