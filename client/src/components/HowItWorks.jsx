import { motion } from "framer-motion";

const steps = [
  { num: "01", title: "Upload", desc: "Drag & drop files" },
  { num: "02", title: "Organize", desc: "Smart folders" },
  { num: "03", title: "Share", desc: "Secure links" },
];

const HowItWorks = () => {
  return (
    <section className="py-24 px-8">
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-center mb-14"
      >
        How it works
      </motion.h2>

      <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-12">
        {steps.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.2 }}
            className="text-center"
          >
            <div className="w-14 h-14 mx-auto flex items-center justify-center bg-blue-600 text-white rounded-full text-xl font-bold">
              {step.num}
            </div>
            <h3 className="text-xl font-semibold mt-5">
              {step.title}
            </h3>
            <p className="text-gray-600 mt-2">
              {step.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;

