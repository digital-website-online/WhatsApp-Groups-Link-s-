import { notFound } from "next/navigation";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import blogPosts from "../../../data/blogData";

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);

  if (!post) {
    return {
      title: "Blog Guide Not Found",
    };
  }

  return {
    title: `${post.title} | WhatsApp Groups`,
    description: post.description,
    keywords: post.keywords,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
    },
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <Header />

      <main className="blog-post">
        <article className="blog-post__article">
          <header className="blog-post__header">
            <span className="blog-post__category">
              {post.category}
            </span>

            <h1>{post.title}</h1>

            <p className="blog-post__description">
              {post.description}
            </p>

            <div className="blog-post__meta">
              <span>{post.readTime}</span>
              <span>•</span>
              <time dateTime={post.date}>{post.date}</time>
            </div>
          </header>

          <div className="blog-post__body">
            <p className="blog-post__intro">{post.intro}</p>

            {post.sections.map((section) => (
              <section key={section.heading}>
                <h2>{section.heading}</h2>

                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </section>
            ))}

            <section className="blog-post__tips">
              <h2>Quick tips</h2>

              <ul>
                {post.tips.map((tip) => (
                  <li key={tip}>{tip}</li>
                ))}
              </ul>
            </section>
          </div>

          <nav className="blog-post__related" aria-label="Related guides">
            <strong>Explore more</strong>

            <div>
              <a href="/groups">Browse WhatsApp Groups →</a>
              <a href="/categories">Explore Categories →</a>
              <a href="/countries">Browse Countries →</a>
            </div>
          </nav>
        </article>
      </main>

      <Footer />
    </>
  );
}