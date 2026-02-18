"use client";

import { useEffect, useState } from "react";

export default function UpdateExpensePage() {

  const [expenses, setExpenses] = useState([]);
  const [selected, setSelected] = useState(null);

  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  const [message, setMessage] = useState("");

  // ✅ fetch user expenses
  const fetchExpenses = async () => {

    const userId = localStorage.getItem("user_id");
    if (!userId) return;

    const res = await fetch(`/api/expenses?user_id=${userId}`);
    const data = await res.json();

    setExpenses(Array.isArray(data) ? data : []);
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  // ✅ when clicking update button
  const selectExpense = (exp) => {

    setSelected(exp);

    setAmount(exp.amount);
    setCategory(exp.category);
    setDescription(exp.description || "");
  };

  // ✅ update submit
  const handleUpdate = async (e) => {

    e.preventDefault();

    const userId = localStorage.getItem("user_id");

    const res = await fetch("/api/update-expense", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: selected.id,
        amount,
        category,
        description,
        user_id: userId
      }),
    });

    const data = await res.json();

    if (res.ok) {
      setMessage("Expense updated!");
      setSelected(null);
      fetchExpenses();
    } else {
      setMessage(data.error || "Update failed");
    }
  };

  return (

    <div className="min-h-screen bg-gray-100 p-6">

      <h1 className="text-3xl font-bold mb-6 text-center">
        Update Expense
      </h1>

      {/* ================= TABLE ================= */}

      <div className="overflow-x-auto mb-10">

        <table className="min-w-full bg-white rounded-lg shadow">

          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="py-2 px-4">Amount</th>
              <th className="py-2 px-4">Category</th>
              <th className="py-2 px-4">Description</th>
              <th className="py-2 px-4">Action</th>
            </tr>
          </thead>

          <tbody>
            {expenses.map((exp) => (

              <tr key={exp.id} className="border-b text-center">

                <td className="py-2">₹{exp.amount}</td>
                <td>{exp.category}</td>
                <td>{exp.description}</td>

                <td>
                  <button
                    onClick={() => selectExpense(exp)}
                    className="bg-green-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>

      {/* ================= FORM ================= */}

      {selected && (

        <form
          onSubmit={handleUpdate}
          className="max-w-md mx-auto bg-white p-6 rounded-lg shadow space-y-4"
        >

          <input
            type="number"
            value={amount}
            onChange={(e)=>setAmount(e.target.value)}
            className="w-full p-3 border rounded"
            placeholder="Amount"
            required
          />

          <input
            value={category}
            onChange={(e)=>setCategory(e.target.value)}
            className="w-full p-3 border rounded"
            placeholder="Category"
            required
          />

          <input
            value={description}
            onChange={(e)=>setDescription(e.target.value)}
            className="w-full p-3 border rounded"
            placeholder="Description"
          />

          <button className="w-full bg-blue-500 text-white p-3 rounded">
            Save Update
          </button>

          {message && (
            <p className="text-center text-green-600">{message}</p>
          )}

        </form>
      )}

    </div>
  );
}
