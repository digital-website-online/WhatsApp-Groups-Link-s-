import Header from "../../../components/Header";
import Footer from "../../../components/Footer";

const groups = {
  "pakistan-whatsapp-groups": {
    name: "Pakistan WhatsApp Groups",
    category: "General",
    country: "Pakistan",
    description:
      "Discover active WhatsApp groups and communities from Pakistan.",
    members: "1.2K",
    joinUrl: "#",
  },
  "technology-programming": {
    name: "Technology & Programming",
    category: "Technology",
    country: "Global",
    description:
      "Discuss programming, technology and the latest digital trends.",
    members: "2.4K",
    joinUrl: "#",
  },
};

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const group = groups[slug];

  if (!group) {
    return {
      title: "WhatsApp Group Not Found",
      description: "The requested WhatsApp group could not be found.",
    };
  }

  return {
    title: `${group.name} - Join WhatsApp Group`,
    description: group.description,
    alternates: {
      canonical: `/group/${slug}`,
    },
  };
}

export default async function GroupPage({ params }) {
  const { slug } = await params;
  const group = groups[slug];

  if (!group) {
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

  return (
    <>
      <Header />

      <main className="group-page">
        <article className="group-page__card">
          <span className="group-page__icon" aria-hidden="true">
            WA
          </span>

          <span className="group-page__category">{group.category}</span>

          <h1>{group.name}</h1>

          <p>{group.description}</p>

          <div className="group-page__meta">
            <span>{group.country}</span>
            <span>{group.members} members</span>
          </div>

          <a
            href={group.joinUrl}
            className="group-page__join"
            target="_blank"
            rel="noopener noreferrer"
          >
            Join WhatsApp Group
            <span aria-hidden="true">→</span>
          </a>
        </article>
      </main>

      <Footer />
    </>
  );
}