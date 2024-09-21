import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const token = localStorage.getItem('token');

  useEffect(() => {
    setIsLoggedIn(!!token); // Check if token exists
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    window.location.href = '/login';
  };

  return (
    <nav className="bg-white p-4 shadow-md flex justify-between">
      <Link to="/" className="text-xl font-bold">Calendar App</Link>
      <div>
      {!isLoggedIn ? (
          <>
            <Link to="/login" className="mr-4">Login</Link>
            <Link to="/register">Register</Link>
          </>
        ) : (
          <button onClick={handleLogout} className="text-red-500">Logout</button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
