"use client";

import { useState } from "react";

export default function Search() {
  const [query, setQuery] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    const searchQuery = query.trim();

    if (!searchQuery) return;

    window.location.href = `/groups?search=${encodeURIComponent(searchQuery)}`;
  }

  return (
    <section className="search-section" aria-label="Search WhatsApp groups">
      <div className="search-section__inner">
        <div className="search-section__content">
          <span className="search-section__eyebrow">FIND YOUR COMMUNITY</span>

          <h2>Search WhatsApp Groups</h2>

          <p>
            Find active WhatsApp groups by name, category, country or topic.
          </p>

          <form className="search-section__form" onSubmit={handleSubmit}>
            <label className="search-section__field">
              <span className="search-section__icon" aria-hidden="true">
                ⌕
              </span>

              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search groups, countries or categories..."
                aria-label="Search WhatsApp groups"
              />
            </label>

            <button type="submit" className="search-section__button">
              Search Groups
              <span aria-hidden="true">→</span>
            </button>
          </form>

          <div className="search-section__popular">
            <span>Popular:</span>

            <a href="/category/education">Education</a>
            <a href="/category/technology">Technology</a>
            <a href="/country/pakistan">Pakistan</a>
            <a href="/category/gaming">Gaming</a>
          </div>
        </div>
      </div>
    </section>
  );
}