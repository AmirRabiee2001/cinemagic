import { createGlobalStyle } from "styled-components";

const SwiperStyles = createGlobalStyle`

.swiper_container {
  margin-top: 2rem;
  height: auto;
  padding: 1rem;
}

.swiper-slide {
  width: 25rem;
  height: 37rem;

  @media (min-width: 992px) {
    width: 35rem;
    height: 50rem;
  }
}

.swiper-slide-shadow-left,
.swiper-slide-shadow-right {
  display: none;
}

.slider-controler {
  margin-top: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* .swiper-pagination {
  position: relative;
  width: 15rem !important;
  bottom: 1rem;
} */

.swiper-pagination .swiper-pagination-bullet {
  filter: drop-shadow(0px 8px 24px rgba(18, 28, 53, 0.1));
  background-color: var(--color-text-2);
}

.swiper-pagination .swiper-pagination-bullet-active {
  background: var(--color-primary);
}
`;

export default SwiperStyles;
