const stats = [
  {
    value: "1,250+",
    label: "Active Groups",
    description: "Communities ready to discover",
    icon: "●",
  },
  {
    value: "50+",
    label: "Categories",
    description: "Topics for every interest",
    icon: "▦",
  },
  {
    value: "25+",
    label: "New Groups Daily",
    description: "Fresh communities added",
    icon: "✦",
  },
];

export default function StatsSection() {
  return (
    <section className="stats-section" aria-label="Website statistics">
      <div className="stats-section__grid">
        {stats.map((stat) => (
          <div className="stat-card" key={stat.label}>
            <span className="stat-card__icon" aria-hidden="true">
              {stat.icon}
            </span>

            <div className="stat-card__content">
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
              <small>{stat.description}</small>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}