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
  const [activeTab, setActiveTab] = useState(0);

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

if (loading) return <Loading />;
  if (error) return <Error message={error} />;
  if (!services.length) return <Empty message="No services available" />;

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
            Comprehensive manufacturing services with detailed specifications, advanced equipment, 
            and precise quality control for your most demanding projects.
          </p>
        </motion.div>

        {/* Service Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {services.map((service, index) => (
              <button
                key={service.Id}
                onClick={() => setActiveTab(index)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeTab === index
                    ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {service.name}
              </button>
            ))}
          </div>

          {/* Active Service Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-br from-surface to-gray-100 rounded-2xl p-8 md:p-12"
          >
            {services[activeTab] && (
              <div className="space-y-8">
                {/* Service Header */}
                <div className="text-center">
                  <h3 className="text-3xl font-display font-bold text-gray-900 mb-4">
                    {services[activeTab].name}
                  </h3>
                  <p className="text-lg text-gray-600 font-body max-w-3xl mx-auto">
                    {services[activeTab].description}
                  </p>
                </div>

                {/* Service Details Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Process Description */}
                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <h4 className="text-xl font-display font-bold text-gray-900 mb-4">
                      Process Overview
                    </h4>
                    <p className="text-gray-600 font-body leading-relaxed mb-4">
                      {services[activeTab].processDescription}
                    </p>
                    <div className="space-y-2">
                      {services[activeTab].processSteps?.map((step, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <div className="bg-primary-100 text-primary-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                            {index + 1}
                          </div>
                          <span className="text-gray-700 font-body text-sm">{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Equipment Capabilities */}
                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <h4 className="text-xl font-display font-bold text-gray-900 mb-4">
                      Equipment & Capabilities
                    </h4>
                    <div className="space-y-3">
                      {services[activeTab].equipment?.map((item, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-accent-500 rounded-full"></div>
                          <span className="text-gray-700 font-body text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Materials & Specifications */}
                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <h4 className="text-xl font-display font-bold text-gray-900 mb-4">
                      Materials & Specifications
                    </h4>
                    <div className="space-y-4">
                      <div>
                        <h5 className="font-medium text-gray-900 mb-2">Supported Materials:</h5>
                        <div className="flex flex-wrap gap-2">
                          {services[activeTab].materials?.map((material, index) => (
                            <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                              {material}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h5 className="font-medium text-gray-900 mb-2">Tolerance Range:</h5>
                        <span className="text-primary-600 font-bold">{services[activeTab].toleranceRange}</span>
                      </div>
                    </div>
                  </div>

                  {/* Turnaround & Capacity */}
                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <h4 className="text-xl font-display font-bold text-gray-900 mb-4">
                      Turnaround & Capacity
                    </h4>
                    <div className="space-y-4">
                      <div>
                        <h5 className="font-medium text-gray-900 mb-2">Typical Turnaround:</h5>
                        <span className="text-accent-600 font-bold">{services[activeTab].turnaroundTime}</span>
                      </div>
                      <div>
                        <h5 className="font-medium text-gray-900 mb-2">Production Capacity:</h5>
                        <span className="text-gray-700 font-body text-sm">{services[activeTab].capacity}</span>
                      </div>
                      <div>
                        <h5 className="font-medium text-gray-900 mb-2">Quality Standards:</h5>
                        <div className="flex flex-wrap gap-2">
                          {services[activeTab].qualityStandards?.map((standard, index) => (
                            <span key={index} className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                              {standard}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>

        {/* Process Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
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