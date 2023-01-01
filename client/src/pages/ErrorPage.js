import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col text-center text-white gap-3">
        <h1 className=" font-bold text-5xl">Opps!</h1>
        <span className="font-thin text-lg">404</span>
        <Link to="/" className="bg-blue-500 hover:bg-blue-600 px-4 py-3 rounded">Go to Home</Link>
      </div>
    </div>
  );
};

export default ErrorPage;
