import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { name, email, message } = data;

    if (!name || !email || !message) {
      return NextResponse.json(
        { status: "error", message: "Please fill in all fields." },
        { status: 400 }
      );
    }

    const scriptUrl = process.env.GOOGLE_SCRIPT_URL;

    if (!scriptUrl) {
      console.error("GOOGLE_SCRIPT_URL is not configured");
      return NextResponse.json(
        { status: "error", message: "Contact form is temporarily unavailable." },
        { status: 500 }
      );
    }

    const response = await fetch(scriptUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, message }),
    });

    const result = await response.json();

    return NextResponse.json(result);
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { status: "error", message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}