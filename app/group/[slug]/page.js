import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
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
        </article>
      </main>

      <Footer />
    </>
  );
}