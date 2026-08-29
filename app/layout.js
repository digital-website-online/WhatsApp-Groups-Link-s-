import "../styles/global.css";
import "../styles/group-card.css";
import "../styles/header.css";
import "../styles/footer.css";
import "../styles/search.css";
import "../styles/home-hero.css";
import "../styles/category-section.css";

export const metadata = {
  title: "WhatsApp Groups",
  description: "Find and discover WhatsApp groups.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
