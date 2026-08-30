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
              Submit your WhatsApp group and make it easier for people to
              discover and join your community.
            </p>
          </div>

          <form className="add-group-form">
            <div className="add-group-form__field">
              <label htmlFor="group-name">Group Name</label>
              <input
                id="group-name"
                name="groupName"
                type="text"
                placeholder="Enter your group name"
                required
              />
            </div>

            <div className="add-group-form__field">
              <label htmlFor="group-link">WhatsApp Group Link</label>
              <input
                id="group-link"
                name="groupLink"
                type="url"
                placeholder="https://chat.whatsapp.com/..."
                required
              />
            </div>

            <div className="add-group-form__row">
              <div className="add-group-form__field">
                <label htmlFor="category">Category</label>
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
                <label htmlFor="country">Country</label>
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
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                rows="5"
                placeholder="Tell people what your group is about"
                required
              />
            </div>

            <button type="submit" className="add-group-form__submit">
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