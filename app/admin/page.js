"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";

export default function AdminPage() {
  const router = useRouter();

  const [session, setSession] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadAdmin() {
      const { data } = await supabase.auth.getSession();

      if (!active) return;

      if (!data.session) {
        router.replace("/admin/login");
        return;
      }

      const { data: adminData, error: adminError } = await supabase
        .from("admin_users")
        .select("user_id")
        .eq("user_id", data.session.user.id)
        .maybeSingle();

      if (adminError || !adminData) {
        await supabase.auth.signOut();
        router.replace("/admin/login");
        return;
      }

      setSession(data.session);
      await loadSubmissions(data.session);
    }

    async function loadSubmissions(currentSession) {
      setLoading(true);
      setError("");

      const response = await fetch("/api/admin/submissions", {
        headers: {
          Authorization: `Bearer ${currentSession.access_token}`,
        },
        cache: "no-store",
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.error || "Unable to load submissions.");
        setLoading(false);
        return;
      }

      setSubmissions(result.submissions || []);
      setLoading(false);
    }

    loadAdmin();

    return () => {
      active = false;
    };
  }, [router]);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.replace("/admin/login");
  }

  return (
    <main className="admin-page">
      <div className="admin-shell">
        <header className="admin-header">
          <div>
            <span className="admin-eyebrow">WhatsApp Groups</span>
            <h1>Admin Dashboard</h1>
            <p>Manage submitted WhatsApp groups.</p>
          </div>

          <button
            type="button"
            className="admin-logout"
            onClick={handleLogout}
          >
            Logout
          </button>
        </header>

        <section className="admin-stats">
          <div className="admin-stat">
            <span>Total Pending</span>
            <strong>{submissions.length}</strong>
          </div>

          <div className="admin-stat">
            <span>Awaiting Review</span>
            <strong>{submissions.length}</strong>
          </div>

          <div className="admin-stat">
            <span>Status</span>
            <strong>Active</strong>
          </div>
        </section>

        <section className="admin-panel">
          <div className="admin-panel__head">
            <div>
              <span className="admin-eyebrow">Submissions</span>
              <h2>Pending Approval</h2>
            </div>

            <span className="admin-count">
              {submissions.length} pending
            </span>
          </div>

          {loading && (
            <div className="admin-state">
              <span className="admin-spinner" />
              Loading submissions...
            </div>
          )}

          {!loading && error && (
            <div className="admin-state admin-state--error">
              {error}
            </div>
          )}

          {!loading && !error && submissions.length === 0 && (
            <div className="admin-state">
              <strong>No pending submissions</strong>
              <span>New group submissions will appear here.</span>
            </div>
          )}

          {!loading && !error && submissions.length > 0 && (
            <div className="admin-list">
              {submissions.map((submission) => (
                <article
                  className="admin-submission"
                  key={submission.id}
                >
                  <div className="admin-submission__top">
                    <div>
                      <span className="admin-status">Pending</span>
                      <h3>{submission.group_name}</h3>
                    </div>

                    <span className="admin-id">
                      #{submission.id}
                    </span>
                  </div>

                  <div className="admin-details">
                    <div>
                      <span>Submitted by</span>
                      <strong>{submission.submitter_name}</strong>
                    </div>

                    <div>
                      <span>Category</span>
                      <strong>
                        {submission.categories?.name || "—"}
                      </strong>
                    </div>

                    <div>
                      <span>Country</span>
                      <strong>
                        {submission.countries?.name || "—"}
                      </strong>
                    </div>

                    <div>
                      <span>Members</span>
                      <strong>{submission.members || "—"}</strong>
                    </div>
                  </div>

                  <div className="admin-description">
                    {submission.description}
                  </div>

                  {submission.group_link && (
                    <a
                      href={submission.group_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="admin-link"
                    >
                      Open WhatsApp Link →
                    </a>
                  )}

                  <div className="admin-submission__date">
                    Submitted{" "}
                    {new Date(
                      submission.created_at
                    ).toLocaleString()}
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>

      <style jsx global>{`
        .admin-page {
          min-height: 100vh;
          padding: 28px 16px 60px;
          background: #f5f7f7;
          color: #111b21;
        }

        .admin-shell {
          width: 100%;
          max-width: 1080px;
          margin: 0 auto;
        }

        .admin-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          margin-bottom: 24px;
        }

        .admin-eyebrow {
          display: block;
          margin-bottom: 7px;
          color: #667781;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.09em;
          text-transform: uppercase;
        }

        .admin-header h1 {
          margin: 0;
          font-size: clamp(27px, 5vw, 38px);
          line-height: 1.1;
        }

        .admin-header p {
          margin: 8px 0 0;
          color: #667781;
          font-size: 14px;
        }

        .admin-logout {
          flex-shrink: 0;
          padding: 11px 16px;
          border: 1px solid #d9e1e1;
          border-radius: 11px;
          background: #fff;
          color: #111b21;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
        }

        .admin-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          margin-bottom: 18px;
        }

        .admin-stat {
          padding: 18px;
          border: 1px solid #e5eaea;
          border-radius: 16px;
          background: #fff;
        }

        .admin-stat span {
          display: block;
          margin-bottom: 8px;
          color: #667781;
          font-size: 12px;
        }

        .admin-stat strong {
          font-size: 24px;
          line-height: 1;
        }

        .admin-panel {
          border: 1px solid #e5eaea;
          border-radius: 18px;
          background: #fff;
          overflow: hidden;
        }

        .admin-panel__head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          padding: 20px;
          border-bottom: 1px solid #edf0f0;
        }

        .admin-panel__head h2 {
          margin: 0;
          font-size: 20px;
        }

        .admin-count {
          padding: 7px 10px;
          border-radius: 999px;
          background: #f1f5f5;
          color: #52656c;
          font-size: 11px;
          font-weight: 700;
        }

        .admin-state {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          min-height: 180px;
          padding: 24px;
          color: #667781;
          font-size: 14px;
          text-align: center;
        }

        .admin-state strong {
          display: block;
          color: #111b21;
        }

        .admin-state--error {
          color: #b42318;
        }

        .admin-spinner {
          width: 16px;
          height: 16px;
          border: 2px solid #d9e1e1;
          border-top-color: #111b21;
          border-radius: 50%;
          animation: admin-spin 0.7s linear infinite;
        }

        .admin-list {
          display: grid;
          gap: 12px;
          padding: 16px;
        }

        .admin-submission {
          padding: 18px;
          border: 1px solid #e5eaea;
          border-radius: 15px;
          background: #fbfcfc;
        }

        .admin-submission__top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 12px;
        }

        .admin-status {
          display: inline-block;
          margin-bottom: 7px;
          padding: 5px 8px;
          border-radius: 999px;
          background: #fff5d9;
          color: #876b16;
          font-size: 10px;
          font-weight: 800;
          text-transform: uppercase;
        }

        .admin-submission h3 {
          margin: 0;
          font-size: 18px;
        }

        .admin-id {
          color: #8a989d;
          font-size: 11px;
        }

        .admin-details {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 10px;
          margin-top: 17px;
        }

        .admin-details div {
          padding: 11px;
          border-radius: 11px;
          background: #f3f6f6;
        }

        .admin-details span {
          display: block;
          margin-bottom: 4px;
          color: #7a898e;
          font-size: 10px;
        }

        .admin-details strong {
          display: block;
          color: #27373c;
          font-size: 12px;
          word-break: break-word;
        }

        .admin-description {
          margin-top: 12px;
          color: #52656c;
          font-size: 13px;
          line-height: 1.6;
        }

        .admin-link {
          display: inline-block;
          margin-top: 13px;
          color: #176b5b;
          font-size: 13px;
          font-weight: 700;
          text-decoration: none;
        }

        .admin-submission__date {
          margin-top: 13px;
          color: #8a989d;
          font-size: 10px;
        }

        @keyframes admin-spin {
          to {
            transform: rotate(360deg);
          }
        }

        @media (max-width: 700px) {
          .admin-page {
            padding: 20px 12px 40px;
          }

          .admin-header {
            align-items: flex-start;
          }

          .admin-stats {
            grid-template-columns: 1fr;
          }

          .admin-details {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 430px) {
          .admin-header {
            flex-direction: column;
          }

          .admin-logout {
            width: 100%;
          }

          .admin-details {
            grid-template-columns: 1fr;
          }

          .admin-panel__head {
            align-items: flex-start;
            flex-direction: column;
          }
        }
      `}</style>
    </main>
  );
}