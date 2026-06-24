import BannerSection from "@/components/sections/BannerSection";
import FeaturedPrompts from "@/components/sections/FeaturedPrompts";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import HowItWorks from "@/components/sections/HowItWorks";
import TopCreators from "@/components/sections/TopCreators";
import Reviews from "@/components/sections/Reviews";
import NewsletterSection from "@/components/sections/NewsLetterSection";


export default function Home() {
  return (
    <>
      <BannerSection />
      <FeaturedPrompts />
      <WhyChooseUs />
      <HowItWorks />
      <TopCreators />
      <Reviews />
      <NewsletterSection />
    </>
  );
}
