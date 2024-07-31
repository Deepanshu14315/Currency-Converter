import React from "react";

const Currencies = ({ currencies, title, currency, setCurrency }) => {
  return (
    <div className="w-full lg:w-1/3">
      <label
        htmlFor="currency-select"
        className="block text-white text-lg mb-2"
      >
        {title}
      </label>
      <select
        value={currency}
        onChange={(e) => setCurrency(e.target.value)}
        id="currency-select"
        className="w-full border border-gray-300 bg-gray-100 p-3 text-lg rounded-lg outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-1 transition-all duration-200 ease-in-out"
      >
        {currencies?.map((currency, index) => (
          <option key={index} value={currency}>
            {currency}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Currencies;
