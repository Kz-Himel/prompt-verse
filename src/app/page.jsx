import BannerSection from "@/components/sections/BannerSection";
import FeaturedPrompts from "@/components/sections/FeaturedPrompts";
import HeroSection from "@/components/sections/BannerSection";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import HowItWorks from "@/components/sections/HowItWorks";
import TopCreators from "@/components/sections/TopCreators";


export default function Home() {
  return (
    <>
      <BannerSection />
      <FeaturedPrompts />
      <WhyChooseUs />
      <HowItWorks />
      <TopCreators />
    </>
  );
}
