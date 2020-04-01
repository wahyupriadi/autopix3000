import React, { useEffect } from "react";
import { Navbar } from "../../Components";
import Axios from "axios";

const getPost = async () => {
  const result = await Axios.get(
    "https://jsonplaceholder.typicode.com/posts"
  ).then(res => console.log(res.data));
  return result;
};

const Home = () => {
    
  useEffect(() => {
    getPost();
  }, []);

  return (
    <div>
      <Navbar />
    </div>
  );
};

export default Home;
