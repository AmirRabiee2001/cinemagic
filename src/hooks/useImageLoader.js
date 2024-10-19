import { useState } from "react";

const useImageLoader = () => {
  const [imageLoading, setImageLoading] = useState({});

  const handleImageLoad = (id) => {
    setImageLoading((prevState) => ({
      ...prevState,
      [id]: true,
    }));
  };

  return { imageLoading, handleImageLoad };
};

export default useImageLoader;
