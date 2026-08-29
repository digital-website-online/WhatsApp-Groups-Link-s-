const categories = [
  { name: "Entertainment", icon: "🎬", slug: "entertainment" },
  { name: "Education", icon: "📚", slug: "education" },
  { name: "Sports", icon: "⚽", slug: "sports" },
  { name: "Technology", icon: "💻", slug: "technology" },
  { name: "Business", icon: "💼", slug: "business" },
  { name: "Gaming", icon: "🎮", slug: "gaming" },
];

export default function CategorySection() {
  return (
    <section className="category-section" aria-labelledby="categories-title">
      <div className="category-section__heading">
        <div>
          <span className="category-section__eyebrow">EXPLORE</span>
          <h2 id="categories-title">Popular Categories</h2>
          <p>Find groups based on what you're interested in.</p>
        </div>

        <a href="/categories" className="category-section__link">
          View all <span aria-hidden="true">→</span>
        </a>
      </div>

      <div className="category-section__grid">
        {categories.map((category) => (
          <a
            href={`/category/${category.slug}`}
            className="category-card"
            key={category.slug}
          >
            <span className="category-card__icon" aria-hidden="true">
              {category.icon}
            </span>

            <span className="category-card__name">
              {category.name}
            </span>

            <span className="category-card__arrow" aria-hidden="true">
              →
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}