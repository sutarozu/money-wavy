import { useEffect, useState } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import { getTransactions, createTransaction } from '../services/transactionService';

import toast from 'react-hot-toast';

const DashboardPage = () => {
  const [transactions, setTransactions] = useState([]);

  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    type: 'expense',
    category: '',
  });

  const fetchTransactions = async () => {
    try {
      const data = await getTransactions();

      setTransactions(data);
    } catch (error) {
      toast.error('Failed to load transactions');
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createTransaction(formData);

      toast.success('Transaction added');

      setFormData({
        title: '',
        amount: '',
        type: 'expense',
        category: '',
      });

      fetchTransactions();
    } catch (error) {
      toast.error('Failed to add transaction');
    }
  };

  const totalIncome = transactions.filter((t) => t.type === 'income').reduce((acc, item) => acc + item.amount, 0);

  const totalExpense = transactions.filter((t) => t.type === 'expense').reduce((acc, item) => acc + item.amount, 0);

  const balance = totalIncome - totalExpense;

  return (
    <DashboardLayout>
      <div>
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

        {/* Summary Cards */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="bg-zinc-900 p-5 rounded-2xl">
            <h2 className="text-zinc-400">Balance</h2>

            <p className="text-3xl font-bold mt-2">${balance}</p>
          </div>

          <div className="bg-zinc-900 p-5 rounded-2xl">
            <h2 className="text-zinc-400">Income</h2>

            <p className="text-3xl font-bold mt-2 text-emerald-500">${totalIncome}</p>
          </div>

          <div className="bg-zinc-900 p-5 rounded-2xl">
            <h2 className="text-zinc-400">Expense</h2>

            <p className="text-3xl font-bold mt-2 text-red-500">${totalExpense}</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-zinc-900 p-6 rounded-2xl mb-8 space-y-4">
          <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} className="w-full p-3 rounded-lg bg-zinc-800 outline-none" />

          <input type="number" name="amount" placeholder="Amount" value={formData.amount} onChange={handleChange} className="w-full p-3 rounded-lg bg-zinc-800 outline-none" />

          <input type="text" name="category" placeholder="Category" value={formData.category} onChange={handleChange} className="w-full p-3 rounded-lg bg-zinc-800 outline-none" />

          <select name="type" value={formData.type} onChange={handleChange} className="w-full p-3 rounded-lg bg-zinc-800 outline-none">
            <option value="expense">Expense</option>

            <option value="income">Income</option>
          </select>

          <button type="submit" className="bg-emerald-500 hover:bg-emerald-600 transition px-5 py-3 rounded-lg">
            Add Transaction
          </button>
        </form>

        {/* Transaction List */}
        <div className="bg-zinc-900 rounded-2xl p-6">
          <h2 className="text-2xl font-bold mb-5">Recent Transactions</h2>

          <div className="space-y-4">
            {transactions.map((item) => (
              <div key={item._id} className="bg-zinc-800 p-4 rounded-xl flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">{item.title}</h3>

                  <p className="text-zinc-400 text-sm">{item.category}</p>
                </div>

                <p className={`font-bold ${item.type === 'income' ? 'text-emerald-500' : 'text-red-500'}`}>
                  {item.type === 'income' ? '+' : '-'}${item.amount}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;
