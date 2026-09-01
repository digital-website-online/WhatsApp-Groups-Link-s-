import blogPosts from "../data/blogData";

export default function BlogSection() {
  const featuredPost = blogPosts.find((post) => post.featured);
  const otherPosts = blogPosts.filter((post) => !post.featured);

  return (
    <section className="blog-section" aria-labelledby="blog-title">
      <div className="blog-section__heading">
        <div>
          <span className="blog-section__eyebrow">GUIDES &amp; INSIGHTS</span>

          <h2 id="blog-title">WhatsApp Groups Guides</h2>

          <p>
            Helpful guides for discovering communities, categories and
            WhatsApp groups.
          </p>
        </div>

        <a href="/blog" className="blog-section__link">
          View all <span aria-hidden="true">→</span>
        </a>
      </div>

      {featuredPost && (
        <a
          href={`/blog/${featuredPost.slug}`}
          className="blog-card blog-card--featured"
        >
          <div className="blog-card__content">
            <span className="blog-card__category">
              {featuredPost.category}
            </span>

            <h3>{featuredPost.title}</h3>

            <p>{featuredPost.description}</p>

            <div className="blog-card__meta">
              <span>{featuredPost.readTime}</span>
              <span>Read guide</span>
              <span aria-hidden="true">→</span>
            </div>
          </div>
        </a>
      )}

      <div className="blog-section__grid">
        {otherPosts.map((post) => (
          <a
            href={`/blog/${post.slug}`}
            className="blog-card"
            key={post.slug}
          >
            <div className="blog-card__content">
              <span className="blog-card__category">
                {post.category}
              </span>

              <h3>{post.title}</h3>

              <p>{post.description}</p>

              <div className="blog-card__meta">
                <span>{post.readTime}</span>
                <span aria-hidden="true">→</span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}