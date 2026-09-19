import BannerSection from "@/components/sections/BannerSection";
import FeaturedPrompts from "@/components/sections/FeaturedPrompts";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import CategoriesShowcase from "@/components/sections/CategoriesShowcase";
import HowItWorks from "@/components/sections/HowItWorks";
import TopCreators from "@/components/sections/TopCreators";
import LiveStatsSection from "@/components/sections/LiveStatsSection";
import Reviews from "@/components/sections/Reviews";
import FAQSection from "@/components/sections/FAQSection";
import NewsletterSection from "@/components/sections/NewsLetterSection";


export default function Home() {
  return (
    <>
      <BannerSection />
      <FeaturedPrompts />
      <WhyChooseUs />
      <CategoriesShowcase />
      <HowItWorks />
      <TopCreators />
      <LiveStatsSection />
      <Reviews />
      <FAQSection />
      <NewsletterSection />
    </>
  );
}