import GroupCard from "./GroupCard";

const groupSections = [
  {
    title: "Friendship & Community Groups",
    description: "Meet people and discover active communities.",
    href: "/groups?q=friendship",
    groups: [
      {
        name: "Pakistan Friends Community",
        category: "Friendship",
        country: "Pakistan",
        description: "Connect with new people and join an active community.",
        members: "1.2K",
        href: "/group/pakistan-friends-community",
      },
      {
        name: "Friends & Chat Community",
        category: "Community",
        country: "Global",
        description: "Discover a friendly community for conversations and connections.",
        members: "980",
        href: "/group/friends-chat-community",
      },
    ],
  },
  {
    title: "Pakistan WhatsApp Groups",
    description: "Explore WhatsApp communities from Pakistan.",
    href: "/country/pakistan",
    groups: [
      {
        name: "Pakistan WhatsApp Groups",
        category: "General",
        country: "Pakistan",
        description: "Discover active WhatsApp communities from Pakistan.",
        members: "1.2K",
        href: "/group/pakistan-whatsapp-groups",
      },
      {
        name: "Pakistan Students Community",
        category: "Education",
        country: "Pakistan",
        description: "Study discussions, resources and student communities.",
        members: "1.5K",
        href: "/group/pakistan-students-community",
      },
    ],
  },
  {
    title: "Jobs & Career Groups",
    description: "Find communities focused on jobs, careers and opportunities.",
    href: "/groups?q=jobs",
    groups: [
      {
        name: "Pakistan Jobs & Careers",
        category: "Jobs",
        country: "Pakistan",
        description: "Share job opportunities, career information and updates.",
        members: "2.1K",
        href: "/group/pakistan-jobs-careers",
      },
      {
        name: "Jobs & Opportunities",
        category: "Jobs",
        country: "Global",
        description: "Discover career opportunities and professional communities.",
        members: "1.8K",
        href: "/group/jobs-opportunities",
      },
    ],
  },
  {
    title: "Gaming & Entertainment",
    description: "Join communities for gaming, movies and entertainment.",
    href: "/groups?q=gaming",
    groups: [
      {
        name: "Gaming Community",
        category: "Gaming",
        country: "Global",
        description: "Talk about games, updates, tips and gaming communities.",
        members: "2.4K",
        href: "/group/gaming-community",
      },
      {
        name: "Movies & Entertainment",
        category: "Entertainment",
        country: "Global",
        description: "Discover entertainment communities and discussions.",
        members: "1.7K",
        href: "/group/movies-entertainment",
      },
    ],
  },
];

export default function GroupSection() {
  return (
    <section className="group-section" aria-labelledby="groups-title">
      <div className="group-section__intro">
        <span className="group-section__eyebrow">DISCOVER</span>
        <h2 id="groups-title">Popular WhatsApp Groups</h2>
        <p>
          Explore popular communities by topic and discover groups worth
          joining.
        </p>
      </div>

      <div className="group-section__sections">
        {groupSections.map((section) => (
          <div className="group-section__category" key={section.title}>
            <div className="group-section__heading">
              <div>
                <h3>{section.title}</h3>
                <p>{section.description}</p>
              </div>

              <a href={section.href} className="group-section__link">
                Show More <span aria-hidden="true">→</span>
              </a>
            </div>

            <div className="group-section__grid">
              {section.groups.map((group) => (
                <GroupCard key={group.href} {...group} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}