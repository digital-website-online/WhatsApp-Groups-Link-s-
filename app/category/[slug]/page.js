import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import GroupCard from "../../../components/GroupCard";

const categories = {
  education: {
    name: "Education",
    description:
      "Discover WhatsApp groups for students, learning, study resources and educational communities.",
  },
  technology: {
    name: "Technology",
    description:
      "Explore WhatsApp groups about technology, programming, AI and digital innovation.",
  },
  gaming: {
    name: "Gaming",
    description:
      "Find gaming communities, players and WhatsApp groups for gaming discussions.",
  },
  sports: {
    name: "Sports",
    description:
      "Discover WhatsApp groups for sports fans, teams, matches and sports discussions.",
  },
  business: {
    name: "Business",
    description:
      "Explore business, entrepreneurship and professional WhatsApp communities.",
  },
  entertainment: {
    name: "Entertainment",
    description:
      "Find WhatsApp groups for movies, shows, music and entertainment communities.",
  },
  community: {
    name: "Community",
    description:
      "Discover general WhatsApp communities and social groups.",
  },
  jobs: {
    name: "Jobs",
    description:
      "Find WhatsApp groups for jobs, careers, employment and professional opportunities.",
  },
};

const groups = [
  {
    name: "Technology & Programming",
    category: "Technology",
    country: "Global",
    description:
      "Discuss programming, technology and the latest digital trends.",
    members: "2.4K",
    href: "/group/technology-programming",
  },
  {
    name: "Study & Education Hub",
    category: "Education",
    country: "Pakistan",
    description:
      "Share knowledge, resources and study discussions.",
    members: "1.5K",
    href: "/group/study-education-hub",
  },
];

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const category = categories[slug];

  if (!category) {
    return {
      title: "Category Not Found",
      description: "The requested WhatsApp group category could not be found.",
    };
  }

  return {
    title: `WhatsApp Groups for ${category.name}`,
    description: category.description,
    alternates: {
      canonical: `/category/${slug}`,
    },
  };
}

export default async function CategoryPage({ params }) {
  const { slug } = await params;
  const category = categories[slug];

  if (!category) {
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

  const categoryGroups = groups.filter(
    (group) => group.category.toLowerCase() === category.name.toLowerCase()
  );

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