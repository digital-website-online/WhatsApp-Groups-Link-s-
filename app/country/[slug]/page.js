import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import GroupCard from "../../../components/GroupCard";
import { supabase } from "../../../lib/supabase";

export const revalidate = 60;

export async function generateMetadata({ params }) {
  const { slug } = await params;

  const { data: country } = await supabase
    .from("countries")
    .select("name")
    .eq("slug", slug)
    .single();

  if (!country) {
    return {
      title: "Country Not Found",
      description:
        "The requested WhatsApp groups country page could not be found.",
    };
  }

  return {
    title: `${country.name} WhatsApp Groups`,
    description: `Discover WhatsApp groups and communities from ${country.name}.`,
    alternates: {
      canonical: `/country/${slug}`,
    },
  };
}

export default async function CountryPage({ params }) {
  const { slug } = await params;

  const { data: country, error: countryError } = await supabase
    .from("countries")
    .select("id, name, slug, flag")
    .eq("slug", slug)
    .single();

  if (countryError || !country) {
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
      categories(name),
      countries(name)
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
    country: group.countries?.name || country.name,
    description: group.description || "",
    members: group.members || "",
    href: `/group/${group.slug}`,
    keywords: group.keywords || "",
  }));

  const countryDescription =
    country.name === "Pakistan"
      ? "Discover WhatsApp groups and communities from Pakistan."
      : country.name === "India"
      ? "Find active WhatsApp groups and communities from India."
      : country.name === "Bangladesh"
      ? "Explore WhatsApp groups and communities from Bangladesh."
      : country.name === "United States"
      ? "Discover WhatsApp groups and communities from the United States."
      : country.name === "United Kingdom"
      ? "Find WhatsApp groups and communities from the United Kingdom."
      : `Discover WhatsApp groups and communities from ${country.name}.`;

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