import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import GroupCard from "../../../components/GroupCard";
import { supabase } from "../../../lib/supabase";

export const revalidate = 60;

export async function generateMetadata({ params }) {
  const { slug } = await params;

  const { data: group } = await supabase
    .from("groups")
    .select("name, description")
    .eq("slug", slug)
    .eq("status", "approved")
    .single();

  if (!group) {
    return {
      title: "WhatsApp Group Not Found",
      description: "The requested WhatsApp group could not be found.",
    };
  }

  return {
    title: `${group.name} - Join WhatsApp Group`,
    description: group.description || "",
    alternates: {
      canonical: `/group/${slug}`,
    },
  };
}

export default async function GroupPage({ params }) {
  const { slug } = await params;

  const { data: group, error } = await supabase
    .from("groups")
    .select(`
      name,
      slug,
      description,
      members,
      join_url,
      category_id,
      categories(name),
      countries(name)
    `)
    .eq("slug", slug)
    .eq("status", "approved")
    .single();

  if (error || !group) {
    return (
      <>
        <Header />

        <main className="group-page">
          <h1>WhatsApp Group Not Found</h1>
          <p>The group you are looking for does not exist.</p>
        </main>

        <Footer />
      </>
    );
  }

  const category = group.categories?.name || "";
  const country = group.countries?.name || "";
  const joinUrl = group.join_url;

  const { data: relatedGroups } = await supabase
    .from("groups")
    .select(`
      name,
      slug,
      description,
      members,
      categories(name),
      countries(name)
    `)
    .eq("status", "approved")
    .eq("category_id", group.category_id)
    .neq("slug", group.slug)
    .order("created_at", { ascending: false })
    .limit(4);

  const { data: navigationGroups } = await supabase
    .from("groups")
    .select("name, slug")
    .eq("status", "approved")
    .order("created_at", { ascending: false });

  const currentIndex = (navigationGroups || []).findIndex(
    (item) => item.slug === group.slug
  );

  const previousGroup =
    currentIndex >= 0
      ? navigationGroups[currentIndex + 1] || null
      : null;

  const nextGroup =
    currentIndex > 0
      ? navigationGroups[currentIndex - 1] || null
      : null;

  return (
    <>
      <Header />

      <main className="group-page">
        <article className="group-page__card">
          <span className="group-page__icon" aria-hidden="true">
            WA
          </span>

          <span className="group-page__category">
            {category}
          </span>

          <h1>{group.name}</h1>

          <p>{group.description || ""}</p>

          <div className="group-page__meta">
            <span>{country}</span>
            <span>{group.members || ""} members</span>
          </div>

          {joinUrl ? (
            <a
              href={joinUrl}
              className="group-page__join"
              target="_blank"
              rel="noopener noreferrer"
            >
              Join WhatsApp Group
              <span aria-hidden="true">→</span>
            </a>
          ) : (
            <span
              className="group-page__join"
              aria-disabled="true"
            >
              Join WhatsApp Group
              <span aria-hidden="true">→</span>
            </span>
          )}

          {(previousGroup || nextGroup) && (
            <nav
              className="group-page__navigation"
              aria-label="Group navigation"
            >
              {previousGroup ? (
                <a
                  href={`/group/${previousGroup.slug}`}
                  className="group-page__nav group-page__nav--previous"
                >
                  <span
                    className="group-page__nav-arrow"
                    aria-hidden="true"
                  >
                    ←
                  </span>

                  <span className="group-page__nav-content">
                    <small>Previous Group</small>
                    <strong>{previousGroup.name}</strong>
                  </span>
                </a>
              ) : (
                <span className="group-page__nav-placeholder" />
              )}

              {nextGroup ? (
                <a
                  href={`/group/${nextGroup.slug}`}
                  className="group-page__nav group-page__nav--next"
                >
                  <span className="group-page__nav-content">
                    <small>Next Group</small>
                    <strong>{nextGroup.name}</strong>
                  </span>

                  <span
                    className="group-page__nav-arrow"
                    aria-hidden="true"
                  >
                    →
                  </span>
                </a>
              ) : (
                <span className="group-page__nav-placeholder" />
              )}
            </nav>
          )}
        </article>

        {relatedGroups && relatedGroups.length > 0 && (
          <section className="group-page__related">
            <div className="group-page__related-intro">
              <span>MORE GROUPS</span>
              <h2>Related WhatsApp Groups</h2>
              <p>
                Discover more WhatsApp groups in the same category.
              </p>
            </div>

            <div className="group-page__related-grid">
              {relatedGroups.map((relatedGroup) => (
                <GroupCard
                  key={relatedGroup.slug}
                  group={relatedGroup}
                />
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </>
  );
}