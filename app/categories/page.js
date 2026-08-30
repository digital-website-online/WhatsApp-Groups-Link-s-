import Header from "../../components/Header";
import Footer from "../../components/Footer";

const categories = [
  {
    name: "Education",
    slug: "education",
    description: "Study, learning and educational WhatsApp communities.",
  },
  {
    name: "Technology",
    slug: "technology",
    description: "Technology, programming, AI and digital communities.",
  },
  {
    name: "Gaming",
    slug: "gaming",
    description: "Gaming communities, players and gaming discussions.",
  },
  {
    name: "Sports",
    slug: "sports",
    description: "Sports fans, teams and sports discussion groups.",
  },
  {
    name: "Business",
    slug: "business",
    description: "Business, entrepreneurship and professional communities.",
  },
  {
    name: "Entertainment",
    slug: "entertainment",
    description: "Movies, shows, music and entertainment communities.",
  },
  {
    name: "Community",
    slug: "community",
    description: "General communities and social WhatsApp groups.",
  },
  {
    name: "Jobs",
    slug: "jobs",
    description: "Career, employment and job-related communities.",
  },
];

export const metadata = {
  title: "WhatsApp Groups by Category",
  description:
    "Explore WhatsApp groups by category including education, technology, gaming, sports, business, entertainment, jobs and more.",
  alternates: {
    canonical: "/categories",
  },
};

export default function CategoriesPage() {
  return (
    <>
      <Header />

      <main>
        <section className="categories-page">
          <div className="categories-page__intro">
            <span>EXPLORE TOPICS</span>

            <h1>WhatsApp Groups by Category</h1>

            <p>
              Find communities based on your interests and discover
              WhatsApp groups that match what you are looking for.
            </p>
          </div>

          <div className="categories-page__grid">
            {categories.map((category) => (
              <a
                href={`/category/${category.slug}`}
                className="category-page-card"
                key={category.slug}
              >
                <div className="category-page-card__icon">
                  {category.name.charAt(0)}
                </div>

                <div className="category-page-card__content">
                  <h2>{category.name}</h2>
                  <p>{category.description}</p>
                </div>

                <span
                  className="category-page-card__arrow"
                  aria-hidden="true"
                >
                  →
                </span>
              </a>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}