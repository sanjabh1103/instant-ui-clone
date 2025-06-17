
import { motion, Variants } from "framer-motion";
import { Upload, MessageSquare, Sparkles, Rocket } from "lucide-react";

const steps = [
  {
    icon: Upload,
    title: "Upload Your Sketch",
    description: "Draw your UI wireframe and upload it as an image",
    color: "from-blue-500 to-indigo-600"
  },
  {
    icon: MessageSquare,
    title: "Describe Functionality", 
    description: "Tell us what your app should do in plain English",
    color: "from-indigo-500 to-purple-600"
  },
  {
    icon: Sparkles,
    title: "AI Generates Code",
    description: "Our AI analyzes and creates production-ready code",
    color: "from-purple-500 to-pink-600"
  },
  {
    icon: Rocket,
    title: "Launch & Iterate",
    description: "Preview your app instantly and make improvements",
    color: "from-pink-500 to-red-600"
  }
];

const AnimatedHowItWorksPanel = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94] // easeOut cubic bezier
      }
    }
  };

  return (
    <motion.section 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
      className="mt-16 mb-8 max-w-6xl mx-auto px-4"
    >
      <motion.div 
        variants={itemVariants}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">How It Works</h2>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
          Transform your ideas into fully functional web applications in minutes, not months
        </p>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
      >
        {steps.map((step, index) => (
          <motion.div 
            key={index} 
            variants={itemVariants}
            className="relative group"
          >
            {/* Connection line */}
            {index < steps.length - 1 && (
              <motion.div 
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.5 + index * 0.2 }}
                viewport={{ once: true }}
                className="hidden lg:block absolute top-16 left-full w-8 h-0.5 bg-gradient-to-r from-gray-300 to-gray-200 z-0 origin-left"
              />
            )}
            
            <motion.div 
              whileHover={{ 
                y: -8,
                scale: 1.02,
                transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }
              }}
              className="bg-white rounded-2xl p-6 md:p-8 shadow-xl border border-gray-100 relative z-10 hover:shadow-2xl transition-all duration-300"
            >
              <div className="text-center">
                <motion.div 
                  whileHover={{ 
                    scale: 1.15,
                    rotate: 5,
                    transition: { duration: 0.3 }
                  }}
                  className={`w-16 h-16 mx-auto mb-6 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center shadow-lg`}
                >
                  <step.icon className="w-8 h-8 text-white" />
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="text-sm font-bold text-gray-400 mb-2"
                >
                  STEP {index + 1}
                </motion.div>
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm md:text-base">{step.description}</p>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div 
        variants={itemVariants}
        className="mt-12 text-center"
      >
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-xl px-4 md:px-6 py-3"
        >
          <Sparkles className="w-5 h-5 text-indigo-600" />
          <span className="text-indigo-800 font-medium text-sm md:text-base">Powered by advanced AI vision and code generation</span>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default AnimatedHowItWorksPanel;
