import React, { useState, useEffect } from "react";
import "./App.css";
// import Income from "./Income";
import DataCollector from "./DataCollector";
import axios from "axios";

const App = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const res = await axios.get(
        "https://recruitment.hal.skygate.io/companies"
      );
      setPosts(res.data);
      setLoading(false);
    };

    fetchPosts();
  }, []);

  // const data = posts.map((post) => <Income id={post.id} />);

  const test = posts.map((post) => DataCollector(post.id));
  console.log(posts);
  console.log(test);

  return <div>działa</div>;
};
export default App;
