export default function Header() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <a href="/" className="site-header__logo">
          WhatsApp Groups
        </a>

        <nav className="site-header__nav" aria-label="Main navigation">
          <a href="/groups">Groups</a>
          <a href="/countries">Countries</a>
          <a href="/new-groups">New Groups</a>
          <a href="/add-group">Add Your Group</a>
        </nav>
      </div>
    </header>
  );
}