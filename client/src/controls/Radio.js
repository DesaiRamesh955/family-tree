import React from "react";

const Radio = ({
  label,
  value,
  onChange,
  variant,
  name,
  error = null,
  ...other
}) => {
  return (
    <div className="flex flex-col mb-3 ">
      <div className="flex items-center justify-start gap-1">
        <label
          className={variant == "light" ? "text-gray-400" : "text-gray-200"}
        >
          {label}
        </label>
        <input
          onChange={onChange}
          value={value}
          name={name}
          type="radio"
          {...other}
          className="px-2 py-1"
        />
      </div>
      <span className="text-sm text-red-400">{error}</span>
    </div>
  );
};

export default Radio;
