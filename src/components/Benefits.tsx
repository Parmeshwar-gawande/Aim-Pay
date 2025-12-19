import { ImageWithFallback } from './figma/ImageWithFallback';
import { Check } from 'lucide-react';
import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

const benefits = [
  'No hidden fees or surprise charges',
  'Real-time exchange rates, always transparent',
  'Send money 24/7, even on weekends',
  'Multi-currency wallet support',
  'Instant notifications for all transactions',
  'Dedicated customer support'
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const item = {
  hidden: { opacity: 0, x: -30 },
  show: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

export function Benefits() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const x = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  return (
    <section id="benefits" ref={ref} className="py-32 relative overflow-hidden bg-white">
      {/* Background decoration */}
      <motion.div 
        className="absolute top-1/2 left-0 w-96 h-96 bg-orange-400/15 rounded-full blur-[120px]"
        style={{ x }}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            className="relative order-2 lg:order-1"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            {/* Floating animated orbs around image */}
            <motion.div 
              className="absolute -top-10 -left-10 w-32 h-32 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full blur-2xl opacity-40"
              animate={{ 
                y: [0, -20, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div 
              className="absolute -bottom-10 -right-10 w-40 h-40 bg-gradient-to-br from-orange-600 to-orange-700 rounded-full blur-2xl opacity-40"
              animate={{ 
                y: [0, 20, 0],
                scale: [1, 1.3, 1],
              }}
              transition={{ 
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
            />
            
            <motion.div
              className="relative group"
              style={{ scale: imageScale }}
              whileHover={{ 
                scale: 1.05,
                rotateY: 10,
                rotateX: -5,
              }}
              transition={{ duration: 0.4 }}
            >
              {/* Border glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500 via-orange-600 to-orange-500 rounded-3xl opacity-30 group-hover:opacity-50 transition-opacity blur-xl" />
              
              <div className="relative overflow-hidden rounded-3xl border-2 border-orange-300 group-hover:border-orange-400 transition-all shadow-xl shadow-orange-100/50">
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-orange-600/10 z-10" />
                
                {/* Scan line effect */}
                <motion.div
                  className="absolute inset-0 z-20"
                  initial={{ y: "-100%" }}
                  animate={{ y: "200%" }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  style={{
                    background: "linear-gradient(to bottom, transparent 0%, rgba(249, 115, 22, 0.2) 50%, transparent 100%)",
                    height: "100px"
                  }}
                />
                
                <ImageWithFallback 
                  src="https://images.unsplash.com/photo-1758519292135-2af0ad50f552?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwcGF5bWVudCUyMGZpbmFuY2V8ZW58MXx8fHwxNzY1MzYzMzc1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Digital payment finance"
                  className="relative w-full h-auto"
                />
              </div>
            </motion.div>
          </motion.div>

          <motion.div 
            className="order-1 lg:order-2"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2 
              className="text-5xl lg:text-6xl text-gray-900 mb-8 leading-tight"
              whileHover={{ scale: 1.02 }}
            >
              The Smarter Way to{' '}
              <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                Send Money Abroad
              </span>
            </motion.h2>
            
            <p className="text-xl text-gray-600 mb-10 leading-relaxed">
              Traditional banks charge excessive fees and offer poor exchange rates. AimPay gives you complete transparency and control over your international transfers.
            </p>

            <motion.div 
              className="space-y-5 mb-10"
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
            >
              {benefits.map((benefit, index) => (
                <motion.div 
                  key={index} 
                  className="flex items-start gap-4 group"
                  variants={item}
                  whileHover={{ x: 10 }}
                >
                  <motion.div 
                    className="mt-1 flex-shrink-0 p-1 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg shadow-md shadow-orange-500/30"
                    whileHover={{ 
                      rotate: 360,
                      scale: 1.2
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <Check className="w-5 h-5 text-white" />
                  </motion.div>
                  <span className="text-gray-700 text-lg group-hover:text-gray-900 transition-colors">{benefit}</span>
                </motion.div>
              ))}
            </motion.div>

            <motion.button 
              className="px-10 py-5 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-lg rounded-xl relative overflow-hidden group shadow-xl shadow-orange-500/40"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 25px 50px rgba(249, 115, 22, 0.4)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">Open Your Free Account</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-700"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
              
              {/* Shine effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30"
                initial={{ x: "-100%" }}
                animate={{ x: "200%" }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatDelay: 1
                }}
              />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}