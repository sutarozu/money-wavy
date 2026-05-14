import { Link, useNavigate } from 'react-router-dom';

const DashboardLayout = ({ children }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');

    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex">
      {/* Sidebar */}
      <aside className="w-64 bg-zinc-900 border-r border-zinc-800 p-6 hidden md:block">
        <h1 className="text-2xl font-bold text-emerald-500 mb-10">MoneyWavy</h1>

        <nav className="space-y-3">
          <Link to="/" className="block p-3 rounded-lg hover:bg-zinc-800 transition">
            Dashboard
          </Link>

          <Link to="/transactions" className="block p-3 rounded-lg hover:bg-zinc-800 transition">
            Transactions
          </Link>

          <Link to="/analytics" className="block p-3 rounded-lg hover:bg-zinc-800 transition">
            Analytics
          </Link>
        </nav>

        <button onClick={handleLogout} className="mt-10 w-full bg-red-500 hover:bg-red-600 transition p-3 rounded-lg">
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
};

export default DashboardLayout;
