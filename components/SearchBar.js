export default function SearchBar() {
  return (
    <form className="search-bar">
      <input
        type="search"
        name="q"
        placeholder="Search WhatsApp groups..."
        aria-label="Search WhatsApp groups"
      />

      <button type="submit">
        Search
      </button>
    </form>
  );
}