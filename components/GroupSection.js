import GroupCard from "./GroupCard";
import { supabase } from "../lib/supabase";

export const revalidate = 60;

export default async function GroupSection() {
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
    console.error("Failed to load homepage groups:", error);
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

  const groupSections = [
    {
      title: "Friendship & Community Groups",
      description: "Meet people and discover active communities.",
      href: "/groups?q=friendship",
      groups: groups.filter(
        (group) =>
          group.category.toLowerCase() === "friendship" ||
          group.category.toLowerCase() === "community"
      ).slice(0, 2),
    },
    {
      title: "Pakistan WhatsApp Groups",
      description: "Explore WhatsApp communities from Pakistan.",
      href: "/country/pakistan",
      groups: groups
        .filter(
          (group) => group.country.toLowerCase() === "pakistan"
        )
        .slice(0, 2),
    },
    {
      title: "Jobs & Career Groups",
      description:
        "Find communities focused on jobs, careers and opportunities.",
      href: "/groups?q=jobs",
      groups: groups
        .filter(
          (group) => group.category.toLowerCase() === "jobs"
        )
        .slice(0, 2),
    },
    {
      title: "Gaming & Entertainment",
      description:
        "Join communities for gaming, movies and entertainment.",
      href: "/groups?q=gaming",
      groups: groups
        .filter(
          (group) =>
            group.category.toLowerCase() === "gaming" ||
            group.category.toLowerCase() === "entertainment"
        )
        .slice(0, 2),
    },
  ];

  return (
    <section className="group-section" aria-labelledby="groups-title">
      <div className="group-section__intro">
        <span className="group-section__eyebrow">DISCOVER</span>

        <h2 id="groups-title">Popular WhatsApp Groups</h2>

        <p>
          Explore popular communities by topic and discover groups worth
          joining.
        </p>
      </div>

      <div className="group-section__sections">
        {groupSections.map((section) => (
          <div
            className="group-section__category"
            key={section.title}
          >
            <div className="group-section__heading">
              <div>
                <h3>{section.title}</h3>
                <p>{section.description}</p>
              </div>

              <a
                href={section.href}
                className="group-section__link"
              >
                Show More <span aria-hidden="true">→</span>
              </a>
            </div>

            {section.groups.length > 0 ? (
              <div className="group-section__grid">
                {section.groups.map((group) => (
                  <GroupCard key={group.href} {...group} />
                ))}
              </div>
            ) : (
              <div className="group-section__empty">
                <p>
                  New WhatsApp groups will appear here as they are
                  added.
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}