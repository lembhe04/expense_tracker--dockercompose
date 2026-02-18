import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import pool from "@/lib/db";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    const result = await pool.query(
      "SELECT * FROM users WHERE email=$1",
      [email]
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 400 });
    }

    const user = result.rows[0];

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      return NextResponse.json({ error: "Wrong password" }, { status: 400 });
    }

    // ⭐⭐⭐ RETURN USER ID ⭐⭐⭐
    return NextResponse.json({
      message: "Login success",
      user_id: user.id,
      email: user.email
    });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}
