import { motion } from "framer-motion";

const LoadingDots = () => {
  return (
    <div className="flex justify-center items-center space-x-1 p-4 mx-auto">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-3 h-3 bg-blue-500 rounded-full"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.3,
          }}
        />
      ))}
    </div>
  );
};

export default LoadingDots;
