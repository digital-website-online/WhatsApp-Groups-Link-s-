import Header from "../../components/Header";
import GroupCard from "../../components/GroupCard";
import Footer from "../../components/Footer";
import { supabase } from "../../lib/supabase";

export const revalidate = 60;

export async function generateMetadata({ searchParams }) {
  const params = await searchParams;
  const query = params?.q?.trim();

  if (query) {
    return {
      title: `WhatsApp Groups for "${query}"`,
      description:
        `Find WhatsApp groups related to ${query}. Discover communities and groups matching your search.`,
      robots: {
        index: false,
        follow: true,
      },
    };
  }

  return {
    title: "WhatsApp Groups - Discover Active Groups",
    description:
      "Discover WhatsApp groups by category, country and topic. Find active communities and groups that match your interests.",
    alternates: {
      canonical: "/groups",
    },
  };
}

export default async function GroupsPage({ searchParams }) {
  const params = await searchParams;
  const query = params?.q?.trim().toLowerCase() || "";

  const { data: groupsData, error } = await supabase
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
    .eq("status", "approved")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Failed to load groups:", error);

    return (
      <>
        <Header />

        <main>
          <section className="groups-page">
            <div className="groups-page__intro">
              <span>EXPLORE</span>

              <h1>WhatsApp Groups</h1>

              <p>
                Discover WhatsApp groups by category, country and topic.
              </p>
            </div>

            <div className="groups-page__empty">
              <h2>Unable to load groups</h2>

              <p>
                We could not load the WhatsApp groups right now.
                Please try again later.
              </p>
            </div>
          </section>
        </main>

        <Footer />
      </>
    );
  }

  const groups = (groupsData || []).map((group) => ({
    name: group.name,
    category: group.categories?.name || "",
    country: group.countries?.name || "",
    description: group.description || "",
    members: group.members || "",
    href: `/group/${group.slug}`,
    keywords: group.keywords || "",
  }));

  const filteredGroups = query
    ? groups.filter((group) => {
        const searchableText = [
          group.name,
          group.category,
          group.country,
          group.description,
          group.keywords,
        ]
          .join(" ")
          .toLowerCase();

        return searchableText.includes(query);
      })
    : groups;

  return (
    <>
      <Header />

      <main>
        <section className="groups-page">
          <div className="groups-page__intro">
            <span>{query ? "SEARCH RESULTS" : "EXPLORE"}</span>

            <h1>
              {query
                ? `WhatsApp Groups for "${query}"`
                : "WhatsApp Groups"}
            </h1>

            <p>
              {query
                ? `Showing groups related to "${query}".`
                : "Discover WhatsApp groups by category, country and topic."}
            </p>
          </div>

          {filteredGroups.length > 0 ? (
            <div className="groups-page__grid">
              {filteredGroups.map((group) => (
                <GroupCard key={group.href} {...group} />
              ))}
            </div>
          ) : (
            <div className="groups-page__empty">
              <h2>No groups found</h2>

              <p>
                We could not find a WhatsApp group matching your
                search. Try another keyword.
              </p>

              <a href="/groups">View all groups</a>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
}