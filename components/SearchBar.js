export default function SearchBar() {
  return (
    <form className="search-bar" action="/search" method="GET">
      <div className="search-bar__field">
        <span className="search-bar__icon" aria-hidden="true">
          ⌕
        </span>

        <input
          type="search"
          name="q"
          placeholder="Search WhatsApp groups..."
          aria-label="Search WhatsApp groups"
          autoComplete="off"
        />
      </div>

      <button type="submit">
        Search
        <span aria-hidden="true">→</span>
      </button>
    </form>
  );
}