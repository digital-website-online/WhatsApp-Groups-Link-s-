export default function SearchBar() {
  return (
    <form
      className="search-bar"
      action="/search"
      method="GET"
      role="search"
    >
      <div className="search-bar__field">
        <span className="search-bar__icon" aria-hidden="true">
          <svg
            viewBox="0 0 24 24"
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-4-4" />
          </svg>
        </span>

        <input
          type="search"
          name="q"
          placeholder="Search WhatsApp groups..."
          aria-label="Search WhatsApp groups"
          autoComplete="off"
          spellCheck="false"
        />
      </div>

      <button type="submit" aria-label="Search WhatsApp groups">
        <span className="search-bar__button-text">Search Groups</span>
        <span className="search-bar__button-icon" aria-hidden="true">
          →
        </span>
      </button>
    </form>
  );
}