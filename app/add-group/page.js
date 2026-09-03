"use client";

import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { supabase } from "../../lib/supabase";

export default function AddGroupPage() {
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    if (submitting) return;

    setSubmitting(true);
    setMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const submitterName = formData.get("submitterName")?.toString().trim();
    const groupName = formData.get("groupName")?.toString().trim();
    const groupLink = formData.get("groupLink")?.toString().trim();
    const category = formData.get("category")?.toString().trim();
    const country = formData.get("country")?.toString().trim();
    const members = formData.get("members")?.toString().trim();
    const description = formData.get("description")?.toString().trim();

    try {
      const { data: categoryData, error: categoryError } = await supabase
        .from("categories")
        .select("id")
        .eq("slug", category)
        .single();

      if (categoryError || !categoryData) {
        throw new Error("Invalid category selected.");
      }

      const { data: countryData, error: countryError } = await supabase
        .from("countries")
        .select("id")
        .eq("slug", country)
        .single();

      if (countryError || !countryData) {
        throw new Error("Invalid country selected.");
      }

      let imageUrl = null;

      try {
        const imageResponse = await fetch("/api/groups/fetch-image", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            groupLink,
          }),
        });

        if (imageResponse.ok) {
          const imageData = await imageResponse.json();
          imageUrl = imageData?.imageUrl || null;
        }
      } catch (imageError) {
        console.error("Group image fetch error:", imageError);
      }

      const { error } = await supabase
        .from("group_submissions")
        .insert({
          submitter_name: submitterName,
          group_name: groupName,
          group_link: groupLink,
          category_id: categoryData.id,
          country_id: countryData.id,
          members: members || null,
          description,
          image_url: imageUrl,
          status: "pending",
        });

      if (error) {
        throw error;
      }

      form.reset();
      setMessage(
        "Your group has been submitted successfully. It will be reviewed before appearing in the directory."
      );
    } catch (error) {
      console.error("Group submission error:", error);
      setMessage(
        "We couldn't submit your group right now. Please check your information and try again."
      );
    } finally {
      setSubmitting(false);
    }
  }

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

          <form className="add-group-form" onSubmit={handleSubmit}>
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

            {message && (
              <div
                className="add-group-form__message"
                role="status"
                aria-live="polite"
              >
                {message}
              </div>
            )}

            <button
              type="submit"
              className="add-group-form__submit"
              disabled={submitting}
            >
              {submitting ? "Submitting..." : "Submit Group"}
              <span aria-hidden="true">→</span>
            </button>
          </form>
        </section>
      </main>

      <Footer />
    </>
  );
}