import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import TextArea from "@/components/atoms/TextArea";
import useContactForm from "@/hooks/useContactForm";

const ContactForm = () => {
  const { formData, errors, isSubmitting, handleChange, handleSubmit } = useContactForm();

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="mb-8">
        <h3 className="text-2xl font-display font-bold text-gray-900 mb-2">
          Start Your Project
        </h3>
        <p className="text-gray-600 font-body">
          Tell us about your manufacturing needs and we'll provide a detailed quote.
        </p>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Input
              name="name"
              label="Full Name"
              required
              value={formData.name}
              onChange={handleChange}
              error={!!errors.name}
              placeholder="Enter your full name"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name}</p>
            )}
          </div>

          <div>
            <Input
              name="email"
              type="email"
              label="Email Address"
              required
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>
        </div>

        <div>
          <Input
            name="company"
            label="Company Name"
            required
            value={formData.company}
            onChange={handleChange}
            error={!!errors.company}
            placeholder="Enter your company name"
          />
          {errors.company && (
            <p className="mt-1 text-sm text-red-600">{errors.company}</p>
          )}
        </div>

        <div>
          <TextArea
            name="project"
            label="Project Description"
            required
            rows={5}
            value={formData.project}
            onChange={handleChange}
            error={!!errors.project}
            placeholder="Describe your project requirements, timeline, and any specific needs..."
          />
          {errors.project && (
            <p className="mt-1 text-sm text-red-600">{errors.project}</p>
          )}
        </div>

        <Button
          type="submit"
          size="lg"
          loading={isSubmitting}
          className="w-full"
        >
          {isSubmitting ? "Submitting..." : "Get Quote"}
        </Button>
      </div>
    </motion.form>
  );
};

export default ContactForm;