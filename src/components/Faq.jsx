import { motion } from "framer-motion";

const Faq = () => {
  return (
    <section className="relative py-28 overflow-hidden bg-gradient-to-br from-slate-50 to-white">
      
      {/* Decorative Background (Testimonial style) */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-red-500/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />

      <div className="relative max-w-4xl mx-auto px-6">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mt-3 mb-4">
            Frequently Asked <span className="text-primary">Questions</span>
          </h2>
          <p className="text-slate-500 mt-4 text-lg">
            Find answers to common questions about BookCourier
          </p>
        </motion.div>

      
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative backdrop-blur-xl bg-white/60 border border-white/40 rounded-3xl p-6 md:p-8 shadow-xl"
        >
          <div className="join join-vertical w-full">
            
            <div className="collapse collapse-arrow join-item border-b border-slate-200/60">
              <input type="radio" name="faq-accordion" defaultChecked />
              <div className="collapse-title text-xl font-bold text-slate-800 py-5">
                How do I borrow a book?
              </div>
              <div className="collapse-content text-slate-600 leading-relaxed pb-5">
                <p>Simply create an account, browse our collection, select your desired book, and place an order. It's that easy!</p>
              </div>
            </div>
            
            <div className="collapse collapse-arrow join-item border-b border-slate-200/60">
              <input type="radio" name="faq-accordion" />
              <div className="collapse-title text-xl font-bold text-slate-800 py-5">
                Is there any delivery charge?
              </div>
              <div className="collapse-content text-slate-600 leading-relaxed pb-5">
                <p>We offer very affordable delivery charges depending on your location in Bangladesh. You will see the exact amount during checkout.</p>
              </div>
            </div>
            
            <div className="collapse collapse-arrow join-item">
              <input type="radio" name="faq-accordion" />
              <div className="collapse-title text-xl font-bold text-slate-800 py-5">
                Can I donate books?
              </div>
              <div className="collapse-content text-slate-600 leading-relaxed pb-5">
                <p>Yes! You can apply to become a Librarian and list your books for others to borrow or read.</p>
              </div>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Faq;