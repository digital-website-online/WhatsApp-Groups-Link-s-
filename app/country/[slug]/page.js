import Header from "../../../components/Header";
import Footer from "../../../components/Footer";

const countries = {
  pakistan: {
    name: "Pakistan",
    flag: "🇵🇰",
    description:
      "Explore WhatsApp groups and communities from Pakistan.",
  },

  india: {
    name: "India",
    flag: "🇮🇳",
    description:
      "Discover WhatsApp groups and communities from India.",
  },

  bangladesh: {
    name: "Bangladesh",
    flag: "🇧🇩",
    description:
      "Find WhatsApp groups and communities from Bangladesh.",
  },

  "united-states": {
    name: "United States",
    flag: "🇺🇸",
    description:
      "Discover WhatsApp groups and communities from the United States.",
  },

  "united-kingdom": {
    name: "United Kingdom",
    flag: "🇬🇧",
    description:
      "Explore WhatsApp groups and communities from the United Kingdom.",
  },

  canada: {
    name: "Canada",
    flag: "🇨🇦",
    description:
      "Find WhatsApp groups and communities from Canada.",
  },
};

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const country = countries[slug];

  if (!country) {
    return {
      title: "Country Not Found",
      description: "The requested country could not be found.",
    };
  }

  return {
    title: `WhatsApp Groups in ${country.name}`,
    description: country.description,
    alternates: {
      canonical: `/country/${slug}`,
    },
  };
}

export default async function CountryPage({ params }) {
  const { slug } = await params;
  const country = countries[slug];

  if (!country) {
    return (
      <>
        <Header />

        <main className="country-page">
          <h1>Country Not Found</h1>
          <p>The requested country could not be found.</p>
        </main>

        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />

      <main className="country-page">
        <section className="country-page__hero">
          <span className="country-page__flag" aria-hidden="true">
            {country.flag}
          </span>

          <span className="country-page__eyebrow">
            WHATSAPP GROUPS
          </span>

          <h1>WhatsApp Groups in {country.name}</h1>

          <p>{country.description}</p>
        </section>

        <section className="country-page__groups">
          <h2>Popular Groups in {country.name}</h2>

          <div className="country-page__empty">
            <p>
              Groups for this country will appear here as they are added.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}