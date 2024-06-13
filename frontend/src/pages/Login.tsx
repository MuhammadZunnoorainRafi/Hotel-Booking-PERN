import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import * as actions from '../actions/index';
import { userLogSchema } from '../lib/schemas';
import { LogUser } from '../lib/types';

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LogUser>({
    resolver: zodResolver(userLogSchema),
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: actions.login,
    onSuccess: async () => {
      toast.success('User Signed In');
      await queryClient.invalidateQueries({ queryKey: ['verifyToken'] });
      navigate(location.state?.from?.pathname || '/');
      reset();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const formSubmit = (formData: LogUser) => {
    mutation.mutate(formData);
  };

  return (
    <div className=" shrink-0 w-full max-w-sm mx-auto shadow-2xl bg-base-100 mt-10 mb-2">
      <h1 className="font-bold text-2xl text-center pt-3">Login</h1>
      <form onSubmit={handleSubmit(formSubmit)} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>

          <input
            type="email"
            placeholder="email"
            className="input input-bordered"
            {...register('email')}
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            type="password"
            placeholder="password"
            className="input input-bordered"
            {...register('password')}
          />
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>
        <div className="form-control mt-6 space-y-1">
          {mutation.isPending ? (
            <button className="btn btn-primary opacity-70">
              <span className="loading loading-spinner"></span>
              loading
            </button>
          ) : (
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          )}
          <div className="text-slate-800">
            Don't have an account?{' '}
            <span>
              <Link to="/register" className="link-primary underline">
                Register
              </Link>
            </span>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
