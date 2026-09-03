import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

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

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const publishableKey =
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
    const serviceRoleKey =
      process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !publishableKey || !serviceRoleKey) {
      console.error("Missing Supabase server environment variables.");

      return NextResponse.json(
        { error: "Server configuration error." },
        { status: 500 }
      );
    }

    const authClient = createClient(
      supabaseUrl,
      publishableKey,
      {
        global: {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      }
    );

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

    const adminClient = createClient(
      supabaseUrl,
      serviceRoleKey,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    );

    const { data: adminData, error: adminError } = await adminClient
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

    const submissionId = Number(params.id);

    if (!Number.isInteger(submissionId) || submissionId <= 0) {
      return NextResponse.json(
        { error: "Invalid submission ID." },
        { status: 400 }
      );
    }

    const { data: submission, error: submissionError } =
      await adminClient
        .from("group_submissions")
        .select("id, status")
        .eq("id", submissionId)
        .maybeSingle();

    if (submissionError) {
      console.error("Submission lookup error:", submissionError);

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

    const { error: updateError } = await adminClient
      .from("group_submissions")
      .update({
        status: "rejected",
      })
      .eq("id", submission.id)
      .eq("status", "pending");

    if (updateError) {
      console.error("Reject update error:", updateError);

      return NextResponse.json(
        { error: "Unable to reject this submission." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Submission rejected successfully.",
    });
  } catch (error) {
    console.error("Reject API error:", error);

    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}