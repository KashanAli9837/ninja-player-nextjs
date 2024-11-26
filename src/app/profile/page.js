"use client";

import Posts from "@/components/Home/Posts";
import Loader from "@/components/Loader";
import app from "@/lib/firebaseConfig";
import {
  collection,
  getFirestore,
  query,
  where,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useEffect, useState, useRef } from "react";

const Profile = () => {
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const postsRef = useRef(posts);
  const db = getFirestore(app);

  useEffect(() => {
    if (session) {
      if (postsRef.current.length === 0) {
        getUserPost();
      } else {
        setPosts(postsRef.current);
        setLoading(false);
      }
    }
  }, [session]);

  const getUserPost = async () => {
    const q = query(
      collection(db, "posts"),
      where("email", "==", session?.user?.email)
    );
    const querySnapshot = await getDocs(q);
    const fetchedPosts = [];
    querySnapshot.forEach((doc) => {
      fetchedPosts.push(doc.data());
    });
    postsRef.current = fetchedPosts;
    setPosts(fetchedPosts);
    setLoading(false);
  };

  const handleDelete = async (id) => {
    setLoading(true);
    await deleteDoc(doc(db, "posts", id));
    getUserPost();
  };

  return (
    <div className="">
      <h2 className="text-3xl text-center text-blue-500 my-12 font-bold">
        Your Posts
      </h2>
      {loading ? (
        <Loader />
      ) : (
        <Posts posts={posts} forProfile={true} handleDelete={handleDelete} />
      )}
    </div>
  );
};

export default Profile;
