import { FaBookReader, FaShippingFast, FaUserShield, FaHeadset } from "react-icons/fa";

const WhyChooseUs = () => {
  const features = [
    {
      id: 1,
      title: "Extensive Library",
      description: "Explore thousands of titles across every genre imaginable. From classics to bestsellers, we have it all.",
      icon: <FaBookReader />,
    },
    {
      id: 2,
      title: "Lightning Fast Delivery",
      description: "Get your favorite books delivered to your doorstep in record time with our express shipping partners.",
      icon: <FaShippingFast />,
    },
    {
      id: 3,
      title: "Secure Payment",
      description: "Experience 100% secure transactions with multiple payment gateways and data protection.",
      icon: <FaUserShield />,
    },
    {
      id: 4,
      title: "24/7 Support",
      description: "Our dedicated support team is here to assist you round the clock with any queries or issues.",
      icon: <FaHeadset />,
    },
  ];

  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-red-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-slate-200/50 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-[#b91c1c] font-bold tracking-widest uppercase text-sm bg-red-100 px-3 py-1 rounded-full border border-red-200">
            Our Values
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mt-4 mb-4">
            Why Choose <span className="text-transparent text-primary">BookFlow?</span>
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            We are more than just a bookstore. We are a community dedicated to providing the best reading experience.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div 
              key={feature.id} 
              className="group bg-white p-8 rounded-[2rem] shadow-sm hover:shadow-2xl hover:shadow-red-500/10 border border-slate-100 transition-all duration-300 transform hover:-translate-y-2 flex flex-col items-start"
            >
              {/* Icon Box */}
              <div className="w-16 h-16 rounded-2xl bg-red-50 text-[#b91c1c] flex items-center justify-center text-3xl mb-6 group-hover:bg-gradient-to-r group-hover:from-[#b91c1c] group-hover:to-[#ef4444] group-hover:text-white transition-all duration-300 shadow-sm group-hover:rotate-3">
                {feature.icon}
              </div>
              
              <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-[#b91c1c] transition-colors">
                {feature.title}
              </h3>
              
              <p className="text-slate-500 leading-relaxed text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;