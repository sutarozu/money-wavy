import { useEffect, useState } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import { getTransactions, createTransaction } from '../services/transactionService';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';
import { deleteTransaction } from '../services/transactionService';
import toast from 'react-hot-toast';

const DashboardPage = () => {
  const [transactions, setTransactions] = useState([]);

  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    type: 'expense',
    category: '',
  });

  const [search, setSearch] = useState('');

  const [filterType, setFilterType] = useState('all');

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

  const handleDelete = async (id) => {
    try {
      await deleteTransaction(id);

      toast.success('Transaction deleted');

      fetchTransactions();
    } catch (error) {
      toast.error('Failed to delete transaction');
    }
  };

  const totalIncome = transactions.filter((t) => t.type === 'income').reduce((acc, item) => acc + item.amount, 0);

  const totalExpense = transactions.filter((t) => t.type === 'expense').reduce((acc, item) => acc + item.amount, 0);

  const balance = totalIncome - totalExpense;

  const budgetLimit = 5000;

  const isOverBudget = totalExpense > budgetLimit;

  const filteredTransactions = transactions.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase());

    const matchesFilter = filterType === 'all' ? true : item.type === filterType;

    return matchesSearch && matchesFilter;
  });

  const chartData = [
    {
      name: 'Income',
      value: totalIncome,
    },
    {
      name: 'Expense',
      value: totalExpense,
    },
  ];

  const monthlyData = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month, index) => {
    const monthlyExpense = transactions
      .filter((item) => {
        const itemDate = new Date(item.date);

        return item.type === 'expense' && itemDate.getMonth() === index;
      })
      .reduce((acc, item) => acc + item.amount, 0);

    const monthlyIncome = transactions
      .filter((item) => {
        const itemDate = new Date(item.date);

        return item.type === 'income' && itemDate.getMonth() === index;
      })
      .reduce((acc, item) => acc + item.amount, 0);

    return {
      month,
      expense: monthlyExpense,
      income: monthlyIncome,
    };
  });

  const COLORS = ['#10b981', '#ef4444'];

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

        {isOverBudget && <div className="bg-red-500/20 border border-red-500 text-red-400 p-4 rounded-2xl mb-8">⚠️ Warning: You have exceeded your monthly budget limit.</div>}

        <div className="bg-zinc-900 p-6 rounded-2xl mb-8">
          <h2 className="text-2xl font-bold mb-5">Financial Analytics</h2>

          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={chartData} dataKey="value" outerRadius={120} label>
                  {chartData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index]} />
                  ))}
                </Pie>

                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-zinc-900 p-6 rounded-2xl mb-8">
            <h2 className="text-2xl font-bold mb-5">Monthly Expenses</h2>

            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />

                  <XAxis dataKey="month" />

                  <YAxis />

                  <Tooltip />

                  <Line type="monotone" dataKey="expense" stroke="#10b981" strokeWidth={3} />
                  <Line type="monotone" dataKey="income" stroke="#3b82f6" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>
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

        <div className="bg-zinc-900 p-6 rounded-2xl mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <input type="text" placeholder="Search transaction..." value={search} onChange={(e) => setSearch(e.target.value)} className="flex-1 p-3 rounded-lg bg-zinc-800 outline-none" />

            <select value={filterType} onChange={(e) => setFilterType(e.target.value)} className="p-3 rounded-lg bg-zinc-800 outline-none">
              <option value="all">All</option>

              <option value="income">Income</option>

              <option value="expense">Expense</option>
            </select>
          </div>
        </div>

        {/* Transaction List */}
        <div className="bg-zinc-900 rounded-2xl p-6">
          <h2 className="text-2xl font-bold mb-5">Recent Transactions</h2>

          <div className="space-y-4">
            {filteredTransactions.map((item) => (
              <div key={item._id} className="bg-zinc-800 p-4 rounded-xl flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">{item.title}</h3>

                  <p className="text-zinc-400 text-sm">{item.category}</p>
                </div>

                <div className="flex items-center gap-4">
                  <p className={`font-bold ${item.type === 'income' ? 'text-emerald-500' : 'text-red-500'}`}>
                    {item.type === 'income' ? '+' : '-'}${item.amount}
                  </p>

                  <button onClick={() => handleDelete(item._id)} className="bg-red-500 hover:bg-red-600 transition px-3 py-1 rounded-lg text-sm">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;
