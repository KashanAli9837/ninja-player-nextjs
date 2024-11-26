"use client";
import GameList from "@/components/Home/GameList";
import Hero from "@/components/Home/Hero";
import Posts from "@/components/Home/Posts";
import Search from "@/components/Home/Search";
import Loader from "@/components/Loader";
import app from "@/lib/firebaseConfig";
import { getFirestore, getDocs, collection } from "firebase/firestore";
import { useEffect, useState, useRef } from "react";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const db = getFirestore(app);
  const postsRef = useRef(posts);

  useEffect(() => {
    if (postsRef.current.length === 0) {
      getPosts();
    } else {
      setPosts(postsRef.current);
      setLoading(false);
    }
  }, []);

  const getPosts = async (query) => {
    const q = query ?? collection(db, "posts");
    const querySnapshot = await getDocs(q);
    const fetchedPosts = [];
    querySnapshot.forEach((doc) => {
      fetchedPosts.push(doc.data());
    });
    postsRef.current = fetchedPosts;
    setPosts(fetchedPosts);
    setLoading(false);
  };

  return (
    <div className="px-7 lg:px-10 mt-14">
      <Hero />
      <Search setLoading={setLoading} postsRef={postsRef} setPosts={setPosts} />
      <GameList setLoading={setLoading} getPosts={getPosts} />
      {loading ? <Loader /> : <Posts posts={posts} />}
    </div>
  );
};

export default Home;
