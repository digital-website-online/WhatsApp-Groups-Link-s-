import Header from "../../components/Header";
import Footer from "../../components/Footer";
import GroupCard from "../../components/GroupCard";
import { supabase } from "../../lib/supabase";

export const revalidate = 60;

export const metadata = {
  title: "New WhatsApp Groups",
  description:
    "Discover newly added WhatsApp groups and communities by category and country.",
  alternates: {
    canonical: "/new-groups",
  },
};

export default async function NewGroupsPage() {
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
    console.error("Failed to load new groups:", error);
  }

  const newGroups = (groupsData || []).map((group) => ({
    name: group.name,
    category: group.categories?.name || "",
    country: group.countries?.name || "",
    description: group.description || "",
    members: group.members || "",
    href: `/group/${group.slug}`,
    keywords: group.keywords || "",
  }));

  return (
    <>
      <Header />

      <main>
        <section className="new-groups-page">
          <div className="new-groups-page__intro">
            <span>JUST ADDED</span>

            <h1>New WhatsApp Groups</h1>

            <p>
              Explore the latest WhatsApp groups recently added to our
              directory.
            </p>
          </div>

          {newGroups.length > 0 ? (
            <div className="new-groups-page__grid">
              {newGroups.map((group) => (
                <GroupCard key={group.href} {...group} />
              ))}
            </div>
          ) : (
            <div className="new-groups-page__empty">
              <p>
                New WhatsApp groups will appear here as they are added.
              </p>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
}