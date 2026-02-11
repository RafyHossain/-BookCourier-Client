import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function BannerSlider() {
  return (
    <div className="w-full h-[85vh]">

      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        slidesPerView={1}
        autoplay={{ delay: 4000 }}
        pagination={{ clickable: true }}
        navigation
        loop={true}
        className="h-full"
      >

        {/* Slide 1 */}
        <SwiperSlide>
          <div
            className="relative h-full bg-cover bg-center flex items-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1512820790803-83ca734da794')",
            }}
          >
            <div className="absolute inset-0 bg-black/60"></div>

            <div className="relative z-10 text-white px-10 max-w-3xl">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Fast Book Delivery Service
              </h1>
              <p className="text-lg mb-6">
                Delivering knowledge to your doorstep quickly and safely.
              </p>
              <button className="btn btn-primary">
                Order Now
              </button>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 2 */}
        <SwiperSlide>
          <div
            className="relative h-full bg-cover bg-center flex items-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1524995997946-a1c2e315a42f')",
            }}
          >
            <div className="absolute inset-0 bg-black/60"></div>

            <div className="relative z-10 text-white px-10 max-w-3xl">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Secure Packaging Guaranteed
              </h1>
              <p className="text-lg mb-6">
                Your books arrive in perfect condition every time.
              </p>
              <button className="btn btn-secondary">
                Learn More
              </button>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 3 */}
       <SwiperSlide>
  <div
    className="relative h-full bg-cover bg-center flex items-center"
    style={{
      backgroundImage:
        "url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1920&auto=format&fit=crop')",
    }}
  >
    <div className="absolute inset-0 bg-black/60"></div>

    <div className="relative z-10 text-white px-10 max-w-3xl">
      <h1 className="text-5xl font-bold mb-6">
        Real-Time Parcel Tracking
      </h1>
      <p className="text-lg mb-6">
        Track your courier anytime with our smart system.
      </p>
      <button className="btn btn-primary">
        Track Now
      </button>
    </div>
  </div>
</SwiperSlide>


      </Swiper>
    </div>
  );
}
