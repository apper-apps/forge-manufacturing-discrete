import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ServiceCard from "@/components/molecules/ServiceCard";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import { serviceService } from "@/services/api/serviceService";

const ServicesSection = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadServices = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await serviceService.getAll();
      setServices(data);
    } catch (err) {
      setError(err.message || "Failed to load services");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadServices();
  }, []);

  if (loading) {
    return (
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Loading />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Error message={error} onRetry={loadServices} />
        </div>
      </section>
    );
  }

  if (services.length === 0) {
    return (
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Empty
            title="No services available"
            description="We're currently updating our service offerings. Please check back soon."
            icon="Settings"
          />
        </div>
      </section>
    );
  }

  return (
    <section id="services" className="py-24 bg-white">
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
            <span className="text-sm font-medium text-accent-700">Manufacturing Services</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6">
            Our <span className="bg-gradient-to-r from-accent-600 to-primary-600 bg-clip-text text-transparent">Services</span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-body leading-relaxed">
            End-to-end manufacturing services designed to support your project from 
            concept to completion with uncompromising quality and precision.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {services.map((service, index) => (
            <ServiceCard
              key={service.Id}
              service={service}
              index={index}
            />
          ))}
        </div>

        {/* Process Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-gradient-to-br from-surface to-gray-100 rounded-2xl p-8 md:p-12"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-display font-bold text-gray-900 mb-4">
              Our Manufacturing Process
            </h3>
            <p className="text-gray-600 font-body text-lg max-w-2xl mx-auto">
              A streamlined approach that ensures quality, efficiency, and timely delivery
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Consultation", desc: "Understanding your requirements and specifications" },
              { step: "02", title: "Design", desc: "Creating detailed blueprints and prototypes" },
              { step: "03", title: "Production", desc: "Manufacturing with precision and quality control" },
              { step: "04", title: "Delivery", desc: "Final inspection and timely delivery" }
            ].map((phase, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="bg-gradient-to-br from-primary-500 to-accent-500 text-white rounded-full w-16 h-16 flex items-center justify-center font-bold text-lg mx-auto mb-4">
                  {phase.step}
                </div>
                <h4 className="font-display font-bold text-gray-900 mb-2">{phase.title}</h4>
                <p className="text-gray-600 font-body text-sm">{phase.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;