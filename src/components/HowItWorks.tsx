import { UserPlus, ArrowRight, CheckCircle } from 'lucide-react';
import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

const steps = [
  {
    number: '01',
    icon: UserPlus,
    title: 'Create Account',
    description: 'Sign up in minutes with just your email. No lengthy paperwork or waiting periods.',
    color: 'from-orange-500 to-orange-600'
  },
  {
    number: '02',
    icon: ArrowRight,
    title: 'Enter Details',
    description: 'Add recipient information and the amount you want to send. See fees and exchange rates upfront.',
    color: 'from-orange-600 to-orange-700'
  },
  {
    number: '03',
    icon: CheckCircle,
    title: 'Send Money',
    description: 'Confirm your transfer and money arrives in seconds. Track everything in real-time.',
    color: 'from-orange-500 to-orange-600'
  }
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 100, scale: 0.8 },
  show: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

export function HowItWorks() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  return (
    <section id="how-it-works" ref={ref} className="py-32 mt-10 relative  bg-gradient-to-b from-white to-orange-50/30">
      {/* Background decorations */}
      <motion.div 
        className="absolute top-1/2 right-0 w-96 h-96 bg-orange-400/15 rounded-full blur-[120px]"
        style={{ y }}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl lg:text-6xl text-gray-900 mb-6">
            How It{' '}
            <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
              Works
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Send money internationally in three simple steps. No hidden fees, no surprises.
          </p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-3 gap-8 relative"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {steps.map((step, index) => (
            <motion.div key={index} className="relative" variants={item}>
              <motion.div 
                className="relative bg-white p-10 rounded-3xl border-2 border-orange-200 hover:border-orange-400 transition-all duration-500 h-full overflow-hidden group shadow-lg shadow-orange-100/50"
                whileHover={{ 
                  y: -20,
                  scale: 1.05,
                  rotateY: 5,
                  boxShadow: "0 30px 60px rgba(249, 115, 22, 0.25)"
                }}
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Animated background gradient */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                  animate={{
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />

                <motion.div 
                  className="text-8xl font-bold bg-gradient-to-br from-orange-500/30 to-orange-600/30 bg-clip-text text-transparent mb-6 relative z-10"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                >
                  {step.number}
                </motion.div>
                
                <motion.div 
                  className={`w-16 h-16 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center mb-6 relative z-10 shadow-xl shadow-orange-500/30`}
                  whileHover={{ 
                    rotate: 360,
                    scale: 1.2
                  }}
                  transition={{ duration: 0.6 }}
                >
                  <step.icon className="w-8 h-8 text-white" />
                </motion.div>
                
                <h3 className="text-3xl text-gray-900 mb-4 relative z-10">
                  {step.title}
                </h3>
                
                <p className="text-gray-600 relative z-10 leading-relaxed text-lg">
                  {step.description}
                </p>

                {/* Glowing orb effect */}
                <motion.div
                  className={`absolute -bottom-10 -right-10 w-40 h-40 bg-gradient-to-br ${step.color} rounded-full blur-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`}
                />
              </motion.div>
              
              {/* Connector Arrow for Desktop */}
              {index < steps.length - 1 && (
                <motion.div 
                  className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-20"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.2 }}
                >
                  <motion.div
                    animate={{ 
                      x: [0, 10, 0],
                      opacity: [0.5, 1, 0.5]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <ArrowRight className="w-8 h-8 text-orange-500" />
                  </motion.div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <motion.button 
            className="px-10 py-5 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-lg rounded-xl inline-flex items-center gap-3 relative overflow-hidden group shadow-xl shadow-orange-500/40"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 25px 50px rgba(249, 115, 22, 0.4)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">Start Sending Money Now</span>
            <ArrowRight className="w-6 h-6 relative z-10 group-hover:translate-x-2 transition-transform" />
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-700"
              initial={{ x: "-100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}