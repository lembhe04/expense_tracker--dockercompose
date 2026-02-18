"use client";

import { useEffect, useState } from "react";

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState([]);

useEffect(() => {
  const fetchExpenses = async () => {
    try {

      const userId = localStorage.getItem("user_id");

      if (!userId) {
        console.error("No user_id found in localStorage");
        return;
      }

      const res = await fetch(`/api/expenses?user_id=${userId}`);
      const data = await res.json();

      const expenseArray = Array.isArray(data) ? data : [];

      setExpenses(expenseArray);

    } catch (err) {
      console.error("Failed to fetch expenses:", err);
      setExpenses([]);
    }
  };

  fetchExpenses();
}, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">All Expenses</h1>

      {expenses.length === 0 ? (
        <p className="text-center text-gray-500">No expenses found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="py-2 px-4 text-left">Amount</th>
                <th className="py-2 px-4 text-left">Category</th>
                <th className="py-2 px-4 text-left">Description</th>
                <th className="py-2 px-4 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense) => (
                <tr key={expense.id} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-4">₹{expense.amount}</td>
                  <td className="py-2 px-4">{expense.category}</td>
                  <td className="py-2 px-4">{expense.description}</td>
                  <td className="py-2 px-4">
                    {expense.created_at
                      ? new Date(expense.created_at).toLocaleDateString()
                      : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
