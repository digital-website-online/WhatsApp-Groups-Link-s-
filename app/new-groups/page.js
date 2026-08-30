import Header from "../../components/Header";
import Footer from "../../components/Footer";
import GroupCard from "../../components/GroupCard";

const newGroups = [
  {
    name: "Pakistan Community Hub",
    category: "Community",
    country: "Pakistan",
    description:
      "A new community for people looking to connect and share interests.",
    members: "New",
    href: "/group/pakistan-community-hub",
  },
  {
    name: "Tech & AI Community",
    category: "Technology",
    country: "Global",
    description:
      "A new group for technology, AI and digital discussions.",
    members: "New",
    href: "/group/tech-ai-community",
  },
];

export const metadata = {
  title: "New WhatsApp Groups",
  description:
    "Discover newly added WhatsApp groups and communities by category and country.",
  alternates: {
    canonical: "/new-groups",
  },
};

export default function NewGroupsPage() {
  return (
    <>
      <Header />

      <main>
        <section className="new-groups-page">
          <div className="new-groups-page__intro">
            <span>JUST ADDED</span>

            <h1>New WhatsApp Groups</h1>

            <p>
              Explore the latest WhatsApp groups recently added to our
              directory.
            </p>
          </div>

          <div className="new-groups-page__grid">
            {newGroups.map((group) => (
              <GroupCard key={group.href} {...group} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}