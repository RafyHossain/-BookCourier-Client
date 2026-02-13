import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";

const testimonials = [
  {
    id: 1,
    name: "Rahim Ahmed",
    role: "University Student",
    image: "https://i.pravatar.cc/150?img=12",
    rating: 5,
    text: "The experience is seamless. The dashboard and ordering system feel premium and fast."
  },
  {
    id: 2,
    name: "Sadia Islam",
    role: "Book Lover",
    image: "https://i.pravatar.cc/150?img=32",
    rating: 5,
    text: "I love how smooth everything feels. Delivery is quick and the UI is beautifully designed."
  },
  {
    id: 3,
    name: "Mahmud Hasan",
    role: "Teacher",
    image: "https://i.pravatar.cc/150?img=22",
    rating: 4,
    text: "Very professional platform. Easy ordering and excellent book collection."
  },
  {
    id: 4,
    name: "Tanvir Rahman",
    role: "Developer",
    image: "https://i.pravatar.cc/150?img=8",
    rating: 5,
    text: "Modern UI, smooth performance and a clean dashboard. Truly impressive."
  }
];

const Testimonials = () => {
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStartIndex((prev) =>
        prev === testimonials.length - 3 ? 0 : prev + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const visibleTestimonials = testimonials.slice(
    startIndex,
    startIndex + 3
  );

  return (
    <section className="relative py-28 overflow-hidden bg-gradient-to-br from-slate-50 to-white">

      {/* Decorative Background */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-red-500/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mt-3 mb-4">
            Loved by  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#b91c1c] to-[#ef4444]">Readers</span>
          </h2>
          
          <p className="text-slate-500 mt-4 text-lg">
            Real experiences from our growing community
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-10">

          {visibleTestimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
              whileHover={{ scale: 1.05 }}
              className="relative backdrop-blur-xl bg-white/60 border border-white/40 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500"
            >

              {/* Rating */}
              <div className="flex gap-1 text-yellow-400 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>

              {/* Text */}
              <p className="text-slate-700 leading-relaxed mb-6">
                “{testimonial.text}”
              </p>

              {/* User Info */}
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-red-500"
                />
                <div>
                  <h4 className="font-bold text-slate-900">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-red-600 font-medium">
                    {testimonial.role}
                  </p>
                </div>
              </div>

            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default Testimonials;
