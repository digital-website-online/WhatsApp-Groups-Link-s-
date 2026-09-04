import { BASE_URL } from "../lib/site";
import topicLandingData from "../data/topicLandingData";
import { supabase } from "../lib/supabase";

export default async function sitemap() {
  const lastModified = new Date();

  const landingPages = Object.values(topicLandingData).map(
    (topic) => ({
      url: `${BASE_URL}/landing/${topic.slug}`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.7,
    })
  );

  const [
    { data: groups },
    { data: categories },
    { data: countries },
  ] = await Promise.all([
    supabase
      .from("groups")
      .select("slug")
      .eq("status", "approved"),

    supabase
      .from("categories")
      .select("slug"),

    supabase
      .from("countries")
      .select("slug"),
  ]);

  const groupPages = (groups || []).map((group) => ({
    url: `${BASE_URL}/group/${group.slug}`,
    lastModified,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const categoryPages = (categories || []).map((category) => ({
    url: `${BASE_URL}/category/${category.slug}`,
    lastModified,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const countryPages = (countries || []).map((country) => ({
    url: `${BASE_URL}/country/${country.slug}`,
    lastModified,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

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
    ...groupPages,
    ...categoryPages,
    ...countryPages,
  ];
}