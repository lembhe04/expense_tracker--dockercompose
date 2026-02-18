import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET(req) {
  try {

    const { searchParams } = new URL(req.url);
    const user_id = searchParams.get("user_id");

    const result = await pool.query(`
      SELECT COALESCE(SUM(amount),0) AS total
      FROM expenses
      WHERE user_id=$1
      AND DATE_TRUNC('month', created_at) =
          DATE_TRUNC('month', CURRENT_DATE)
    `,[user_id]);

    return NextResponse.json({
      total: result.rows[0].total
    });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
