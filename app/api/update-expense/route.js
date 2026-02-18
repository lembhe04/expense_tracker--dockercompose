import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function PUT(req) {

  try {

    const { id, amount, category, description, user_id } = await req.json();

    if (!id || !user_id) {
      return NextResponse.json(
        { error: "Missing id or user" },
        { status: 400 }
      );
    }

    await pool.query(
      `UPDATE expenses 
       SET amount=$1, category=$2, description=$3
       WHERE id=$4 AND user_id=$5`,
      [amount, category, description, id, user_id]
    );

    return NextResponse.json({ message: "Expense updated" });

  } catch (err) {

    console.error(err);

    return NextResponse.json(
      { error: "Update failed" },
      { status: 500 }
    );
  }
}
