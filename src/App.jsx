import React from "react";
import CurrencyConverter from "./Components/CurrencyConverter";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <CurrencyConverter />
      </div>
    </div>
  );
};

export default App;
