import { ArrowRight, Globe, Zap, Shield, Sparkles } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export function Hero() {
  const navigate = useNavigate();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);

  return (
    <div ref={ref} className="relative pt-20 min-h-screen flex items-center overflow-hidden bg-gradient-to-b from-orange-50/30 to-white">
      {/* Animated background orbs */}
      <motion.div 
        className="absolute top-1/4 -left-20 w-96 h-96 bg-orange-400/20 rounded-full blur-[120px]"
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div 
        className="absolute bottom-1/4 -right-20 w-96 h-96 bg-orange-300/20 rounded-full blur-[120px]"
        animate={{
          x: [0, -100, 0],
          y: [0, -50, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
        style={{ opacity }}
      >
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div style={{ y }}>
            <motion.div 
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-orange-100 border border-orange-200 text-orange-700 rounded-full mb-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ scale: 1.05 }}
            >
              <Sparkles className="w-4 h-4" />
              <span className="text-sm">Fast & Secure Cross-Border Payments</span>
            </motion.div>
            
            <motion.h1 
              className="text-6xl lg:text-7xl text-gray-900 mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Send Money
              <br />
              <span className="bg-gradient-to-r from-orange-500 via-orange-600 to-orange-500 bg-clip-text text-transparent animate-gradient">
                Globally
              </span>
              <br />
              in Seconds
            </motion.h1>
            
            <motion.p 
              className="text-xl text-gray-600 mb-10 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              AimPay makes international transactions simple, fast, and affordable. Send money to over 180 countries with the best exchange rates and lowest fees.
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <motion.button 
                className="px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl flex items-center justify-center gap-2 relative overflow-hidden group shadow-lg shadow-orange-500/30"
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(249, 115, 22, 0.4)" }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10" onClick={() => navigate('/login')}>Get Started Free</span>
                <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-700"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
              <motion.button 
                className="px-8 py-4 border-2 border-orange-500 text-orange-600 rounded-xl hover:bg-orange-50 transition-all relative group overflow-hidden"
                whileHover={{ scale: 1.05, borderColor: "rgba(249, 115, 22, 0.8)" }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10">See How It Works</span>
              </motion.button>
            </motion.div>

            <motion.div 
              className="flex flex-wrap items-center gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {[
                { icon: Globe, text: '180+ Countries' },
                { icon: Zap, text: 'Instant Transfer' },
                { icon: Shield, text: 'Bank-Level Security' }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  className="flex items-center gap-2 group cursor-pointer"
                  whileHover={{ scale: 1.1 }}
                >
                  <div className="p-2 bg-orange-100 rounded-lg border border-orange-200 group-hover:border-orange-500 transition-colors">
                    <item.icon className="w-4 h-4 text-orange-600" />
                  </div>
                  <span className="text-gray-600 group-hover:text-orange-600 transition-colors">{item.text}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            style={{ scale }}
          >
            <motion.div 
              className="absolute inset-0 bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 rounded-3xl blur-[100px] opacity-30"
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 90, 0],
              }}
              transition={{ 
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="relative"
              whileHover={{ 
                scale: 1.05,
                rotateY: 5,
                rotateX: 5,
              }}
              transition={{ duration: 0.3 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-orange-600/10 rounded-3xl" />
              <ImageWithFallback 
                src="https://images.unsplash.com/photo-1718778449026-fc05939d7650?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnbG9iYWwlMjBidXNpbmVzcyUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzY1MzYzMzc0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Global business technology"
                className="relative rounded-3xl shadow-2xl shadow-orange-500/20 w-full h-auto border border-orange-200"
              />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}