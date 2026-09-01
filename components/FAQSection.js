const faqs = [
  {
    question: "How can I join a WhatsApp group?",
    answer:
      "Choose a group that interests you, open its group page, and select Join Group. You will then be taken to WhatsApp to complete the joining process.",
  },
  {
    question: "Are these WhatsApp group links free?",
    answer:
      "Yes. Groups listed on this directory can be discovered and accessed without a membership fee.",
  },
  {
    question: "How do I find groups by category?",
    answer:
      "Browse the Categories section to explore groups covering topics such as education, gaming, technology, sports and entertainment.",
  },
  {
    question: "Can I find WhatsApp groups by country?",
    answer:
      "Yes. Use the Countries section to discover communities associated with different countries and regions.",
  },
  {
    question: "How can I add my WhatsApp group?",
    answer:
      "Use the Add Your Group option to submit your community for listing. Submitted groups can be reviewed before appearing publicly.",
  },
  {
    question: "Are all listed WhatsApp groups active?",
    answer:
      "Group availability can change over time. We aim to keep listings useful and up to date, but individual groups may become inactive or reach their member limit.",
  },
];

export default function FAQSection() {
  return (
    <section className="faq-section" aria-labelledby="faq-title">
      <div className="faq-section__heading">
        <span className="faq-section__eyebrow">FAQ</span>

        <h2 id="faq-title">Frequently Asked Questions</h2>

        <p>
          Quick answers about finding, joining and submitting WhatsApp
          groups.
        </p>
      </div>

      <div className="faq-section__list">
        {faqs.map((faq) => (
          <details className="faq-item" key={faq.question}>
            <summary>
              <span>{faq.question}</span>
              <span className="faq-item__icon" aria-hidden="true">
                +
              </span>
            </summary>

            <div className="faq-item__answer">
              <p>{faq.answer}</p>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}