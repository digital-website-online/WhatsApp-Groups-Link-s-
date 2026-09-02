import Link from "next/link";
import topicLandingData from "../data/topicLandingData";

const STOP_WORDS = new Set([
  "whatsapp",
  "groups",
  "group",
  "links",
  "link",
  "find",
  "finds",
  "discover",
  "discovering",
  "explore",
  "explores",
  "community",
  "communities",
  "related",
  "discussions",
  "discussion",
  "people",
  "information",
  "topics",
  "topic",
]);

function normalizeWord(word) {
  let value = word.toLowerCase().replace(/[^a-z0-9]/g, "");

  if (value.length > 4 && value.endsWith("ies")) {
    value = `${value.slice(0, -3)}y`;
  } else if (value.length > 4 && value.endsWith("ing")) {
    value = value.slice(0, -3);
  } else if (value.length > 4 && value.endsWith("ed")) {
    value = value.slice(0, -2);
  } else if (value.length > 4 && value.endsWith("s")) {
    value = value.slice(0, -1);
  }

  return value;
}

function getWords(text = "") {
  return text
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .map(normalizeWord)
    .filter((word) => word.length >= 3 && !STOP_WORDS.has(word));
}

function getTopicWords(topic) {
  return new Set([
    ...getWords(topic.name),
    ...getWords(topic.title),
    ...getWords(topic.description),
    ...getWords(topic.intro),
    ...topic.keywords.flatMap((keyword) => getWords(keyword)),
  ]);
}

function calculateScore(currentWords, candidate) {
  const candidateWords = getTopicWords(candidate);

  let score = 0;

  currentWords.forEach((word) => {
    if (candidateWords.has(word)) {
      score += 5;
    }
  });

  const currentKeywords = candidate.keywords || [];

  currentKeywords.forEach((keyword) => {
    const keywordWords = getWords(keyword);

    keywordWords.forEach((word) => {
      if (candidateWords.has(word)) {
        score += 2;
      }
    });
  });

  return score;
}

export default function RelatedTopics({ currentSlug }) {
  const currentTopic = topicLandingData[currentSlug];

  if (!currentTopic) {
    return null;
  }

  const currentWords = getTopicWords(currentTopic);

  const relatedTopics = Object.values(topicLandingData)
    .filter((topic) => topic.slug !== currentSlug)
    .map((topic) => ({
      ...topic,
      score: calculateScore(currentWords, topic),
    }))
    .filter((topic) => topic.score > 0)
    .sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }

      return a.name.localeCompare(b.name);
    })
    .slice(0, 6);

  if (relatedTopics.length === 0) {
    return null;
  }

  return (
    <section className="related-topics">
      <div className="related-topics__header">
        <span className="related-topics__eyebrow">
          YOU MAY ALSO LIKE
        </span>

        <h2>Related WhatsApp Groups</h2>

        <p>
          Explore more WhatsApp group topics related to {currentTopic.name}.
        </p>
      </div>

      <div className="related-topics__grid">
        {relatedTopics.map((topic) => (
          <Link
            key={topic.slug}
            href={`/landing/${topic.slug}`}
            className="related-topics__card"
          >
            <span className="related-topics__card-title">
              {topic.name}
            </span>

            <span className="related-topics__card-description">
              {topic.description}
            </span>

            <span className="related-topics__card-link">
              Explore topic →
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}