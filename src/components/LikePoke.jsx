import React, { useState } from "react";

import { FaHeart, FaRegHeart } from "react-icons/fa";

export const LikePoke = () => {
  const [like, setLike] = useState(false);


  const toggleLike = ()=>{
    setLike((check) => !check)
  }

  return <button onClick={toggleLike}>
    {like ? <FaHeart style={{color:'red'}}/> :  <FaRegHeart/>}
  </button>;
};
