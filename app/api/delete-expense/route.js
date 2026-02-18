import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function DELETE(req) {
  try {

    const { id } = await req.json();

    if (!id) {
      return NextResponse.json(
        { error: "ID required" },
        { status: 400 }
      );
    }

    const result = await pool.query(
      "DELETE FROM expenses WHERE id=$1 RETURNING *",
      [id]
    );

    if (result.rowCount === 0) {
      return NextResponse.json(
        { error: "Expense not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Expense deleted successfully"
    });

  } catch (err) {

    console.error(err);

    return NextResponse.json(
      { error: "Delete failed" },
      { status: 500 }
    );

  }
}
