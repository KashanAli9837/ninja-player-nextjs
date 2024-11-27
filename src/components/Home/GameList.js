"use client";
import gamesListData from "@/lib/gamesListData";
import Image from "next/image";
import app from "@/lib/firebaseConfig";
import { collection, getFirestore, query, where } from "firebase/firestore";

const GameList = ({ setLoading, getPosts }) => {
  const db = getFirestore(app);

  const handleClick = (game) => {
    setLoading(true);
    if (game) {
      const q = query(collection(db, "posts"), where("game", "==", game));
      getPosts(q);
    } else {
      getPosts();
    }
  };

  return (
    <div className="flex items-start justify-center gap-y-4 gap-x-4 md:gap-x-8 lg:gap-12 flex-wrap mt-10">
      <div
        onClick={() => handleClick()}
        className="flex flex-col items-center cursor-pointer transition-all duration-150 hover:scale-[1.05]"
      >
        <Image src={"/images/all.jpg"} alt="game image" width={50} height={50} className="w-[35px] h-[35px] md:w-[50px] md:h-[50px]" />
        <h2 className="text-xs md:text-sm text-center">All Games</h2>
      </div>
      {gamesListData.map((list) => (
        <div
          onClick={() => handleClick(list.name)}
          key={list.id}
          className="flex flex-col items-center cursor-pointer transition-all duration-150 hover:scale-[1.05]"
        >
          <Image src={list.image} alt="game image" width={50} height={50} className="w-[35px] h-[35px] md:w-auto md:h-auto" />
          <h2 className="text-xs md:text-sm text-center">{list.name}</h2>
        </div>
      ))}
    </div>
  );
};

export default GameList;
