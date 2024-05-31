import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { userRegSchema } from '../lib/schemas';
import { RegUser } from '../lib/types';
import { useMutation } from '@tanstack/react-query';
import * as actions from '../actions/index';
import toast from 'react-hot-toast';

function Register() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RegUser>({
    resolver: zodResolver(userRegSchema),
  });

  const mutation = useMutation({
    mutationFn: actions.register,
    onSuccess: () => toast.success('User Registered Successfully'),
    onError: (error: Error) => toast.error(error.message),
  });

  const formSubmit = (formData: RegUser) => {
    mutation.mutate(formData);
    reset();
  };

  return (
    <div className=" shrink-0 w-full max-w-sm mx-auto shadow-2xl bg-base-100 mt-10 mb-2">
      <h1 className="font-bold text-2xl text-center pt-3">Register</h1>
      <form onSubmit={handleSubmit(formSubmit)} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            {...register}
            type="text"
            placeholder="name"
            className="input input-bordered"
            required
          />
          {errors.name && <p className="text-sm">{errors.name.message}</p>}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            {...register}
            type="email"
            placeholder="email"
            className="input input-bordered"
            required
          />
          {errors.email && <p className="text-sm">{errors.email.message}</p>}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            {...register}
            type="password"
            placeholder="password"
            className="input input-bordered"
            required
          />
          {errors.password && (
            <p className="text-sm">{errors.password.message}</p>
          )}
        </div>
        <div className="form-control mt-6">
          {isSubmitting ? (
            <button className="btn btn-primary opacity-70">
              <span className="loading loading-spinner"></span>
              loading
            </button>
          ) : (
            <button type="submit" className="btn btn-primary">
              Register
            </button>
          )}

          <div className="text-slate-800">
            Already have an account?
            <span>
              <Link to="/login" className="link-primary underline">
                Login
              </Link>
            </span>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Register;
