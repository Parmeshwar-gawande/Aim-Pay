import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { motion } from 'motion/react';

const footerLinks = {
  product: ['Features', 'Pricing', 'Security', 'API'],
  company: ['About Us', 'Careers', 'Blog', 'Contact'],
  legal: ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Compliance']
};

const socialLinks = [
  { icon: Facebook, href: '#' },
  { icon: Twitter, href: '#' },
  { icon: Linkedin, href: '#' },
  { icon: Instagram, href: '#' }
];

export function Footer() {
  return (
    <footer className="relative bg-gray-50 border-t border-orange-200">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-orange-50/30 to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Brand section */}
          <div className="lg:col-span-2">
            <motion.div 
              className="flex items-center gap-3 mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/30">
                <span className="text-white text-2xl">A</span>
              </div>
              <span className="text-3xl text-gray-900">AimPay</span>
            </motion.div>
            <p className="text-gray-600 mb-6 leading-relaxed max-w-sm">
              Making cross-border payments simple, fast, and affordable for everyone. Send money to 180+ countries with confidence.
            </p>
            
            {/* Contact info */}
            <div className="space-y-3">
              <motion.a 
                href="mailto:hello@aimpay.com"
                className="flex items-center gap-2 text-gray-600 hover:text-orange-500 transition-colors group"
                whileHover={{ x: 5 }}
              >
                <Mail className="w-4 h-4 group-hover:text-orange-500" />
                <span>hello@aimpay.com</span>
              </motion.a>
              <motion.a 
                href="tel:+1234567890"
                className="flex items-center gap-2 text-gray-600 hover:text-orange-500 transition-colors group"
                whileHover={{ x: 5 }}
              >
                <Phone className="w-4 h-4 group-hover:text-orange-500" />
                <span>+1 (234) 567-890</span>
              </motion.a>
              <motion.div 
                className="flex items-center gap-2 text-gray-600"
                whileHover={{ x: 5 }}
              >
                <MapPin className="w-4 h-4" />
                <span>San Francisco, CA</span>
              </motion.div>
            </div>
          </div>

          {/* Links sections */}
          {Object.entries(footerLinks).map(([title, links], i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <h3 className="text-gray-900 text-lg mb-6 capitalize">{title}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <motion.a 
                      href="#" 
                      className="text-gray-600 hover:text-orange-500 transition-colors inline-block relative group"
                      whileHover={{ x: 5 }}
                    >
                      {link}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-500 to-orange-600 group-hover:w-full transition-all duration-300" />
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom section */}
        <motion.div 
          className="border-t border-orange-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.p 
            className="text-gray-600"
            whileHover={{ scale: 1.05 }}
          >
            © 2025 AimPay. All rights reserved.
          </motion.p>
          
          {/* Social links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social, i) => (
              <motion.a
                key={i}
                href={social.href}
                className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-gray-600 hover:text-white border-2 border-orange-200 hover:border-orange-500 transition-all group relative overflow-hidden shadow-sm"
                whileHover={{ 
                  scale: 1.1,
                  rotate: 5
                }}
                whileTap={{ scale: 0.9 }}
              >
                <social.icon className="w-5 h-5 relative z-10" />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-orange-500 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1 }}
                />
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          className="mt-10 pt-10 border-t border-orange-200"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            {['PCI DSS Compliant', 'SSL Secured', 'GDPR Compliant', 'ISO 27001'].map((badge, i) => (
              <motion.div
                key={i}
                className="text-gray-500 text-sm"
                whileHover={{ scale: 1.1, opacity: 1 }}
              >
                {badge}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
}