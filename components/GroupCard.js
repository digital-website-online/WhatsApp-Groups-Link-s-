export default function GroupCard({
  name,
  category,
  country,
  description,
  members,
  href,
}) {
  return (
    <article className="group-card">
      <div className="group-card__top">
        <div className="group-card__icon" aria-hidden="true">
          WA
        </div>

        <div className="group-card__info">
          <span className="group-card__category">
            {category || "Community"}
          </span>

          <h3>{name}</h3>
        </div>
      </div>

      <p className="group-card__description">
        {description || "Discover and join this WhatsApp community."}
      </p>

      <div className="group-card__meta">
        <span>{country || "Global"}</span>
        <span>{members || "New"}</span>
      </div>

      <a
        href={href || "#"}
        className="group-card__join"
        aria-label={`Join ${name}`}
      >
        <span>Join Group</span>
        <span aria-hidden="true">→</span>
      </a>
    </article>
  );
}