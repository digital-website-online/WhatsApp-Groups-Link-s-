import topicLandingData from "../data/topicLandingData";

export default function TopicLandingSection() {
  const topics = Object.values(topicLandingData);

  return (
    <section className="topic-landing-section">
      <div className="topic-landing-section__header">
        <span className="topic-landing-section__eyebrow">
          EXPLORE TOPICS
        </span>

        <h2>Popular WhatsApp Group Topics</h2>

        <p>
          Discover WhatsApp groups by topic and find communities that match
          your interests.
        </p>
      </div>

      <div className="topic-landing-section__grid">
        {topics.map((topic) => (
          <a
            key={topic.slug}
            href={`/landing/${topic.slug}`}
            className="topic-landing-section__link"
          >
            {topic.name} WhatsApp Groups
          </a>
        ))}
      </div>
    </section>
  );
}