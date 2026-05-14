import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { HiMenuAlt3 } from 'react-icons/hi';

const DashboardLayout = ({ children }) => {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('user');

    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex">
      <div className="md:hidden fixed top-0 left-0 right-0 bg-zinc-900 border-b border-zinc-800 p-4 flex justify-between items-center z-50">
        <h1 className="text-xl font-bold text-emerald-500">MoneyWavy</h1>

        <button onClick={() => setIsOpen(!isOpen)}>
          <HiMenuAlt3 size={28} />
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`fixed md:static top-0 left-0 h-full w-64 bg-zinc-900 border-r border-zinc-800 p-6 z-50 transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
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
      <main className="flex-1 p-6 pt-24 md:pt-6">{children}</main>
    </div>
  );
};

export default DashboardLayout;
