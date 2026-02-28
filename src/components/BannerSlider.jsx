import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function BannerSlider() {
  return (
   
    <div className="w-full h-[60vh] md:h-[70vh] rounded-3xl overflow-hidden shadow-2xl mt-4">

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
            description="Delivering knowledge to your doorstep quickly and safely anywhere in Bangladesh."
            buttonText="Browse Books"
            link="/books"
          />
        </SwiperSlide>

        {/* ===== Slide 2 ===== */}
        <SwiperSlide>
          <HeroSlide
            image="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f"
            title="Share Your Books & Earn"
            description="Become a librarian, list your unused books, and help build a community library."
            buttonText="Add a Book"
            link="/dashboard/add-book"
          />
        </SwiperSlide>

        {/* ===== Slide 3 ===== */}
        <SwiperSlide>
          <HeroSlide
            image="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1920&auto=format&fit=crop"
            title="Real-Time Parcel Tracking"
            description="Track your courier anytime with our smart system. Fast and reliable."
            buttonText="Track Order"
            link="/dashboard"
          />
        </SwiperSlide>

      </Swiper>
    </div>
  );
}



const HeroSlide = ({ image, title, description, buttonText, link }) => {
  return (
    <div
      className="relative h-full bg-cover bg-center flex items-center"
      style={{ backgroundImage: `url(${image})` }}
    >
      
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-transparent"></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-10 md:px-16 lg:px-24 w-full">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-white max-w-2xl"
        >

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-6 drop-shadow-lg">
            {title}
          </h1>

          <p className="text-lg md:text-xl text-slate-200 mb-8 leading-relaxed drop-shadow-md">
            {description}
          </p>

          <Link
            to={link}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-lg font-bold 
            bg-red-600 hover:bg-red-700 text-white
            transition-all duration-300 shadow-lg shadow-red-500/30 transform hover:-translate-y-1"
          >
            {buttonText}
          </Link>

        </motion.div>

      </div>
    </div>
  );
};