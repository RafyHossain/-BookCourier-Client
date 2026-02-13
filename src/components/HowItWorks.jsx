import { FaSearch, FaShoppingCart, FaTruck, FaBookOpen } from "react-icons/fa";

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      title: "Search Your Book",
      description: "Browse our vast collection or use the search bar to find your favorite reads quickly.",
      icon: <FaSearch />,
    },
    {
      id: 2,
      title: "Place Order",
      description: "Add books to your cart and complete the checkout process with just a few clicks.",
      icon: <FaShoppingCart />,
    },
    {
      id: 3,
      title: "Fast Delivery",
      description: "Sit back and relax while we deliver your books to your doorstep anywhere in the country.",
      icon: <FaTruck />,
    },
    {
      id: 4,
      title: "Read & Enjoy",
      description: "Immerse yourself in the story. Share your reviews and keep the reading cycle going.",
      icon: <FaBookOpen />,
    },
  ];

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 bg-red-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-[#b91c1c] font-bold tracking-widest uppercase text-sm bg-red-50 px-3 py-1 rounded-full">
            Process
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mt-3 mb-4">
            How It <span className="text-transparent text-primary">Works</span>
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            Get your favorite books in just 4 simple steps. We make reading accessible and hassle-free.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          
          {/* Connecting Line (Desktop Only) */}
          <div className="hidden lg:block absolute top-12 left-[12%] right-[12%] h-0.5 border-t-2 border-dashed border-red-100 -z-10"></div>

          {steps.map((step, index) => (
            <div 
              key={step.id} 
              className="group relative flex flex-col items-center text-center"
            >
              {/* Icon Circle */}
              <div className="w-24 h-24 rounded-full bg-white border-4 border-slate-50 shadow-xl shadow-red-500/5 flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform duration-500 relative z-10">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#b91c1c] to-[#ef4444] flex items-center justify-center text-white">
                  {step.icon}
                </div>
                
                {/* Step Number Badge */}
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-sm border-2 border-white">
                  {step.id}
                </div>
              </div>

              {/* Content */}
              <div className="bg-slate-50 group-hover:bg-white p-6 rounded-3xl border border-slate-100 group-hover:border-red-100 group-hover:shadow-xl group-hover:shadow-red-500/10 transition-all duration-300 w-full h-full">
                <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-[#b91c1c] transition-colors">
                  {step.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;