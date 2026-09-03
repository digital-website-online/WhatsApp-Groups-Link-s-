import Header from "../../components/Header";
import Footer from "../../components/Footer";

export const metadata = {
  title: "Add Your WhatsApp Group",
  description:
    "Submit your WhatsApp group to our directory and help people discover your community.",
  alternates: {
    canonical: "/add-group",
  },
};

export default function AddGroupPage() {
  return (
    <>
      <Header />

      <main>
        <section className="add-group-page">
          <div className="add-group-page__intro">
            <span>GROW YOUR COMMUNITY</span>

            <h1>Add Your WhatsApp Group</h1>

            <p>
              Share your WhatsApp group with our community and help people
              discover the right group for them.
            </p>
          </div>

          <form className="add-group-form">
            <div className="add-group-form__field">
              <label htmlFor="submitter-name">
                Your Name
              </label>

              <input
                id="submitter-name"
                name="submitterName"
                type="text"
                placeholder="Enter your name"
                autoComplete="name"
                required
              />

              <small>
                This helps us identify the person submitting the group.
              </small>
            </div>

            <div className="add-group-form__field">
              <label htmlFor="group-name">
                Group Name
              </label>

              <input
                id="group-name"
                name="groupName"
                type="text"
                placeholder="Enter your group name"
                required
              />
            </div>

            <div className="add-group-form__field">
              <label htmlFor="group-link">
                WhatsApp Group Link
              </label>

              <input
                id="group-link"
                name="groupLink"
                type="url"
                placeholder="https://chat.whatsapp.com/..."
                required
              />

              <small>
                Make sure your WhatsApp invite link is active and publicly
                accessible.
              </small>
            </div>

            <div className="add-group-form__row">
              <div className="add-group-form__field">
                <label htmlFor="category">
                  Category
                </label>

                <select id="category" name="category" required>
                  <option value="">Select category</option>
                  <option value="community">Community</option>
                  <option value="education">Education</option>
                  <option value="technology">Technology</option>
                  <option value="gaming">Gaming</option>
                  <option value="sports">Sports</option>
                  <option value="business">Business</option>
                  <option value="entertainment">Entertainment</option>
                </select>
              </div>

              <div className="add-group-form__field">
                <label htmlFor="country">
                  Country
                </label>

                <select id="country" name="country" required>
                  <option value="">Select country</option>
                  <option value="pakistan">Pakistan</option>
                  <option value="india">India</option>
                  <option value="bangladesh">Bangladesh</option>
                  <option value="united-states">United States</option>
                  <option value="united-kingdom">United Kingdom</option>
                  <option value="canada">Canada</option>
                </select>
              </div>
            </div>

            <div className="add-group-form__field">
              <label htmlFor="members">
                Approx. Members
              </label>

              <input
                id="members"
                name="members"
                type="number"
                min="0"
                inputMode="numeric"
                placeholder="e.g. 500"
              />

              <small>
                An approximate number is fine.
              </small>
            </div>

            <div className="add-group-form__field">
              <label htmlFor="description">
                Description
              </label>

              <textarea
                id="description"
                name="description"
                rows="5"
                placeholder="Tell people what your group is about, what they can expect, and who it is for."
                required
              />
            </div>

            <div className="add-group-form__note">
              <strong>Before submitting</strong>
              <p>
                Please make sure the group link works and the information
                you provide is accurate. Your submission may be reviewed
                before it appears in the directory.
              </p>
            </div>

            <button
              type="submit"
              className="add-group-form__submit"
            >
              Submit Group
              <span aria-hidden="true">→</span>
            </button>
          </form>
        </section>
      </main>

      <Footer />
    </>
  );
}