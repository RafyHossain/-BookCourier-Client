import { useState } from "react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import useAxios from "../../hooks/useAxios"; // তোমার কাস্টম হুকটি ইমপোর্ট করো

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const axiosPublic = useAxios(); // হুকটি ইনিশিয়ালাইজ করো

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // কাস্টম হুক দিয়ে ডায়নামিক বেস ইউআরএল ব্যবহার করা হলো
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
    <div className="max-w-4xl mx-auto px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-base-100 shadow-2xl rounded-3xl overflow-hidden flex flex-col md:flex-row"
      >
        {/* Left Side - Info */}
        <div className="bg-gradient-to-br from-primary to-[#b91c1c] text-white p-10 md:w-2/5 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
          <p className="mb-8 text-white/80">
            Have questions about our library or your recent orders? Fill out the form and our team will help you.
          </p>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-xl">📍</span>
              <p>Mirzaganj, Barisal, Bangladesh</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xl">📧</span>
              <p>support@bookcourier.com</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xl">📞</span>
              <p>+880 1234 567 890</p>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="p-10 md:w-3/5 bg-base-200">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Send us a Message</h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-control">
              <label className="label"><span className="label-text font-medium">Full Name</span></label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="John Doe" className="input input-bordered w-full" />
            </div>

            <div className="form-control">
              <label className="label"><span className="label-text font-medium">Email Address</span></label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="john@example.com" className="input input-bordered w-full" />
            </div>

            <div className="form-control">
              <label className="label"><span className="label-text font-medium">Subject</span></label>
              <input type="text" name="subject" value={formData.subject} onChange={handleChange} required placeholder="How can we help?" className="input input-bordered w-full" />
            </div>

            <div className="form-control">
              <label className="label"><span className="label-text font-medium">Message</span></label>
              <textarea name="message" value={formData.message} onChange={handleChange} required placeholder="Write your message here..." className="textarea textarea-bordered h-32 w-full"></textarea>
            </div>

            <button type="submit" disabled={loading} className="btn btn-primary w-full mt-4 text-lg">
              {loading ? <span className="loading loading-spinner"></span> : "Send Message"}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Contact;