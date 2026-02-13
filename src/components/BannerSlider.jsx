import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function BannerSlider() {
  return (
    <div className="w-full h-[90vh]">

      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        slidesPerView={1}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation
        loop
        className="h-full"
      >

        {/* ===== Slide 1 ===== */}
        <SwiperSlide>
          <HeroSlide
            image="https://images.unsplash.com/photo-1512820790803-83ca734da794"
            title="Fast Book Delivery Service"
            description="Delivering knowledge to your doorstep quickly and safely."
            buttonText="Browse Books"
            link="/books"
          />
        </SwiperSlide>

        {/* ===== Slide 2 ===== */}
        <SwiperSlide>
          <HeroSlide
            image="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f"
            title="Secure Packaging Guaranteed"
            description="Your books arrive in perfect condition every time."
            buttonText="Learn More"
            link="/books"
          />
        </SwiperSlide>

        {/* ===== Slide 3 ===== */}
        <SwiperSlide>
          <HeroSlide
            image="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1920&auto=format&fit=crop"
            title="Real-Time Parcel Tracking"
            description="Track your courier anytime with our smart system."
            buttonText="Track Order"
            link="/dashboard"
          />
        </SwiperSlide>

      </Swiper>
    </div>
  );
}

/* ===== Reusable Hero Slide Component ===== */

const HeroSlide = ({ image, title, description, buttonText, link }) => {
  return (
    <div
      className="relative h-full bg-cover bg-center flex items-center"
      style={{ backgroundImage: `url(${image})` }}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/30"></div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-white max-w-2xl"
        >

          <h1 className="text-4xl md:text-6xl font-black leading-tight mb-6">
            {title}
          </h1>

          <p className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed">
            {description}
          </p>

          <Link
            to={link}
            className="inline-block px-8 py-4 rounded-xl text-lg font-bold 
            bg-gradient-to-r from-red-600 to-red-500 
            hover:from-red-700 hover:to-red-600
            transition-all duration-300 shadow-lg shadow-red-500/30"
          >
            {buttonText}
          </Link>

        </motion.div>

      </div>
    </div>
  );
};
