import Header from "../../components/Header";
import GroupCard from "../../components/GroupCard";
import Footer from "../../components/Footer";

export const metadata = {
  title: "WhatsApp Groups - Discover Active Groups",
  description:
    "Discover WhatsApp groups by category, country and topic. Find active communities and join groups that match your interests.",
  alternates: {
    canonical: "/groups",
  },
};

const groups = [
  {
    name: "Pakistan WhatsApp Groups",
    category: "General",
    country: "Pakistan",
    description: "Discover active WhatsApp communities from Pakistan.",
    members: "1.2K",
    href: "/group/pakistan-whatsapp-groups",
  },
  {
    name: "Indian Friends & Community",
    category: "Community",
    country: "India",
    description: "Connect with an active community and discover new groups.",
    members: "980",
    href: "/group/indian-friends-community",
  },
  {
    name: "Technology & Programming",
    category: "Technology",
    country: "Global",
    description: "Discuss technology, programming and the latest trends.",
    members: "2.4K",
    href: "/group/technology-programming",
  },
  {
    name: "Study & Education Hub",
    category: "Education",
    country: "Pakistan",
    description: "Share knowledge, resources and study discussions.",
    members: "1.5K",
    href: "/group/study-education-hub",
  },
];

export default function GroupsPage() {
  return (
    <>
      <Header />

      <main>
        <section className="groups-page">
          <div className="groups-page__intro">
            <span>EXPLORE</span>

            <h1>WhatsApp Groups</h1>

            <p>
              Discover WhatsApp groups by category, country and topic.
            </p>
          </div>

          <div className="groups-page__grid">
            {groups.map((group) => (
              <GroupCard key={group.href} {...group} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}