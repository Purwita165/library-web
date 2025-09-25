import { Link } from "react-router-dom";
import { useState } from "react";

interface User {
  email: string;
}

export default function Navbar() {
  // default null → jadi harusnya Login/Register yang muncul
  const [user] = useState<User | null>(null);

  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <Link to="/" className="text-2xl font-bold tracking-wide hover:text-gray-200">
        MyLibrary
      </Link>

      <div className="space-x-6">
        {user ? (
          <span className="font-medium">Hi, {user.email}</span>
        ) : (
          <>
            <Link to="/login" className="hover:text-gray-200">
              Login
            </Link>
            <Link to="/register" className="hover:text-gray-200">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
