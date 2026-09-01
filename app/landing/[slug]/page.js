import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import topicLandingData from "../../../data/topicLandingData";

export function generateStaticParams() {
  return Object.keys(topicLandingData).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const topic = topicLandingData[slug];

  if (!topic) {
    return {
      title: "Page Not Found",
      description: "The requested WhatsApp groups page could not be found.",
    };
  }

  return {
    title: topic.title,
    description: topic.description,
    keywords: topic.keywords,
    alternates: {
      canonical: `/landing/${topic.slug}`,
    },
  };
}

export default async function LandingPage({ params }) {
  const { slug } = await params;
  const topic = topicLandingData[slug];

  if (!topic) {
    return (
      <>
        <Header />

        <main className="landing-page">
          <section className="landing-page__not-found">
            <span className="landing-page__eyebrow">
              WHATSAPP GROUP DIRECTORY
            </span>

            <h1>Page Not Found</h1>

            <p>
              The WhatsApp groups page you are looking for does not exist.
            </p>

            <a href="/groups" className="landing-page__button">
              Explore Groups →
            </a>
          </section>
        </main>

        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />

      <main className="landing-page">
        <section className="landing-page__hero">
          <span className="landing-page__eyebrow">
            WHATSAPP GROUP DIRECTORY
          </span>

          <h1>{topic.title}</h1>

          <p>{topic.description}</p>

          <a href="/groups" className="landing-page__button">
            Explore Groups →
          </a>
        </section>

        <section className="landing-page__content">
          <div className="landing-page__intro">
            <span className="landing-page__label">DISCOVER</span>

            <h2>Find {topic.name} WhatsApp Groups</h2>

            <p>{topic.intro}</p>
          </div>

          <div className="landing-page__keywords">
            <h2>Popular {topic.name} Searches</h2>

            <div className="landing-page__keyword-list">
              {topic.keywords.map((keyword) => (
                <a
                  key={keyword}
                  href={`/groups?q=${encodeURIComponent(keyword)}`}
                >
                  {keyword}
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="landing-page__cta">
          <h2>Looking for more WhatsApp groups?</h2>

          <p>
            Browse our directory to discover more communities by category,
            country and topic.
          </p>

          <div className="landing-page__cta-links">
            <a href="/groups">All Groups</a>
            <a href="/categories">Categories</a>
            <a href="/countries">Countries</a>
            <a href="/new-groups">New Groups</a>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}