import { motion } from "framer-motion";
import ContactForm from "@/components/molecules/ContactForm";
import ApperIcon from "@/components/ApperIcon";

const ContactSection = () => {
  const contactInfo = [
    {
      icon: "MapPin",
      title: "Visit Us",
      details: ["1234 Manufacturing Way", "Industrial District, NY 12345"]
    },
    {
      icon: "Phone",
      title: "Call Us",
      details: ["+1 (555) 123-4567", "Mon - Fri, 8AM - 6PM EST"]
    },
    {
      icon: "Mail",
      title: "Email Us",
      details: ["info@forgepro.com", "quotes@forgepro.com"]
    }
  ];

  return (
    <section id="contact" className="py-24 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 bg-accent-100 rounded-full mb-6">
            <span className="text-sm font-medium text-accent-700">Get In Touch</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6">
            Let's Start Your <span className="bg-gradient-to-r from-accent-600 to-primary-600 bg-clip-text text-transparent">Project</span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-body leading-relaxed">
            Ready to bring your manufacturing vision to life? Contact us today for a 
            personalized consultation and detailed project quote.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-display font-bold text-gray-900 mb-6">
                Contact Information
              </h3>
              
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start space-x-4 p-6 bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg p-3 flex-shrink-0">
                      <ApperIcon name={info.icon} className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-display font-semibold text-gray-900 mb-2">
                        {info.title}
                      </h4>
                      {info.details.map((detail, idx) => (
                        <p key={idx} className="text-gray-600 font-body">
                          {detail}
                        </p>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Business Hours */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl p-8 text-white"
            >
              <h4 className="text-xl font-display font-bold mb-6">Business Hours</h4>
              <div className="space-y-3 font-body">
                <div className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span>8:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span>9:00 AM - 3:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span>Closed</span>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-white/20">
                <p className="text-sm opacity-90">
                  For urgent inquiries outside business hours, please email us and we'll respond within 24 hours.
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;