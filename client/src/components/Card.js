import React from "react";
import { Link } from "react-router-dom";

const Card = ({ data }) => {
  const { name, image, _id } = data;
  return (
    <div className="bg-slate-500 rounded overflow-hidden w-56 flex flex-col shadow-md cursor-pointer mx-auto">
      <div className="w-full h-48">
        <Link to={`family/${_id}`}>
          <img
            className="w-full h-48 object-cover object-center"
            src={`http://localhost:5000/public/assets/images/${image}`}
            alt="Member profile"
          />
        </Link>
      </div>
      <div className="bg-slate-500 text-white h-full flex justify-between p-3">
        <span className="font-semibold">{name}</span>
        <span>16</span>
      </div>
    </div>
  );
};

export default Card;
