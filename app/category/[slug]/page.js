import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import GroupCard from "../../../components/GroupCard";
import { supabase } from "../../../lib/supabase";

export const revalidate = 60;

export async function generateMetadata({ params }) {
  const { slug } = await params;

  const { data: category } = await supabase
    .from("categories")
    .select("name, description")
    .eq("slug", slug)
    .single();

  if (!category) {
    return {
      title: "Category Not Found",
      description:
        "The requested WhatsApp group category could not be found.",
    };
  }

  return {
    title: `WhatsApp Groups for ${category.name}`,
    description: category.description || "",
    alternates: {
      canonical: `/category/${slug}`,
    },
  };
}

export default async function CategoryPage({ params }) {
  const { slug } = await params;

  const { data: category, error: categoryError } = await supabase
    .from("categories")
    .select("id, name, description")
    .eq("slug", slug)
    .single();

  if (categoryError || !category) {
    return (
      <>
        <Header />

        <main className="category-page">
          <h1>Category Not Found</h1>
          <p>The requested category could not be found.</p>
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
    .eq("category_id", category.id)
    .eq("status", "approved")
    .order("created_at", { ascending: false });

  if (groupsError) {
    console.error("Failed to load category groups:", groupsError);
  }

  const categoryGroups = (groupsData || []).map((group) => ({
    name: group.name,
    category: group.categories?.name || category.name,
    country: group.countries?.name || "",
    description: group.description || "",
    members: group.members || "",
    href: `/group/${group.slug}`,
    keywords: group.keywords || "",
  }));

  return (
    <>
      <Header />

      <main className="category-page">
        <section className="category-page__hero">
          <span className="category-page__eyebrow">
            WHATSAPP GROUPS
          </span>

          <h1>{category.name} WhatsApp Groups</h1>

          <p>{category.description}</p>
        </section>

        <section className="category-page__groups">
          <h2>Latest {category.name} Groups</h2>

          {categoryGroups.length > 0 ? (
            <div className="category-page__grid">
              {categoryGroups.map((group) => (
                <GroupCard key={group.href} {...group} />
              ))}
            </div>
          ) : (
            <div className="category-page__empty">
              <p>
                New {category.name.toLowerCase()} groups will appear here
                as they are added.
              </p>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
}