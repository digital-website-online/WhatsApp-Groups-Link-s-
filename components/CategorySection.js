const categories = [
  "Entertainment",
  "Education",
  "Sports",
  "Technology",
  "Business",
  "Gaming",
];

export default function CategorySection() {
  return (
    <section className="category-section">
      <h2>Popular Categories</h2>

      <div className="category-section__grid">
        {categories.map((category) => (
          <a
            href={`/category/${category.toLowerCase()}`}
            key={category}
          >
            {category}
          </a>
        ))}
      </div>
    </section>
  );
}