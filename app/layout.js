import "../styles/global.css";
import "../styles/header.css";
import "../styles/footer.css";
import "../styles/search.css";
import "../styles/home-hero.css";
import "../styles/category-section.css";
import "../styles/country-section.css";
import "../styles/group-card.css";
import "../styles/group-section.css";
import "../styles/groups-page.css";
import "../styles/group-page.css";
import "../styles/countries-page.css";
import "../styles/country-page.css";
import "../styles/new-groups-page.css";
import "../styles/add-group-page.css";
import "../styles/categories-page.css";
import "../styles/category-page.css";

export const metadata = {
  title: "WhatsApp Groups",
  description: "Find and discover WhatsApp groups.",
};

export const metadata = {
  metadataBase: new URL("https://whats-app-groups-links.vercel.app"),
  title: {
    default: "WhatsApp Groups - Discover & Join Groups",
    template: "%s | WhatsApp Groups",
  },
  description:
    "Discover and join WhatsApp groups by category, country and topic.",
  keywords: [
    "WhatsApp groups",
    "WhatsApp group links",
    "join WhatsApp groups",
    "WhatsApp group links Pakistan",
  ],
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
