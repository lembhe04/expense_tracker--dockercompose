import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function POST(req) {
  try {
    const { user_id, amount, category, description } = await req.json();

    await pool.query(
      `INSERT INTO expenses (user_id, amount, category, description)
       VALUES ($1,$2,$3,$4)`,
      [user_id, amount, category, description]
    );

    return NextResponse.json({ message: "Expense added" });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
