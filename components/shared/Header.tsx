import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

import { GiAutoRepair } from "react-icons/gi";

const Header = () => {
  const { data: session, status } = useSession();
  const isAdmin = session?.user?.email === "admin";
  return (
    <header className="shadow-md shadow-gray-400/10 mb-4">
      <div className="navbar bg-base-100 h-20 container">
        <div className="flex-1 text-2xl font-extrabold flex items-center gap-1">
          <GiAutoRepair size={32}></GiAutoRepair>
          <span>DanD</span>
        </div>
        <div className="flex items-center gap-4">
          {session ? (
            <>
              <button className="btn-sm btn-primary btn">{session?.user?.name}</button>
              {isAdmin && <button className="btn-sm btn-ghost btn">Add User</button>}
              <button className="btn btn-sm btn-ghost" onClick={() => signOut()}>
                Logout
              </button>
            </>
          ) : (
            <Link href="/api/auth/signin">
              <button className="btn btn-sm btn-accent">Login</button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
