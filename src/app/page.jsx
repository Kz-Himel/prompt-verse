import BannerSection from "@/components/sections/BannerSection";
import FeaturedPrompts from "@/components/sections/FeaturedPrompts";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <BannerSection />
      <FeaturedPrompts />
    </>
  );
}
