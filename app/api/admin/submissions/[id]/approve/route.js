import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function createAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error("Missing Supabase server environment variables.");
  }

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

function createAuthClient(accessToken) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const publishableKey =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !publishableKey) {
    throw new Error("Missing Supabase environment variables.");
  }

  return createClient(supabaseUrl, publishableKey, {
    global: {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  });
}

function makeSlug(name, id) {
  const baseSlug = name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  return `${baseSlug || "whatsapp-group"}-${id}`;
}

export async function POST(request, { params }) {
  try {
    const authorization = request.headers.get("authorization");

    if (!authorization?.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Unauthorized." },
        { status: 401 }
      );
    }

    const accessToken = authorization.replace("Bearer ", "").trim();

    if (!accessToken) {
      return NextResponse.json(
        { error: "Unauthorized." },
        { status: 401 }
      );
    }

    const authClient = createAuthClient(accessToken);

    const {
      data: { user },
      error: userError,
    } = await authClient.auth.getUser();

    if (userError || !user) {
      return NextResponse.json(
        { error: "Unauthorized." },
        { status: 401 }
      );
    }

    const adminClient = createAdminClient();

    const { data: adminData, error: adminError } =
      await adminClient
        .from("admin_users")
        .select("user_id")
        .eq("user_id", user.id)
        .maybeSingle();

    if (adminError || !adminData) {
      return NextResponse.json(
        { error: "Admin access denied." },
        { status: 403 }
      );
    }

    const { id } = await params;
    const submissionId = Number(id);

    if (!Number.isInteger(submissionId) || submissionId <= 0) {
      return NextResponse.json(
        { error: "Invalid submission ID." },
        { status: 400 }
      );
    }

    const {
      data: submission,
      error: submissionError,
    } = await adminClient
      .from("group_submissions")
      .select(`
        id,
        submitter_name,
        group_name,
        group_link,
        category_id,
        country_id,
        members,
        description,
        image_url,
        status
      `)
      .eq("id", submissionId)
      .maybeSingle();

    if (submissionError) {
      console.error(
        "Submission lookup error:",
        submissionError
      );

      return NextResponse.json(
        { error: "Unable to load submission." },
        { status: 500 }
      );
    }

    if (!submission) {
      return NextResponse.json(
        { error: "Submission not found." },
        { status: 404 }
      );
    }

    if (submission.status !== "pending") {
      return NextResponse.json(
        { error: "This submission has already been processed." },
        { status: 409 }
      );
    }

    const slug = makeSlug(
      submission.group_name,
      submission.id
    );

    const { error: groupError } = await adminClient
      .from("groups")
      .insert({
        name: submission.group_name,
        slug,
        category_id: submission.category_id,
        country_id: submission.country_id,
        description: submission.description,
        members: submission.members,
        join_url: submission.group_link,
        keywords: submission.group_name,
        image_url: submission.image_url,
        status: "approved",
      });

    if (groupError) {
      console.error(
        "Group approval insert error:",
        groupError
      );

      return NextResponse.json(
        { error: "Unable to approve this group." },
        { status: 500 }
      );
    }

    const { error: updateError } = await adminClient
      .from("group_submissions")
      .update({
        status: "approved",
      })
      .eq("id", submission.id)
      .eq("status", "pending");

    if (updateError) {
      console.error(
        "Submission status update error:",
        updateError
      );

      return NextResponse.json(
        {
          error:
            "Group was added, but the submission status could not be updated.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Group approved successfully.",
    });
  } catch (error) {
    console.error("Approve API error:", error);

    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}