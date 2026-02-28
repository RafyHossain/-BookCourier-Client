import { motion } from "framer-motion";

const Newsletter = () => {
  return (
    <section className="relative py-28 overflow-hidden bg-gradient-to-br from-slate-50 to-white">
      
      {/* Decorative Background (Reversed for visual balance) */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-red-500/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />

      <div className="relative max-w-5xl mx-auto px-6">
        
        {/* Newsletter Card (Glassmorphism style) */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative backdrop-blur-xl bg-white/60 border border-white/40 rounded-3xl p-10 md:p-16 shadow-xl text-center"
        >
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mt-3 mb-4">
            Subscribe to our <span className="text-primary">Newsletter</span>
          </h2>
          
          <p className="text-slate-500 mb-10 max-w-2xl mx-auto text-lg">
            Get updates on new arrivals, reading tips, and special discounts directly in your inbox.
          </p>

          <form
            className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto"
            onSubmit={(e) => {
              e.preventDefault();
              alert("Thanks for subscribing!");
            }}
          >
            <input
              type="email"
              required
              placeholder="Enter your email address"
              className="w-full pl-6 pr-4 py-4 rounded-xl border border-white/50 bg-white/50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition-all shadow-sm text-slate-700 placeholder-slate-400"
            />
            <button
              type="submit"
              className="px-8 py-4 rounded-xl font-bold btn-primary text-white hover:bg-red-700 transition-all duration-300 shadow-md hover:shadow-xl whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        </motion.div>

      </div>
    </section>
  );
};

export default Newsletter;