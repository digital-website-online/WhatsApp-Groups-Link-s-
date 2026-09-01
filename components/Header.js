"use client";

import { useEffect, useState } from "react";

const navCards = [
  {
    label: "Home",
    description: "Explore the WhatsApp Groups homepage",
    href: "/",
    icon: "⌂",
  },
  {
    label: "New Groups",
    description: "Recently added groups and communities",
    href: "/new-groups",
    icon: "✦",
  },
  {
    label: "Active Groups",
    description: "Discover active groups ready to join",
    href: "/groups",
    icon: "●",
  },
  {
    label: "All Countries",
    description: "Browse WhatsApp groups by country",
    href: "/countries",
    icon: "◎",
  },
  {
    label: "Categories",
    description: "Find groups by topic and interest",
    href: "/categories",
    icon: "▦",
  },
  {
    label: "Add Your Group",
    description: "Submit your WhatsApp group for listing",
    href: "/add-group",
    icon: "+",
    featured: true,
  },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <a
          href="/"
          className="site-header__logo"
          aria-label="WhatsApp Groups home"
          onClick={() => setMenuOpen(false)}
        >
          <span
            className="site-header__logo-mark"
            aria-hidden="true"
          >
            WA
          </span>

          <span>WhatsApp Groups</span>
        </a>

        <button
          type="button"
          className={`site-header__menu ${
            menuOpen ? "site-header__menu--open" : ""
          }`}
          aria-label={
            menuOpen ? "Close navigation" : "Open navigation"
          }
          aria-expanded={menuOpen}
          aria-controls="main-navigation"
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
            id="main-navigation"
            className="site-header__cards"
            aria-label="Main navigation"
          >
            {navCards.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`site-header__card ${
                  item.featured
                    ? "site-header__card--featured"
                    : ""
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