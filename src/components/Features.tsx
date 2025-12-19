import { DollarSign, Clock, Shield, Globe, TrendingDown, Lock } from 'lucide-react';
import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

const features = [
  {
    icon: DollarSign,
    title: 'Best Exchange Rates',
    description: 'Get competitive mid-market exchange rates with no hidden fees or markups.',
    color: 'from-orange-500 to-orange-600'
  },
  {
    icon: Clock,
    title: 'Lightning Fast',
    description: 'Most transfers complete within seconds, not days. Real-time tracking included.',
    color: 'from-orange-600 to-orange-700'
  },
  {
    icon: Shield,
    title: 'Bank-Level Security',
    description: 'Your money is protected with enterprise-grade encryption and security protocols.',
    color: 'from-orange-500 to-orange-600'
  },
  {
    icon: Globe,
    title: '180+ Countries',
    description: 'Send money to virtually anywhere in the world with support for 50+ currencies.',
    color: 'from-orange-600 to-orange-700'
  },
  {
    icon: TrendingDown,
    title: 'Lowest Fees',
    description: 'Pay only a small flat fee or percentage, significantly lower than traditional banks.',
    color: 'from-orange-500 to-orange-600'
  },
  {
    icon: Lock,
    title: 'Regulatory Compliant',
    description: 'Fully licensed and regulated in all operating jurisdictions for your peace of mind.',
    color: 'from-orange-600 to-orange-700'
  }
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 60, rotateX: -30 },
  show: { 
    opacity: 1, 
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

export function Features() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section id="features" ref={ref} className="py-32 relative bg-white">
      {/* Background decoration */}
      <motion.div 
        className="absolute top-0 left-1/4 w-96 h-96 bg-orange-400/15 rounded-full blur-[120px]"
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
          <motion.div
            className="inline-block"
            whileHover={{ scale: 1.05 }}
          >
            <h2 className="text-5xl lg:text-6xl text-gray-900 mb-6">
              Why Choose{' '}
              <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                AimPay?
              </span>
            </h2>
          </motion.div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We combine cutting-edge technology with customer-first approach to deliver the best cross-border payment experience.
          </p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              className="group relative"
              variants={item}
            >
              <motion.div
                className="relative p-8 bg-white rounded-2xl border-2 border-orange-200 hover:border-orange-400 transition-all duration-300 h-full overflow-hidden shadow-lg shadow-orange-100/50"
                whileHover={{ 
                  y: -10,
                  scale: 1.02,
                  boxShadow: "0 20px 40px rgba(249, 115, 22, 0.2)"
                }}
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                
                {/* Animated background pattern */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    backgroundImage: `radial-gradient(circle at 50% 50%, rgba(249, 115, 22, 0.05) 0%, transparent 50%)`,
                    backgroundSize: '30px 30px',
                  }}
                  animate={{
                    backgroundPosition: ['0px 0px', '30px 30px'],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />

                <motion.div 
                  className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-6 relative z-10 shadow-lg shadow-orange-500/30`}
                  whileHover={{ 
                    rotate: [0, -10, 10, -10, 0],
                    scale: 1.1
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <feature.icon className="w-7 h-7 text-white" />
                </motion.div>
                
                <h3 className="text-2xl text-gray-900 mb-3 relative z-10">{feature.title}</h3>
                <p className="text-gray-600 relative z-10 leading-relaxed">{feature.description}</p>

                {/* Corner accent */}
                <motion.div
                  className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-orange-500/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity"
                  initial={{ scale: 0, rotate: -45 }}
                  whileHover={{ scale: 1, rotate: 0 }}
                />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}