import { useState } from "react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import useAxios from "../../hooks/useAxios";

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const axiosPublic = useAxios();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axiosPublic.post("/contacts", formData);
      
      Swal.fire({
        icon: "success",
        title: "Message Sent!",
        text: "We will get back to you shortly.",
        timer: 2000,
        showConfirmButton: false,
      });

      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong! Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen py-20 md:py-28 bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4">
            Get in <span className="text-primary">Touch</span>
          </h2>
          <p className="text-lg text-slate-500 dark:text-slate-400">
            Have questions about our library? We're here to help.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white dark:bg-slate-800 shadow-2xl rounded-3xl overflow-hidden flex flex-col lg:flex-row border border-slate-100 dark:border-slate-700"
        >
          {/* Left Side - Info */}
          <div className="bg-gradient-to-br from-red-700 to-red-500 text-white p-10 md:p-14 lg:w-2/5 flex flex-col justify-center relative overflow-hidden">
            
            {/* Decorative Background Circles */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-black/10 rounded-full blur-2xl"></div>
            
            <div className="relative z-10">
              <h3 className="text-3xl font-bold mb-6">Contact Information</h3>
              <p className="mb-10 text-red-50 text-lg leading-relaxed">
                Fill out the form and our team will get back to you within 24 hours.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-xl backdrop-blur-sm">📍</div>
                  <p className="text-lg font-medium">Mirzaganj, Barisal, Bangladesh</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-xl backdrop-blur-sm">📧</div>
                  <p className="text-lg font-medium">support@bookcourier.com</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-xl backdrop-blur-sm">📞</div>
                  <p className="text-lg font-medium">+880 1234 567 890</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="p-10 md:p-14 lg:w-3/5 bg-white dark:bg-slate-800">
            <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-8">Send us a Message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="grid md:grid-cols-2 gap-6">
                {/* Name */}
                <div className="form-control">
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Full Name</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="John Doe" className="w-full px-5 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500 transition-all" />
                </div>

                {/* Email */}
                <div className="form-control">
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Email Address</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="john@example.com" className="w-full px-5 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500 transition-all" />
                </div>
              </div>

              {/* Subject */}
              <div className="form-control">
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Subject</label>
                <input type="text" name="subject" value={formData.subject} onChange={handleChange} required placeholder="How can we help?" className="w-full px-5 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500 transition-all" />
              </div>

              {/* Message */}
              <div className="form-control">
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Message</label>
                <textarea name="message" value={formData.message} onChange={handleChange} required placeholder="Write your message here..." className="w-full px-5 py-4 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500 transition-all min-h-[150px] resize-y"></textarea>
              </div>

              {/* Submit Button */}
              <button type="submit" disabled={loading} className="w-full py-4 rounded-xl font-bold text-white btn-primary hover:bg-red-700 shadow-md hover:shadow-xl transition-all disabled:opacity-70 disabled:cursor-not-allowed">
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="loading loading-spinner loading-sm"></span> Sending...
                  </span>
                ) : "Send Message"}
              </button>
            </form>

          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Contact;