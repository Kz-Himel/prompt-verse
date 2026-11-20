import { NextResponse } from "next/server";
import { getDatabase } from "@/lib/mongodb";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { ObjectId } from "mongodb";

export async function DELETE(req, { params }) {
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

    const { id } = await params;
    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid notice ID format." },
        { status: 400 }
      );
    }

    const db = await getDatabase();
    const result = await db.collection("notices").deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { success: false, message: "Notice not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Notice deleted successfully.",
    });
  } catch (error) {
    console.error("DELETE /api/notices/[id] error:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
