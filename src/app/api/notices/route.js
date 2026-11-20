import { NextResponse } from "next/server";
import { getDatabase } from "@/lib/mongodb";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function GET() {
  try {
    const db = await getDatabase();
    const notices = await db
      .collection("notices")
      .find({ status: { $ne: "archived" } })
      .sort({ createdAt: -1 })
      .limit(30)
      .toArray();

    return NextResponse.json({
      success: true,
      data: notices,
    });
  } catch (error) {
    console.error("GET /api/notices error:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    const userRole = session?.user?.role;
    if (userRole !== "admin") {
      return NextResponse.json(
        { success: false, message: "Forbidden: Admin access required." },
        { status: 403 }
      );
    }

    const body = await req.json();
    const { title, message, type = "info", priority = "normal", target = "all", link = "" } = body;

    if (!title || !message) {
      return NextResponse.json(
        { success: false, message: "Title and message are required." },
        { status: 400 }
      );
    }

    const newNotice = {
      title: title.trim(),
      message: message.trim(),
      type: ["info", "warning", "success", "alert"].includes(type) ? type : "info",
      priority: ["normal", "high", "urgent"].includes(priority) ? priority : "normal",
      target: ["all", "user", "creator"].includes(target) ? target : "all",
      link: link ? link.trim() : "",
      author: session.user.name || "Admin",
      authorEmail: session.user.email,
      createdAt: new Date(),
      status: "active",
    };

    const db = await getDatabase();
    const result = await db.collection("notices").insertOne(newNotice);

    return NextResponse.json({
      success: true,
      message: "Notice broadcasted successfully!",
      data: { ...newNotice, _id: result.insertedId },
    }, { status: 201 });
  } catch (error) {
    console.error("POST /api/notices error:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
