"use client";

import app from "@/lib/firebaseConfig";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { useState } from "react";

const Search = ({ setLoading, postsRef, setPosts }) => {
  const [input, setInput] = useState("");

  const db = getFirestore(app);

  function removeDuplicatesById(arr) {
    const seenIds = new Set();
    return arr.filter((item) => {
      if (!seenIds.has(item.id)) {
        seenIds.add(item.id);
        return true; // Keep this item
      }
      return false; // Remove this item
    });
  }

  function filterCards(input, cards) {
    const words = input.trim().toLowerCase().split(/\s+/);

    const filteredCardsTitle = cards.filter(({ title }) => {
      title = title.trim().toLowerCase();
      return words.some((word) => title.includes(word));
    });

    const filteredCardsDesc = cards.filter(({ desc }) => {
      desc = desc.trim().toLowerCase();
      return words.some((word) => desc.includes(word));
    });

    return removeDuplicatesById([...filteredCardsTitle, ...filteredCardsDesc]);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const querySnapshot = await getDocs(collection(db, "posts"));
    const fetchedPosts = [];
    querySnapshot.forEach((doc) => {
      fetchedPosts.push(doc.data());
    });
    const filtered = filterCards(input, fetchedPosts);
    postsRef.current = filtered;
    setPosts(filtered);
    setLoading(false);
    setInput("");
  };

  return (
    <div className="mt-10">
      <form onSubmit={handleSubmit} className="max-w-md mx-auto justify-between">
        <label
          className="input input-bordered flex items-center gap-2 h-[3.5rem]
         bg-gray-50 pr-[5px]"
        >
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
          <input
            type="search"
            required
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="grow w-[60%] flex-1 md:w-auto text-base md:text-sm"
            placeholder="Search"
          />
          <button
            type="submit"
            className="badge badge-info h-[80%] px-4 rounded-lg bg-blue-700 hover:bg-blue-800 text-white"
          >
            Search
          </button>
        </label>
      </form>
    </div>
  );
};

export default Search;
