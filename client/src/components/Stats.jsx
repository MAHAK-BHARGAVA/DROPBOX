import { motion } from "framer-motion";

const Stats = () => {
  return (
    <section className="py-24 px-8 bg-blue-600 text-white">
      <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-10 text-center">
        {["1M+ Users", "99.9% Uptime", "10TB+ Storage", "24/7 Support"].map(
          (item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
            >
              <h3 className="text-4xl font-bold">
                {item.split(" ")[0]}
              </h3>
              <p>{item.split(" ")[1]}</p>
            </motion.div>
          )
        )}
      </div>
    </section>
  );
};

export default Stats;
