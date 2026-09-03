import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { supabase } from "../../lib/supabase";

export const revalidate = 60;

export const metadata = {
  title: "WhatsApp Groups by Country",
  description:
    "Find WhatsApp groups by country. Explore communities from Pakistan, India, Bangladesh, the United States, the United Kingdom and more.",
  alternates: {
    canonical: "/countries",
  },
};

export default async function CountriesPage() {
  const { data: countries, error } = await supabase
    .from("countries")
    .select("name, slug, flag")
    .order("name", { ascending: true });

  if (error) {
    console.error("Failed to load countries:", error);
  }

  return (
    <>
      <Header />

      <main>
        <section className="countries-page">
          <div className="countries-page__intro">
            <span>EXPLORE BY LOCATION</span>

            <h1>WhatsApp Groups by Country</h1>

            <p>
              Discover WhatsApp communities and groups from different
              countries around the world.
            </p>
          </div>

          <div className="countries-page__grid">
            {(countries || []).map((country) => (
              <a
                href={`/country/${country.slug}`}
                className="country-page-card"
                key={country.slug}
              >
                <span
                  className="country-page-card__flag"
                  aria-hidden="true"
                >
                  {country.flag}
                </span>

                <span className="country-page-card__content">
                  <strong>{country.name}</strong>
                  <small>Browse WhatsApp groups</small>
                </span>

                <span
                  className="country-page-card__arrow"
                  aria-hidden="true"
                >
                  →
                </span>
              </a>
            ))}
          </div>

          {(!countries || countries.length === 0) && (
            <div className="countries-page__empty">
              <p>Countries will appear here as they are added.</p>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
}