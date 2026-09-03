import { supabase } from "../lib/supabase";

export const revalidate = 60;

export default async function CountrySection() {
  const { data: countries, error } = await supabase
    .from("countries")
    .select("name, slug, flag")
    .order("name", { ascending: true });

  if (error) {
    console.error("Failed to load homepage countries:", error);
  }

  return (
    <section
      className="country-section"
      aria-labelledby="countries-title"
    >
      <div className="country-section__heading">
        <div>
          <span className="country-section__eyebrow">
            DISCOVER
          </span>

          <h2 id="countries-title">
            WhatsApp Groups by Country
          </h2>

          <p>Explore communities from around the world.</p>
        </div>

        <a
          href="/countries"
          className="country-section__link"
        >
          View all <span aria-hidden="true">→</span>
        </a>
      </div>

      <div className="country-section__grid">
        {(countries || []).slice(0, 6).map((country) => (
          <a
            href={`/country/${country.slug}`}
            className="country-card"
            key={country.slug}
          >
            <span
              className="country-card__flag"
              aria-hidden="true"
            >
              {country.flag}
            </span>

            <span className="country-card__content">
              <strong>{country.name}</strong>
              <small>Browse groups</small>
            </span>

            <span
              className="country-card__arrow"
              aria-hidden="true"
            >
              →
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}