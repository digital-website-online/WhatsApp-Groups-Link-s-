import { BASE_URL } from "../lib/site";
import topicLandingData from "../data/topicLandingData";

export default function sitemap() {
  const lastModified = new Date();

  const landingPages = Object.values(topicLandingData).map(
    (topic) => ({
      url: `${BASE_URL}/landing/${topic.slug}`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.7,
    })
  );

  return [
    {
      url: BASE_URL,
      lastModified,
      changeFrequency: "daily",
      priority: 1,
    },

    {
      url: `${BASE_URL}/groups`,
      lastModified,
      changeFrequency: "daily",
      priority: 0.9,
    },

    {
      url: `${BASE_URL}/categories`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },

    {
      url: `${BASE_URL}/countries`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },

    ...landingPages,
  ];
}