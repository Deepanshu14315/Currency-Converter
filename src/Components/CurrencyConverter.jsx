import React, { useEffect, useState } from "react";
import { HiArrowsRightLeft } from "react-icons/hi2";
import Currencies from "./Currencies";

const CurrencyConverter = () => {
  const [currencies, setCurrencies] = useState([]);
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [convertingAmount, setConvertingAmount] = useState(false);

  const fetchCurrencies = async () => {
    try {
      const response = await fetch("https://www.frankfurter.app/currencies");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setCurrencies(Object.keys(data));
    } catch (error) {
      console.log("Error fetching currencies:", error);
    }
  };

  useEffect(() => {
    fetchCurrencies();
  }, []);

  const swapCurrency = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const handleConvert = async () => {
    if (!amount) return;
    setConvertingAmount(true);
    try {
      const response = await fetch(
        `https://www.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setConvertedAmount(data.rates[toCurrency] + " " + toCurrency);
    } catch (error) {
      console.log("Error converting currency:", error);
    } finally {
      setConvertingAmount(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto my-10 p-8 rounded-lg shadow-md bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <h1 className="text-white text-3xl font-bold mb-6 text-center">
        Currency Converter
      </h1>
      <div className="flex flex-col lg:flex-row lg:justify-between items-center space-y-4 lg:space-y-0 lg:space-x-4">
        <Currencies
          currencies={currencies}
          title="From:"
          currency={fromCurrency}
          setCurrency={setFromCurrency}
        />
        <HiArrowsRightLeft
          onClick={swapCurrency}
          className="text-4xl text-white bg-gray-800 p-2 rounded-full cursor-pointer mt-4 lg:mt-0"
        />
        <Currencies
          currencies={currencies}
          title="To:"
          currency={toCurrency}
          setCurrency={setToCurrency}
        />
      </div>
      <div className="mt-5">
        <label htmlFor="amount" className="block text-white mb-2 text-lg">
          Amount:
        </label>
        <input
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          type="number"
          id="amount"
          className="w-full p-3 text-lg rounded-lg border-2 border-gray-300 outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-1 transition-all duration-200 ease-in-out"
        />
      </div>
      <div className="text-right mt-5">
        <button
          onClick={handleConvert}
          className="bg-indigo-600 rounded-lg px-5 py-3 text-white font-semibold outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-offset-1 hover:bg-indigo-500 transition-all duration-200 ease-in-out"
        >
          Convert
        </button>
      </div>
      {convertedAmount && (
        <h2 className="text-white text-xl font-medium text-center mt-5">
          Converted amount : {convertedAmount}
        </h2>
      )}
    </div>
  );
};

export default CurrencyConverter;
