import Header from "../../components/Header";
import Footer from "../../components/Footer";

const countries = [
  { name: "Pakistan", slug: "pakistan", flag: "🇵🇰" },
  { name: "India", slug: "india", flag: "🇮🇳" },
  { name: "Bangladesh", slug: "bangladesh", flag: "🇧🇩" },
  { name: "United States", slug: "united-states", flag: "🇺🇸" },
  { name: "United Kingdom", slug: "united-kingdom", flag: "🇬🇧" },
  { name: "Canada", slug: "canada", flag: "🇨🇦" },
];

export const metadata = {
  title: "WhatsApp Groups by Country",
  description:
    "Find WhatsApp groups by country. Explore communities from Pakistan, India, Bangladesh, the United States, the United Kingdom and more.",
  alternates: {
    canonical: "/countries",
  },
};

export default function CountriesPage() {
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
            {countries.map((country) => (
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
        </section>
      </main>

      <Footer />
    </>
  );
}