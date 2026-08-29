import SearchBar from "./SearchBar";

export default function HomeHero() {
  return (
    <section className="home-hero">
      <div className="home-hero__inner">
        <h1>Find WhatsApp Groups</h1>

        <p>
          Discover WhatsApp groups by country, category and topic.
        </p>

        <SearchBar />
      </div>
    </section>
  );
}