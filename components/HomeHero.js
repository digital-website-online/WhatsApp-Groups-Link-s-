export default function HomeHero() {
  return (
    <section className="home-hero">
      <div className="home-hero__glow" aria-hidden="true" />

      <div className="home-hero__content">
        <span className="home-hero__eyebrow">WHATSAPP GROUP DIRECTORY</span>

        <h1>
          Find the right
          <span> WhatsApp group.</span>
        </h1>

        <p>
          Discover WhatsApp groups by topic, category and country.
          Find communities that match your interests.
        </p>

        <form className="home-search" action="/groups">
          <label htmlFor="group-search" className="sr-only">
            Search WhatsApp groups
          </label>

          <div className="home-search__box">
            <span className="home-search__icon" aria-hidden="true">
              ⌕
            </span>

            <input
              id="group-search"
              name="q"
              type="search"
              placeholder="Search WhatsApp groups..."
              autoComplete="off"
            />

            <button type="submit">Search</button>
          </div>
        </form>

        <div className="home-hero__quick">
          <span>Popular:</span>
          <a href="/groups?q=gaming">Gaming</a>
          <a href="/groups?q=education">Education</a>
          <a href="/groups?q=technology">Technology</a>
          <a href="/groups?q=pakistan">Pakistan</a>
        </div>
      </div>
    </section>
  );
}