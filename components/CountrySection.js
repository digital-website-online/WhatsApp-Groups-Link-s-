const countries = [
  { name: "Pakistan", slug: "pakistan", flag: "🇵🇰" },
  { name: "India", slug: "india", flag: "🇮🇳" },
  { name: "Bangladesh", slug: "bangladesh", flag: "🇧🇩" },
  { name: "United States", slug: "united-states", flag: "🇺🇸" },
  { name: "United Kingdom", slug: "united-kingdom", flag: "🇬🇧" },
  { name: "Canada", slug: "canada", flag: "🇨🇦" },
];

export default function CountrySection() {
  return (
    <section className="country-section" aria-labelledby="countries-title">
      <div className="country-section__heading">
        <div>
          <span className="country-section__eyebrow">DISCOVER</span>
          <h2 id="countries-title">WhatsApp Groups by Country</h2>
          <p>Explore communities from around the world.</p>
        </div>

        <a href="/countries" className="country-section__link">
          View all <span aria-hidden="true">→</span>
        </a>
      </div>

      <div className="country-section__grid">
        {countries.map((country) => (
          <a
            href={`/country/${country.slug}`}
            className="country-card"
            key={country.slug}
          >
            <span className="country-card__flag" aria-hidden="true">
              {country.flag}
            </span>

            <span className="country-card__content">
              <strong>{country.name}</strong>
              <small>Browse groups</small>
            </span>

            <span className="country-card__arrow" aria-hidden="true">
              →
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}