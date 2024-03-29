import React, { createContext, useContext, useState } from 'react';

const ChartContext = createContext<{
  rerenderChart: boolean;
  toggleRerenderChart: () => void;
}>({ rerenderChart: false, toggleRerenderChart: () => {} });

export const ChartProvider = ({ children }) => {
  const [rerenderChart, setRerenderChart] = useState(false);

  const toggleRerenderChart = () => {
    setRerenderChart(prevState => !prevState);
  };

  return (
    <ChartContext.Provider value={{ rerenderChart, toggleRerenderChart }}>
      {children}
    </ChartContext.Provider>
  );
};

export const useChart = () => useContext(ChartContext);
