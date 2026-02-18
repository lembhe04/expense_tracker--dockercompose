"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Dashboard() {

  const [monthTotal, setMonthTotal] = useState(0);

  useEffect(() => {

    const userId = localStorage.getItem("user_id");
    if (!userId) return;

    const fetchMonthTotal = async () => {
      try {
        const res = await fetch(`/api/month-total?user_id=${userId}`);
        const data = await res.json();
        setMonthTotal(Number(data.total) || 0);
      } catch (err) {
        console.error("Failed to fetch month total:", err);
      }
    };

    fetchMonthTotal();

  }, []);

  return (

    <div className="min-h-screen bg-gray-100 p-6">

      <h1 className="text-3xl font-bold mb-6 text-center">
        Expense Tracker
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">

        {/* MONTH CARD */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">This Month</h2>
          <p className="text-2xl font-bold text-green-500">₹{monthTotal}</p>
        </div>


        {/* ADD */}
        <Link href="/add-expense">
          <div className="bg-white p-6 rounded-lg shadow cursor-pointer hover:bg-gray-50">
            <h2 className="text-lg font-semibold mb-2">Add Expense</h2>
            <p className="text-gray-500">Fill the form to add an expense</p>
          </div>
        </Link>


        {/* VIEW */}
        <Link href="/expenses">
          <div className="bg-white p-6 rounded-lg shadow cursor-pointer hover:bg-gray-50">
            <h2 className="text-lg font-semibold mb-2">View Expenses</h2>
            <p className="text-gray-500">See all your expenses</p>
          </div>
        </Link>


        {/* UPDATE */}
        <Link href="/update-expense">
          <div className="bg-white p-6 rounded-lg shadow cursor-pointer hover:bg-gray-50">
            <h2 className="text-lg font-semibold mb-2">Update Expense</h2>
            <p className="text-gray-500">Edit existing expenses</p>
          </div>
        </Link>


        {/* DELETE  ← ⭐ NEW CARD */}
        <Link href="/delete-expense">
          <div className="bg-white p-6 rounded-lg shadow cursor-pointer hover:bg-red-50 border border-red-200">
            <h2 className="text-lg font-semibold mb-2 text-red-600">
              Delete Expense
            </h2>
            <p className="text-gray-500">Remove unwanted expense</p>
          </div>
        </Link>


        {/* LOGIN */}
        <Link href="/login">
          <div className="bg-white p-6 rounded-lg shadow cursor-pointer hover:bg-gray-50">
            <h2 className="text-lg font-semibold mb-2">Login</h2>
            <p className="text-gray-500">Access your account</p>
          </div>
        </Link>


        {/* SIGNUP */}
        <Link href="/signup">
          <div className="bg-white p-6 rounded-lg shadow cursor-pointer hover:bg-gray-50">
            <h2 className="text-lg font-semibold mb-2">Signup</h2>
            <p className="text-gray-500">Create a new account</p>
          </div>
        </Link>

      </div>

    </div>
  );
}
