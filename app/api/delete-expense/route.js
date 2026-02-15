import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function DELETE(req) {
  try {

    const { id } = await req.json();

    await pool.query(
      "DELETE FROM expenses WHERE id=$1",
      [id]
    );

    return NextResponse.json({ message: "Expense deleted" });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
