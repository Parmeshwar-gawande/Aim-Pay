import { ArrowRight, Globe, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

export function CTA() {
  return (
    <section className="py-32 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-orange-600 via-pink-600 to-orange-700"
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            backgroundSize: '200% 200%'
          }}
        />
        
        {/* Floating orbs */}
        <motion.div
          className="absolute top-20 left-20 w-72 h-72 bg-orange-400 rounded-full blur-[100px] opacity-50"
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
          className="absolute bottom-20 right-20 w-96 h-96 bg-pink-400 rounded-full blur-[100px] opacity-50"
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

        {/* Animated grid pattern */}
        <motion.div
          className="absolute inset-0 opacity-10"
          animate={{
            backgroundPosition: ['0px 0px', '50px 50px'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />
      </div>
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl mb-8 relative"
            animate={{ 
              rotate: 360,
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <Globe className="w-10 h-10 text-white" />
            
            {/* Orbiting sparkles */}
            {[0, 120, 240].map((rotation, i) => (
              <motion.div
                key={i}
                className="absolute"
                animate={{
                  rotate: [rotation, rotation + 360],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                  delay: i * 0.2
                }}
                style={{
                  transformOrigin: '40px 0px'
                }}
              >
                <Sparkles className="w-4 h-4 text-yellow-300" />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
        
        <motion.h2 
          className="text-5xl lg:text-7xl text-white mb-8 leading-tight"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Ready to Send Money
          <br />
          <motion.span
            className="inline-block"
            animate={{
              textShadow: [
                '0 0 20px rgba(255,255,255,0.5)',
                '0 0 40px rgba(255,255,255,0.8)',
                '0 0 20px rgba(255,255,255,0.5)',
              ]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            Globally?
          </motion.span>
        </motion.h2>
        
        <motion.p 
          className="text-xl lg:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Join thousands of satisfied customers who trust AimPay for their cross-border transactions. Sign up today and get your first transfer fee-free.
        </motion.p>

        <motion.div 
          className="flex flex-col sm:flex-row gap-6 justify-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <motion.button 
            className="px-10 py-5 bg-white text-orange-600 text-lg rounded-xl inline-flex items-center justify-center gap-3 relative overflow-hidden group shadow-2xl"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 30px 60px rgba(0,0,0,0.3)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">Get Started Now</span>
            <ArrowRight className="w-6 h-6 relative z-10 group-hover:translate-x-2 transition-transform" />
            
            {/* Animated shine */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-100 to-transparent"
              initial={{ x: "-100%" }}
              animate={{ x: "200%" }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 1
              }}
            />
          </motion.button>
          
          <motion.button 
            className="px-10 py-5 border-3 border-white text-white text-lg rounded-xl backdrop-blur-sm relative overflow-hidden group"
            whileHover={{ 
              scale: 1.05,
              backgroundColor: "rgba(255,255,255,0.1)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">Contact Sales</span>
            <motion.div
              className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity"
            />
          </motion.button>
        </motion.div>

        <motion.div
          className="mt-10 flex items-center justify-center gap-8 flex-wrap"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {['No credit card required', 'Free account setup', 'Cancel anytime'].map((text, i) => (
            <motion.div
              key={i}
              className="flex items-center gap-2"
              whileHover={{ scale: 1.1 }}
            >
              <div className="w-2 h-2 bg-white rounded-full" />
              <span className="text-white/90">{text}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
