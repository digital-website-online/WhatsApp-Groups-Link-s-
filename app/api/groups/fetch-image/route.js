import { NextResponse } from "next/server";

const APIFY_ACTOR =
  "api-empire~whatsapp-group-links-scraper";

export async function POST(request) {
  try {
    const body = await request.json();
    const groupLink = body?.groupLink?.toString().trim();

    if (!groupLink) {
      return NextResponse.json(
        { imageUrl: null, error: "Group link is required." },
        { status: 400 }
      );
    }

    let parsedUrl;

    try {
      parsedUrl = new URL(groupLink);
    } catch {
      return NextResponse.json(
        { imageUrl: null, error: "Invalid WhatsApp group link." },
        { status: 400 }
      );
    }

    if (parsedUrl.hostname !== "chat.whatsapp.com") {
      return NextResponse.json(
        { imageUrl: null, error: "Invalid WhatsApp group link." },
        { status: 400 }
      );
    }

    const apifyToken = process.env.APIFY_API_TOKEN;

    if (!apifyToken) {
      console.error("APIFY_API_TOKEN is missing.");

      return NextResponse.json(
        { imageUrl: null, error: "Image service is not configured." },
        { status: 500 }
      );
    }

    const response = await fetch(
      `https://api.apify.com/v2/acts/${APIFY_ACTOR}/run-sync-get-dataset-items`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apifyToken}`,
        },
        body: JSON.stringify({
          inviteLinksToVerify: [groupLink],
          verifyLinkStatus: true,
          onlyActiveLinks: true,
          linkCheckConcurrency: 1,
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Apify request failed:", errorText);

      return NextResponse.json({
        imageUrl: null,
        liveGroupName: null,
        linkStatus: null,
      });
    }

    const results = await response.json();
    const result = Array.isArray(results) ? results[0] : null;

    return NextResponse.json({
      imageUrl: result?.liveGroupPhotoUrl || null,
      liveGroupName: result?.liveGroupName || null,
      linkStatus: result?.linkStatus || null,
    });
  } catch (error) {
    console.error("Group image fetch error:", error);

    return NextResponse.json({
      imageUrl: null,
      liveGroupName: null,
      linkStatus: null,
    });
  }
}