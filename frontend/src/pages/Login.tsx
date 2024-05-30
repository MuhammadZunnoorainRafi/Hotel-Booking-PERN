import { Link } from 'react-router-dom';

function Login() {
  return (
    <div className=" shrink-0 w-full max-w-sm mx-auto shadow-2xl bg-base-100 mt-10 mb-2">
      <h1 className="font-bold text-2xl text-center pt-3">Login</h1>
      <form className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            placeholder="email"
            className="input input-bordered"
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            type="password"
            placeholder="password"
            className="input input-bordered"
            required
          />
        </div>
        <div className="form-control mt-6 space-y-1">
          <button className="btn btn-primary">Login</button>
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
