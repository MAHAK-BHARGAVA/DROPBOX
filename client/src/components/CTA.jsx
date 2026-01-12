import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
const CTA = () => {
  const navigate = useNavigate();
  return (
    <section className="py-28 px-8 text-center bg-gradient-to-br from-blue-50 to-white">
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-5xl font-bold mb-6"
      >
        Start using DropdBox today
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-gray-600 mb-10"
      >
        Get free storage instantly. No credit card required.
      </motion.p>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate("/login")}
        className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-12 py-4 rounded-full text-lg font-semibold shadow-lg"
      >
        Get Started
      </motion.button>
    </section>
  );
};

export default CTA;


