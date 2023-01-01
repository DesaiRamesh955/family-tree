import React from "react";

const Input = ({
  label,
  type,
  value,
  onChange,
  name,
  variant,
  error = null,
  ...other
}) => {
  return type == "submit" ? (
    <div className="flex flex-col mb-3">
      <input
        type={type}
        value={value}
        {...other}
        className="px-2 py-1 bg-blue-500 hover:bg-blue-600 cursor-pointer text-white font-bold rounded-sm outline-none"
      />
    </div>
  ) : (
    <div className="flex flex-col mb-3">
      <label className={variant == "light" ? "text-gray-400" : "text-gray-200"}>
        {label}
      </label>
      <input
        type={type}
        onChange={onChange}
        value={value}
        name={name}
        {...other}
        className="px-2 py-1 rounded-sm outline-none"
      />
      <span className="text-sm text-red-400">{error}</span>
    </div>
  );
};

export default Input;
