import Link from "next/link";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import RelatedTopics from "../../../components/RelatedTopics";
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
      description:
        "The requested WhatsApp groups page could not be found.",
      robots: {
        index: false,
        follow: true,
      },
    };
  }

  return {
    title: topic.title,
    description: topic.description,
    keywords: topic.keywords,
    alternates: {
      canonical: `/landing/${topic.slug}`,
    },
    openGraph: {
      title: topic.title,
      description: topic.description,
      type: "website",
      url: `/landing/${topic.slug}`,
      siteName: "WhatsApp Groups",
    },
    twitter: {
      card: "summary",
      title: topic.title,
      description: topic.description,
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
          <section
            className="landing-page__not-found"
            aria-labelledby="landing-not-found-title"
          >
            <span className="landing-page__eyebrow">
              WHATSAPP GROUP DIRECTORY
            </span>

            <h1 id="landing-not-found-title">
              Page Not Found
            </h1>

            <p>
              The WhatsApp groups page you are looking for does not
              exist.
            </p>

            <Link
              href="/groups"
              className="landing-page__button"
            >
              Explore Groups →
            </Link>
          </section>
        </main>

        <Footer />
      </>
    );
  }

  const keywords = Array.isArray(topic.keywords)
    ? topic.keywords
    : [];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: topic.title,
    description: topic.description,
    url: `https://whats-app-groups-links.vercel.app/landing/${topic.slug}`,
    isPartOf: {
      "@type": "WebSite",
      name: "WhatsApp Groups",
      url: "https://whats-app-groups-links.vercel.app",
    },
    about: {
      "@type": "Thing",
      name: `${topic.name} WhatsApp Groups`,
    },
  };

  return (
    <>
      <Header />

      <main className="landing-page">
        {/* =========================
            BREADCRUMBS
        ========================= */}

        <nav
          className="landing-page__breadcrumbs"
          aria-label="Breadcrumb"
        >
          <div className="landing-page__breadcrumbs-inner">
            <Link href="/">Home</Link>

            <span
              className="landing-page__breadcrumb-separator"
              aria-hidden="true"
            >
              /
            </span>

            <Link href="/groups">Groups</Link>

            <span
              className="landing-page__breadcrumb-separator"
              aria-hidden="true"
            >
              /
            </span>

            <span
              className="landing-page__breadcrumb-current"
              aria-current="page"
            >
              {topic.name}
            </span>
          </div>
        </nav>

        {/* =========================
            HERO
        ========================= */}

        <section
          className="landing-page__hero"
          aria-labelledby="landing-page-title"
        >
          <div className="landing-page__hero-glow" />

          <div className="landing-page__hero-content">
            <span className="landing-page__eyebrow">
              WHATSAPP GROUP DIRECTORY
            </span>

            <h1 id="landing-page-title">
              {topic.title}
            </h1>

            <p className="landing-page__hero-description">
              {topic.description}
            </p>

            <div className="landing-page__hero-actions">
              <Link
                href="/groups"
                className="landing-page__button"
              >
                Explore Groups
                <span aria-hidden="true">→</span>
              </Link>

              <Link
                href="/categories"
                className="landing-page__secondary-button"
              >
                Browse Categories
              </Link>
            </div>
          </div>
        </section>

        {/* =========================
            MAIN CONTENT
        ========================= */}

        <section
          className="landing-page__content"
          aria-label={`${topic.name} WhatsApp groups information`}
        >
          {/* INTRO */}
          <article className="landing-page__intro landing-page__card">
            <div className="landing-page__card-icon" aria-hidden="true">
              ✦
            </div>

            <div className="landing-page__card-body">
              <span className="landing-page__label">
                DISCOVER
              </span>

              <h2>
                Find {topic.name} WhatsApp Groups
              </h2>

              <p>{topic.intro}</p>
            </div>
          </article>

          {/* SEARCH KEYWORDS */}
          <article className="landing-page__keywords landing-page__card">
            <div className="landing-page__card-heading">
              <div>
                <span className="landing-page__label">
                  EXPLORE
                </span>

                <h2>
                  Popular {topic.name} Searches
                </h2>
              </div>

              <span
                className="landing-page__keyword-count"
                aria-label={`${keywords.length} popular searches`}
              >
                {keywords.length} searches
              </span>
            </div>

            {keywords.length > 0 && (
              <div className="landing-page__keyword-list">
                {keywords.map((keyword) => (
                  <Link
                    key={keyword}
                    href={`/groups?q=${encodeURIComponent(keyword)}`}
                  >
                    <span>{keyword}</span>
                    <span
                      className="landing-page__keyword-arrow"
                      aria-hidden="true"
                    >
                      →
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </article>
        </section>

        {/* =========================
            RELATED TOPICS
        ========================= */}

        <section
          className="landing-page__related"
          aria-label="Related WhatsApp group topics"
        >
          <RelatedTopics currentSlug={topic.slug} />
        </section>

        {/* =========================
            INTERNAL DISCOVERY
        ========================= */}

        <section
          className="landing-page__discovery"
          aria-labelledby="landing-discovery-title"
        >
          <div className="landing-page__discovery-inner">
            <div className="landing-page__discovery-heading">
              <span className="landing-page__label">
                DISCOVER MORE
              </span>

              <h2 id="landing-discovery-title">
                Explore More WhatsApp Groups
              </h2>

              <p>
                Browse WhatsApp group communities by category,
                country and latest additions.
              </p>
            </div>

            <div className="landing-page__discovery-grid">
              <Link
                href="/groups"
                className="landing-page__discovery-card"
              >
                <span className="landing-page__discovery-card-icon">
                  ◉
                </span>

                <span>
                  <strong>All Groups</strong>
                  <small>
                    Browse the complete group directory
                  </small>
                </span>

                <span
                  className="landing-page__discovery-arrow"
                  aria-hidden="true"
                >
                  →
                </span>
              </Link>

              <Link
                href="/categories"
                className="landing-page__discovery-card"
              >
                <span className="landing-page__discovery-card-icon">
                  ◇
                </span>

                <span>
                  <strong>Categories</strong>
                  <small>
                    Find groups by topic and interest
                  </small>
                </span>

                <span
                  className="landing-page__discovery-arrow"
                  aria-hidden="true"
                >
                  →
                </span>
              </Link>

              <Link
                href="/countries"
                className="landing-page__discovery-card"
              >
                <span className="landing-page__discovery-card-icon">
                  ◎
                </span>

                <span>
                  <strong>Countries</strong>
                  <small>
                    Discover groups by location
                  </small>
                </span>

                <span
                  className="landing-page__discovery-arrow"
                  aria-hidden="true"
                >
                  →
                </span>
              </Link>

              <Link
                href="/new-groups"
                className="landing-page__discovery-card"
              >
                <span className="landing-page__discovery-card-icon">
                  +
                </span>

                <span>
                  <strong>New Groups</strong>
                  <small>
                    See recently added communities
                  </small>
                </span>

                <span
                  className="landing-page__discovery-arrow"
                  aria-hidden="true"
                >
                  →
                </span>
              </Link>
            </div>
          </div>
        </section>

        {/* =========================
            FINAL CTA
        ========================= */}

        <section
          className="landing-page__cta"
          aria-labelledby="landing-cta-title"
        >
          <div className="landing-page__cta-glow" />

          <div className="landing-page__cta-content">
            <span className="landing-page__cta-badge">
              WHATSAPP GROUPS
            </span>

            <h2 id="landing-cta-title">
              Looking for more WhatsApp groups?
            </h2>

            <p>
              Browse our directory to discover more communities
              by category, country and topic.
            </p>

            <div className="landing-page__cta-links">
              <Link href="/groups">
                All Groups
                <span aria-hidden="true">→</span>
              </Link>

              <Link href="/categories">
                Categories
                <span aria-hidden="true">→</span>
              </Link>

              <Link href="/countries">
                Countries
                <span aria-hidden="true">→</span>
              </Link>

              <Link href="/new-groups">
                New Groups
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* =========================
          STRUCTURED DATA
      ========================= */}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />

      <Footer />
    </>
  );
}