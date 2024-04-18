import CategoryHeader from "@/components/categoryHeader";
import FeaturedProduct from "../components/FeaturedProduct";
import HeroSection from "../components/heroSection";
import CategoryCataloge from "@/components/CategoryCataloge";
import DealsOfDay from "@/components/home/Deals";
import Footer from "@/components/home/Footer";
import LuxFP from "@/components/LuxFP";




export default function Home() {
  return (

    <div className="">
      <CategoryHeader />
      <HeroSection />
      <FeaturedProduct />
      <CategoryCataloge />
      <DealsOfDay /> 
      <LuxFP  />
      <Footer />
    </div>

  );
}
