import React, { useState } from "react";

const SelectMenu = ({ selectedOption, options, label, onChange }) => {
  const [textColor, setTextColor] = useState("text-gray-500");

  const handleChange = (e) => {
    const value = e.target.value;
    let color = "text-gray-500";

    if (value === "Tranquilo") color = "text-blue-500";
    else if (value === "Urgente") color = "text-red-500";

    setTextColor(color);
    onChange(e); 
  };

  return (
    <div>
      <label
        htmlFor={label}
        className="block text-sm font-medium text-gray-600 py-1"
      >
        {label}
      </label>
      <select
        onChange={handleChange}
        className={`border-gray-200 border rounded-md px-2 py-1 w-full outline-none focus:ring focus:ring-orange-100 focus:border-2 focus:border-orange-200 ${textColor}`}
        id={label}
        style={{ appearance: "none" }} // Necessário para estilos personalizados
      >
        <option className="text-gray-500" value="">
          {selectedOption}
        </option>
        {options.map((option, index) => (
          <option key={index} value={option} className="text-gray-500">
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectMenu;
