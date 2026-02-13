import { motion } from "framer-motion";

const Loading = ({ fullScreen = true }) => {
  return (
    <div
      className={`flex flex-col items-center justify-center ${
        fullScreen ? "min-h-screen" : "py-24"
      } bg-[#F8FAFC] relative overflow-hidden`}
    >
      {/* --- Background Ambient Glow --- */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-red-500/10 rounded-full blur-[100px] pointer-events-none"></div>

      {/* --- FLYING BOOK CONTAINER --- */}
      <motion.div
        animate={{ y: [-15, 0, -15] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative z-10 flex flex-col items-center"
      >
        {/* The Book */}
        <div className="relative flex items-center justify-center perspective-500">
          
          {/* Left Wing (Page) */}
          <motion.div
            style={{ originX: 1 }} // Pivot from the spine (right side of this div)
            animate={{ rotateY: [20, 60, 20] }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
            className="w-12 h-16 bg-gradient-to-br from-[#b91c1c] to-[#ef4444] rounded-l-md border-r border-red-800/20 shadow-lg relative overflow-hidden"
          >
             {/* Decorative Page Lines */}
             <div className="absolute top-3 left-2 right-4 h-[2px] bg-white/20 rounded-full"></div>
             <div className="absolute top-6 left-2 right-6 h-[2px] bg-white/20 rounded-full"></div>
             <div className="absolute bottom-3 left-2 right-3 h-[2px] bg-white/20 rounded-full"></div>
          </motion.div>

          {/* Spine */}
          <div className="w-2 h-16 bg-red-900 rounded-sm z-20 shadow-md"></div>

          {/* Right Wing (Page) */}
          <motion.div
            style={{ originX: 0 }} // Pivot from the spine (left side of this div)
            animate={{ rotateY: [-20, -60, -20] }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
            className="w-12 h-16 bg-gradient-to-bl from-[#b91c1c] to-[#ef4444] rounded-r-md border-l border-red-800/20 shadow-lg relative overflow-hidden"
          >
             {/* Decorative Page Lines */}
             <div className="absolute top-3 right-2 left-4 h-[2px] bg-white/20 rounded-full"></div>
             <div className="absolute top-6 right-2 left-6 h-[2px] bg-white/20 rounded-full"></div>
             <div className="absolute bottom-3 right-2 left-3 h-[2px] bg-white/20 rounded-full"></div>
          </motion.div>

        </div>

        {/* Dynamic Shadow (Shrinks when book goes up) */}
        <motion.div
          animate={{ 
            scale: [0.8, 1.2, 0.8],
            opacity: [0.2, 0.5, 0.2] 
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-24 h-3 bg-black rounded-full blur-md mt-8"
        ></motion.div>
      </motion.div>

      {/* --- TYPOGRAPHY & PROGRESS --- */}
      <div className="mt-8 text-center z-10 space-y-4">
        <h2 className="text-xl font-bold text-slate-700 tracking-wider uppercase">
          On The Way
        </h2>
        
        {/* Modern Progress Line */}
        <div className="w-48 h-1 bg-slate-200 rounded-full overflow-hidden relative">
          <motion.div
            animate={{ x: ["-100%", "100%"] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-transparent via-[#b91c1c] to-transparent"
          ></motion.div>
        </div>

        <p className="text-xs text-slate-400 font-medium animate-pulse">
          Fetching your library...
        </p>
      </div>
    </div>
  );
};

export default Loading;