import React from "react";
import { Link } from "react-router-dom";
const Nav = () => {
  return (
    <div className="px-10 py-4 border-b border-slate-700">
      <div className="flex justify-between">
        <div>
          <span className="text-sky-100 font-bold text-lg"><Link to="/">Family Tree</Link></span>
        </div>
        <div>
          <ul>
            <li>
              <Link
                to="/addfamily"
                className="bg-blue-500 hover:bg-blue-400 py-2 px-4 rounded text-white "
              >
                Create
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default Nav;
