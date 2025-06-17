
import { motion } from "framer-motion";
import { Lock, ArrowRight } from "lucide-react";

const AnimatedGuestNotice = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const features = [
    {
      icon: "💾",
      title: "Save Projects",
      description: "Keep all your generated apps in one place",
      color: "bg-indigo-100",
      textColor: "text-indigo-600"
    },
    {
      icon: "🔄",
      title: "Quick Reload",
      description: "Instantly access previous generations",
      color: "bg-purple-100",
      textColor: "text-purple-600"
    },
    {
      icon: "✏️",
      title: "Manage & Rename",
      description: "Organize your projects with custom names",
      color: "bg-pink-100",
      textColor: "text-pink-600"
    }
  ];

  return (
    <motion.section 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
      className="mt-16 mb-8 px-4 w-full max-w-4xl mx-auto"
    >
      <motion.div 
        variants={itemVariants}
        className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 md:p-12 text-center"
      >
        <motion.div 
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ duration: 0.3 }}
          variants={itemVariants}
          className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center"
        >
          <Lock className="w-8 h-8 text-white" />
        </motion.div>
        
        <motion.h3 
          variants={itemVariants}
          className="text-2xl md:text-3xl font-bold text-gray-900 mb-4"
        >
          Save Your Creations
        </motion.h3>
        <motion.p 
          variants={itemVariants}
          className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto"
        >
          Sign in to save your generated apps, access previous projects, and build your personal library of creations.
        </motion.p>
        
        <motion.div 
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
              className="p-4"
            >
              <motion.div 
                whileHover={{ scale: 1.1 }}
                className={`w-10 h-10 mx-auto mb-3 ${feature.color} rounded-full flex items-center justify-center`}
              >
                <span className={`${feature.textColor} font-bold text-lg`}>{feature.icon}</span>
              </motion.div>
              <h4 className="font-semibold text-gray-900 mb-2">{feature.title}</h4>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.a 
          href="/auth"
          whileHover={{ 
            scale: 1.05,
            y: -2,
            transition: { duration: 0.2 }
          }}
          whileTap={{ scale: 0.95 }}
          variants={itemVariants}
          className="inline-flex items-center gap-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-200"
        >
          Get Started Free
          <ArrowRight className="w-5 h-5" />
        </motion.a>
      </motion.div>
    </motion.section>
  );
};

export default AnimatedGuestNotice;
