"use client";

import { useEffect, useState } from "react";

export default function DeleteExpensePage() {
  const [expenses, setExpenses] = useState([]);
  const [message, setMessage] = useState("");

const fetchExpenses = async () => {
  try {

    const userId = localStorage.getItem("user_id");

    if (!userId) {
      console.error("No user_id found in localStorage");
      return;
    }

    const res = await fetch(`/api/expenses?user_id=${userId}`);
    const data = await res.json();

    const expenseArray = Array.isArray(data)
      ? data
      : data.expenses || [];

    setExpenses(expenseArray);

  } catch (err) {
    console.error("Failed to fetch expenses:", err);
    setExpenses([]);
  }
};

  useEffect(() => {
    fetchExpenses();
  }, []);

  // ✅ Delete handler
  const handleDelete = async (id) => {

    if (!confirm("Are you sure you want to delete this expense?")) return;

    try {
      const res = await fetch("/api/delete-expense", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Expense deleted successfully!");
        fetchExpenses();   // refresh list
      } else {
        setMessage(data.error || "Failed to delete expense");
      }

    } catch (err) {
      console.error(err);
      setMessage("Error deleting expense");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <h1 className="text-3xl font-bold mb-6 text-center">
        Delete Expenses
      </h1>

      {message && (
        <p className="text-center text-red-600 mb-4">{message}</p>
      )}

      {expenses.length === 0 ? (
        <p className="text-center text-gray-500">No expenses found.</p>
      ) : (

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow">

            <thead>
              <tr className="bg-red-500 text-white">
                <th className="py-2 px-4 text-left">Amount</th>
                <th className="py-2 px-4 text-left">Category</th>
                <th className="py-2 px-4 text-left">Description</th>
                <th className="py-2 px-4 text-left">Date</th>
                <th className="py-2 px-4">Action</th>
              </tr>
            </thead>

            <tbody>
              {expenses.map((expense) => (
                <tr key={expense.id} className="border-b hover:bg-gray-50">

                  <td className="py-2 px-4">₹{expense.amount}</td>
                  <td className="py-2 px-4">{expense.category}</td>
                  <td className="py-2 px-4">{expense.description}</td>

                  <td className="py-2 px-4">
                    {new Date(
                      expense.created_at || expense.date
                    ).toLocaleDateString()}
                  </td>

                  <td className="py-2 px-4">

                    <button
                      onClick={() => handleDelete(expense.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>

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
