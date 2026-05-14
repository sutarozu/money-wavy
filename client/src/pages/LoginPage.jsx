import { useForm } from 'react-hook-form';
import { loginUser } from '../services/authService';
import toast from 'react-hot-toast';
import { useNavigate, Link } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await loginUser(data);

      localStorage.setItem('user', JSON.stringify(response));

      toast.success('Login successful!');

      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-zinc-900 p-8 rounded-2xl shadow-xl">
        <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>

        <p className="text-zinc-400 mb-6">Login to your account</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 rounded-lg bg-zinc-800 text-white outline-none"
              {...register('email', {
                required: 'Email is required',
              })}
            />

            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 rounded-lg bg-zinc-800 text-white outline-none"
              {...register('password', {
                required: 'Password is required',
              })}
            />

            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>

          <button type="submit" className="w-full bg-emerald-500 hover:bg-emerald-600 transition p-3 rounded-lg text-white font-semibold">
            Login
          </button>
        </form>

        <p className="text-zinc-400 mt-6 text-center">
          Don’t have an account?{' '}
          <Link to="/register" className="text-emerald-500">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
