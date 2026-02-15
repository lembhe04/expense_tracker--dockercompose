import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET(req) {
  try {

    const { searchParams } = new URL(req.url);
    const user_id = searchParams.get("user_id");

    const result = await pool.query(
      "SELECT * FROM expenses WHERE user_id=$1 ORDER BY id DESC",
      [user_id]
    );

    return NextResponse.json(result.rows);

  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
