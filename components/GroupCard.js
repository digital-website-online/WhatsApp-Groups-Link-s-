export default function GroupCard({
  name,
  category,
  country,
  description,
  members,
  href = "#",
}) {
  return (
    <article className="group-card">
      <a href={href} className="group-card__link">
        <div className="group-card__icon" aria-hidden="true">
          WA
        </div>

        <div className="group-card__content">
          <div className="group-card__top">
            <h3>{name}</h3>

            <span className="group-card__arrow" aria-hidden="true">
              →
            </span>
          </div>

          <p>{description}</p>

          <div className="group-card__meta">
            {category && <span>{category}</span>}
            {country && <span>{country}</span>}
            {members && <span>{members} members</span>}
          </div>
        </div>
      </a>
    </article>
  );
}