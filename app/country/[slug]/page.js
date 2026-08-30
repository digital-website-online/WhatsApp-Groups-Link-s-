import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import GroupCard from "../../../components/GroupCard";

const countries = {
  pakistan: {
    name: "Pakistan",
    flag: "🇵🇰",
    description:
      "Discover WhatsApp groups and communities from Pakistan.",
  },
  india: {
    name: "India",
    flag: "🇮🇳",
    description:
      "Find active WhatsApp groups and communities from India.",
  },
  bangladesh: {
    name: "Bangladesh",
    flag: "🇧🇩",
    description:
      "Explore WhatsApp groups and communities from Bangladesh.",
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
      "Find WhatsApp groups and communities from the United Kingdom.",
  },
};

const groups = [
  {
    name: "Pakistan WhatsApp Groups",
    category: "General",
    country: "Pakistan",
    description:
      "Discover active WhatsApp communities from Pakistan.",
    members: "1.2K",
    href: "/group/pakistan-whatsapp-groups",
  },
  {
    name: "Study & Education Hub",
    category: "Education",
    country: "Pakistan",
    description:
      "Share knowledge, resources and study discussions.",
    members: "1.5K",
    href: "/group/study-education-hub",
  },
  {
    name: "Indian Friends & Community",
    category: "Community",
    country: "India",
    description:
      "Connect with an active community and discover new groups.",
    members: "980",
    href: "/group/indian-friends-community",
  },
];

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const country = countries[slug];

  if (!country) {
    return {
      title: "Country Not Found",
      description:
        "The requested WhatsApp groups country page could not be found.",
    };
  }

  return {
    title: `${country.name} WhatsApp Groups`,
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
          <section className="country-page__empty">
            <h1>Country Not Found</h1>
            <p>
              The requested country page could not be found.
            </p>
          </section>
        </main>

        <Footer />
      </>
    );
  }

  const countryGroups = groups.filter(
    (group) =>
      group.country.toLowerCase() === country.name.toLowerCase()
  );

  return (
    <>
      <Header />

      <main className="country-page">
        <section className="country-page__hero">
          <div className="country-page__flag" aria-hidden="true">
            {country.flag}
          </div>

          <span className="country-page__eyebrow">
            WHATSAPP GROUPS
          </span>

          <h1>{country.name} WhatsApp Groups</h1>

          <p>{country.description}</p>
        </section>

        <section className="country-page__groups">
          <h2>Latest WhatsApp Groups from {country.name}</h2>

          {countryGroups.length > 0 ? (
            <div className="country-page__grid">
              {countryGroups.map((group) => (
                <GroupCard key={group.href} {...group} />
              ))}
            </div>
          ) : (
            <div className="country-page__empty">
              <p>
                New WhatsApp groups from {country.name} will appear
                here as they are added.
              </p>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
}