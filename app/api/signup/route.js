import pool from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return Response.json({ error: "Missing fields" }, { status: 400 });
    }

    const hashed = await bcrypt.hash(password, 10);

    await pool.query(
      "INSERT INTO users (email, password) VALUES ($1,$2)",
      [email, hashed]
    );

    return Response.json({ message: "User created" });

  } catch (err) {
    console.error(err);
    return Response.json({ error: "Signup failed" }, { status: 500 });
  }
}
