import { Link } from 'react-router-dom';
import { useAppContext } from '../../lib/utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import * as actions from '../../actions/index';
import toast from 'react-hot-toast';

function Navbar() {
  const { isLoggedIn, user } = useAppContext();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: actions.logout,
    onSuccess: async () => {
      toast.success('Logout Successfully');
      await queryClient.invalidateQueries({ queryKey: ['verifyToken'] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return (
    <div className="navbar bg-base-300 ">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a>Item 1</a>
            </li>
            <li>
              <a>Parent</a>
              <ul className="p-2">
                <li>
                  <a>Submenu 1</a>
                </li>
                <li>
                  <a>Submenu 2</a>
                </li>
              </ul>
            </li>
            <li>
              <a>Item 3</a>
            </li>
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">daisyUI</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 space-x-3">
          <Link className="btn btn-ghost" to="/add-hotel">
            Add Hotel
          </Link>
          <Link className="btn btn-ghost" to="/my-hotels">
            My Hotels
          </Link>
        </ul>
      </div>
      <div className="navbar-end">
        {isLoggedIn && user ? (
          <div className="dropdown dropdown-end mr-2">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <button className="btn btn-success text-white">
                {user.name}
              </button>
            </div>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-28"
            >
              <button
                onClick={() => mutation.mutate()}
                className="btn btn-sm btn-error text-white"
              >
                {mutation.isPending ? 'Loading...' : 'Logout'}
              </button>
            </ul>
          </div>
        ) : (
          <Link to="/login" className="btn btn-primary">
            Login
          </Link>
        )}
      </div>
    </div>
  );
}

export default Navbar;
