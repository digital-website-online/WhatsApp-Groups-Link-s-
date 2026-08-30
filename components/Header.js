"use client";

import { useState } from "react";

const navItems = [
  { label: "Groups", href: "/groups" },
  { label: "Countries", href: "/countries" },
  { label: "New Groups", href: "/new-groups" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <a href="/" className="site-header__logo" onClick={() => setMenuOpen(false)}>
          <span className="site-header__logo-mark" aria-hidden="true">
            WA
          </span>

          <span>WhatsApp Groups</span>
        </a>

        <nav
          className={`site-header__nav ${
            menuOpen ? "site-header__nav--open" : ""
          }`}
          aria-label="Main navigation"
        >
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}

          <a
            href="/add-group"
            className="site-header__add"
            onClick={() => setMenuOpen(false)}
          >
            Add Your Group
            <span aria-hidden="true">+</span>
          </a>
        </nav>

        <button
          type="button"
          className="site-header__menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}