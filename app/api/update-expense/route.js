import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function PUT(req) {
  try {

    const { id, amount, category, description } = await req.json();

    await pool.query(
      `UPDATE expenses 
       SET amount=$1, category=$2, description=$3
       WHERE id=$4`,
      [amount, category, description, id]
    );

    return NextResponse.json({ message: "Expense updated" });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}

