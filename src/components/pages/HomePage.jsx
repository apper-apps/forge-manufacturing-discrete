import Hero from "@/components/organisms/Hero";
import ProductsSection from "@/components/organisms/ProductsSection";
import ServicesSection from "@/components/organisms/ServicesSection";
import ProjectsSection from "@/components/organisms/ProjectsSection";
import AboutSection from "@/components/organisms/AboutSection";
import ContactSection from "@/components/organisms/ContactSection";
const HomePage = () => {
  return (
    <main className="overflow-x-hidden">
<Hero />
<ProductsSection />
<ServicesSection />
<ProjectsSection />
<AboutSection />
<ContactSection />
    </main>
  );
};

export default HomePage;