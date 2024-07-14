import React from "react";

function RechargeOptions({ options, selectOption, selectedOption }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {options.map((option, index) => (
        <div
          key={index}
          className={`bg-white border-2  rounded-lg p-6 hover:shadow-xl transition-shadow duration-300 cursor-pointer flex flex-col justify-between ${
            selectedOption === index ? " border-blue-500" : "border-zinc-100"
          }`}
          onClick={() => selectOption(index)}
        >
          <div>
            <h2 className="text-xl font-semibold mb-4">{option.name}</h2>
            <p className="text-gray-700 mb-2">
              Iterations: {option.iterations}
            </p>
            <p className="text-gray-700 mb-2">{option.benefit1}</p>
            <p className="text-gray-700 mb-2">{option.benefit2}</p>
            <p className="text-gray-700 mb-2">{option.benefit3}</p>
          </div>
          <div className="text-right mt-4">
            <span className="text-lg font-semibold">${option.price}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default RechargeOptions;
