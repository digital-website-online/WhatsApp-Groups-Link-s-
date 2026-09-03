import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import GroupCard from "../../../components/GroupCard";
import { supabase } from "../../../lib/supabase";

export const revalidate = 60;

const countryDescriptions = {
  Pakistan:
    "Discover WhatsApp groups and communities from Pakistan.",
  India:
    "Find active WhatsApp groups and communities from India.",
  Bangladesh:
    "Explore WhatsApp groups and communities from Bangladesh.",
  "United States":
    "Discover WhatsApp groups and communities from the United States.",
  "United Kingdom":
    "Find WhatsApp groups and communities from the United Kingdom.",
};

async function getCountry(slug) {
  const { data, error } = await supabase
    .from("countries")
    .select("id, name, slug, flag")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error("Failed to load country:", error);
    return null;
  }

  return data;
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const country = await getCountry(slug);

  if (!country) {
    return {
      title: "Country Not Found",
      description:
        "The requested WhatsApp groups country page could not be found.",
    };
  }

  return {
    title: `${country.name} WhatsApp Groups`,
    description:
      countryDescriptions[country.name] ||
      `Discover WhatsApp groups and communities from ${country.name}.`,
    alternates: {
      canonical: `/country/${slug}`,
    },
  };
}

export default async function CountryPage({ params }) {
  const { slug } = await params;

  const country = await getCountry(slug);

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

  const { data: groupsData, error: groupsError } = await supabase
    .from("groups")
    .select(`
      name,
      slug,
      description,
      members,
      keywords,
      image_url,
      categories(name)
    `)
    .eq("country_id", country.id)
    .eq("status", "approved")
    .order("created_at", { ascending: false });

  if (groupsError) {
    console.error("Failed to load country groups:", groupsError);
  }

  const countryGroups = (groupsData || []).map((group) => ({
    name: group.name,
    category: group.categories?.name || "",
    country: country.name,
    description: group.description || "",
    members: group.members || "",
    image_url: group.image_url || null,
    href: `/group/${group.slug}`,
    keywords: group.keywords || "",
  }));

  const countryDescription =
    countryDescriptions[country.name] ||
    `Discover WhatsApp groups and communities from ${country.name}.`;

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

          <p>{countryDescription}</p>
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