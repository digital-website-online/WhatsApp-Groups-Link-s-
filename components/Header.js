"use client";

import { useState } from "react";

const navCards = [
  {
    label: "Home",
    description: "Back to the main page",
    href: "/",
    icon: "⌂",
  },
  {
    label: "New Groups",
    description: "Recently added WhatsApp groups",
    href: "/new-groups",
    icon: "✦",
  },
  {
    label: "Active Groups",
    description: "Discover groups to join",
    href: "/groups",
    icon: "●",
  },
  {
    label: "All Countries",
    description: "Browse groups by country",
    href: "/countries",
    icon: "◎",
  },
  {
    label: "Categories",
    description: "Find groups by interest",
    href: "/categories",
    icon: "▦",
  },
  {
    label: "Add Your Group",
    description: "Submit your WhatsApp group",
    href: "/add-group",
    icon: "+",
    featured: true,
  },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <a
          href="/"
          className="site-header__logo"
          onClick={() => setMenuOpen(false)}
        >
          <span className="site-header__logo-mark" aria-hidden="true">
            WA
          </span>

          <span>WhatsApp Groups</span>
        </a>

        <button
          type="button"
          className="site-header__menu"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {menuOpen && (
        <div className="site-header__panel">
          <nav
            className="site-header__cards"
            aria-label="Main navigation"
          >
            {navCards.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`site-header__card ${
                  item.featured ? "site-header__card--featured" : ""
                }`}
                onClick={() => setMenuOpen(false)}
              >
                <span
                  className="site-header__card-icon"
                  aria-hidden="true"
                >
                  {item.icon}
                </span>

                <span className="site-header__card-content">
                  <strong>{item.label}</strong>
                  <small>{item.description}</small>
                </span>

                <span
                  className="site-header__card-arrow"
                  aria-hidden="true"
                >
                  →
                </span>
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}