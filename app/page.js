import Header from "../components/Header";
import HomeHero from "../components/HomeHero";
import StatsSection from "../components/StatsSection";
import CategorySection from "../components/CategorySection";
import GroupSection from "../components/GroupSection";
import CountrySection from "../components/CountrySection";
import Footer from "../components/Footer";
import FAQSection from "../components/FAQSection";
import BlogSection from "../components/BlogSection";
import TopicLandingSection from "../components/TopicLandingSection";

export default function HomePage() {
  return (
    <>
      <Header />

      <main>
        <HomeHero />
        <StatsSection />
        <CategorySection />
        <GroupSection />
        <CountrySection />
        <TopicLandingSection />
        <FAQSection />
        <BlogSection />
      </main>

      <Footer />
    </>
  );
}