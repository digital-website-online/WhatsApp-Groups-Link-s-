export default function Header() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <a href="/" className="site-header__logo">
          WhatsApp Groups
        </a>

        <nav className="site-header__nav" aria-label="Main navigation">
          <a href="/">Home</a>
          <a href="/categories">Categories</a>
          <a href="/countries">Countries</a>
          <a href="/add-group">Add Group</a>
        </nav>
      </div>
    </header>
  );
}