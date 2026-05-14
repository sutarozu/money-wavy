import DashboardLayout from '../layouts/DashboardLayout';

const DashboardPage = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <DashboardLayout>
      <div>
        <h1 className="text-3xl font-bold mb-2">Welcome, {user?.user?.name}</h1>

        <p className="text-zinc-400">Here’s your financial overview.</p>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;
