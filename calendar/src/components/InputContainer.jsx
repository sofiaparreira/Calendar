import React from "react";

const InputContainer = ({label, onChange}) => {
  return (
    <div className="my-4">
      <label for="nome" className="block text-sm font-medium text-gray-600 py-1 ">{label}</label>
      <input
        onChange={onChange}
        type="text"
        className="border-gray-200 text-gray-700 border rounded-md px-2 py-1 w-full outline-none focus:ring focus:ring-orange-100 focus:border-2 focus:border-orange-200"
      />
    </div>
  );
};

export default InputContainer;
