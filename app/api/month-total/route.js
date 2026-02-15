import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET() {
  try {

    const result = await pool.query(`
      SELECT COALESCE(SUM(amount),0) AS total
      FROM expenses
      WHERE DATE_TRUNC('month', created_at) =
            DATE_TRUNC('month', CURRENT_DATE)
    `);

    return NextResponse.json({
      total: result.rows[0].total
    });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
