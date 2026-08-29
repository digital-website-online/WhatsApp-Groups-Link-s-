import SearchBar from "./SearchBar";

export default function HomeHero() {
  return (
    <section className="home-hero">
      <div className="home-hero__glow" aria-hidden="true" />

      <div className="home-hero__inner">
        <div className="home-hero__badge">
          <span className="home-hero__badge-dot" />
          Discover active WhatsApp communities
        </div>

        <h1>
          Find the right
          <span> WhatsApp group</span>
        </h1>

        <p>
          Explore thousands of WhatsApp groups by topic, category and
          country. Find communities that match your interests.
        </p>

        <SearchBar />

        <div className="home-hero__stats" aria-label="Website highlights">
          <div>
            <strong>10K+</strong>
            <span>Groups</span>
          </div>

          <div>
            <strong>100+</strong>
            <span>Categories</span>
          </div>

          <div>
            <strong>50+</strong>
            <span>Countries</span>
          </div>
        </div>
      </div>
    </section>
  );
}