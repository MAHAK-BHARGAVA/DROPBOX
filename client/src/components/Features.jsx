import { motion } from "framer-motion";

const Features = () => {
  const data = [
    { title: "Secure Storage", desc: "Military grade encryption" },
    { title: "Fast Sharing", desc: "One click sharing links" },
    { title: "Cloud Sync", desc: "Access anywhere anytime" },
  ];

  return (
    <section className="py-24 px-8 bg-gradient-to-br from-blue-50 to-white">
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-center mb-14"
      >
        Powerful features
      </motion.h2>

      <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {data.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
            className="backdrop-blur-xl bg-white/60 p-8 rounded-2xl shadow-xl hover:scale-105 transition"
          >
            <h3 className="text-2xl font-semibold mb-4">
              {item.title}
            </h3>
            <p className="text-gray-600">
              {item.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Features;


