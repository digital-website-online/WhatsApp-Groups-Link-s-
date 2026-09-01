import Header from "../components/Header";
import HomeHero from "../components/HomeHero";
import StatsSection from "../components/StatsSection";
import CategorySection from "../components/CategorySection";
import GroupSection from "../components/GroupSection";
import CountrySection from "../components/CountrySection";
import Footer from "../components/Footer";

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
      </main>

      <Footer />
    </>
  );
}