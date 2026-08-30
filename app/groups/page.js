import Header from "../../components/Header";
import GroupCard from "../../components/GroupCard";
import Footer from "../../components/Footer";

const groups = [
  {
    name: "Pakistan WhatsApp Groups",
    category: "General",
    country: "Pakistan",
    description:
      "Discover active WhatsApp communities from Pakistan.",
    members: "1.2K",
    href: "/group/pakistan-whatsapp-groups",
    keywords:
      "pakistan whatsapp groups pakistan whatsapp group links pakistan community",
  },
  {
    name: "Indian Friends & Community",
    category: "Community",
    country: "India",
    description:
      "Connect with an active community and discover new groups.",
    members: "980",
    href: "/group/indian-friends-community",
    keywords:
      "india whatsapp groups indian whatsapp groups friends community",
  },
  {
    name: "Technology & Programming",
    category: "Technology",
    country: "Global",
    description:
      "Discuss technology, programming and the latest trends.",
    members: "2.4K",
    href: "/group/technology-programming",
    keywords:
      "technology programming coding developer software ai tech whatsapp groups",
  },
  {
    name: "Study & Education Hub",
    category: "Education",
    country: "Pakistan",
    description:
      "Share knowledge, resources and study discussions.",
    members: "1.5K",
    href: "/group/study-education-hub",
    keywords:
      "education study students learning school college university whatsapp groups",
  },
];

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
      "Discover WhatsApp groups by category, country and topic. Find active communities and join groups that match your interests.",
    alternates: {
      canonical: "/groups",
    },
  };
}

export default async function GroupsPage({ searchParams }) {
  const params = await searchParams;
  const query = params?.q?.trim().toLowerCase() || "";

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