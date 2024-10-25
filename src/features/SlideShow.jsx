import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Autoplay } from "swiper"; // Import Autoplay
import { Link } from "react-router-dom";
import { ImageWrapper, PlaceholderCard } from "../styles/ImageWrapper";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay"; // Import autoplay styles (optional)

import SwiperStyles from "../styles/SwiperStyles";
import useImageLoader from "../hooks/useImageLoader";

const SlideShow = ({ data }) => {
  const { imageLoading, handleImageLoad } = useImageLoader();

  return (
    <>
      <SwiperStyles />
      {data &&
        data.length > 0 && ( // Check if data is available
          <Swiper
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            loop={true}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            slidesPerView={"auto"}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 100,
              modifier: 2.5,
            }}
            pagination={{ el: ".swiper-pagination", clickable: true }}
            modules={[EffectCoverflow, Pagination, Autoplay]}
            className="swiper_container"
            initialSlide={0}
          >
            {data.map((movie) => (
              <SwiperSlide key={movie.id}>
                <Link to={`/title/${movie.id}`}>
                  <ImageWrapper borderRadius={"20px"} isLoaded={imageLoading[movie.id]}>
                    {!imageLoading[movie.id] && <PlaceholderCard />}
                    <img src={movie.image} alt={movie.title} onLoad={() => handleImageLoad(movie.id)} />
                  </ImageWrapper>
                </Link>
              </SwiperSlide>
            ))}
            <div className="slider-controler">
              <div className="swiper-pagination"></div>
            </div>
          </Swiper>
        )}
    </>
  );
};

export default SlideShow;
