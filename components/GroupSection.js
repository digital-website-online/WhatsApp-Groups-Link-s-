import GroupCard from "./GroupCard";

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
    description: "Join an active community and connect with new people.",
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

export default function GroupSection() {
  return (
    <section className="group-section" aria-labelledby="groups-title">
      <div className="group-section__heading">
        <div>
          <span className="group-section__eyebrow">LATEST GROUPS</span>

          <h2 id="groups-title">Discover WhatsApp Groups</h2>

          <p>
            Explore communities and find groups that match your interests.
          </p>
        </div>

        <a href="/groups" className="group-section__link">
          View all <span aria-hidden="true">→</span>
        </a>
      </div>

      <div className="group-section__grid">
        {groups.map((group) => (
          <GroupCard key={group.href} {...group} />
        ))}
      </div>
    </section>
  );
}