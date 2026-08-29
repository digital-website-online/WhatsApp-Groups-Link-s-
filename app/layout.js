import "./globals.css";

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