import Hero from "@/components/organisms/Hero";
import ProductsSection from "@/components/organisms/ProductsSection";
import ServicesSection from "@/components/organisms/ServicesSection";
import AboutSection from "@/components/organisms/AboutSection";
import ContactSection from "@/components/organisms/ContactSection";

const HomePage = () => {
  return (
    <main className="overflow-x-hidden">
      <Hero />
      <ProductsSection />
      <ServicesSection />
      <AboutSection />
      <ContactSection />
    </main>
  );
};

export default HomePage;