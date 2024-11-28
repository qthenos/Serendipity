"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface DateContextProps {
  date: Date;
  setDate: (date: Date) => void;
}

const DateContext = createContext<DateContextProps | undefined>(undefined);

export const DateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [date, setDate] = useState<Date>(new Date());

  return (
    <DateContext.Provider value={{ date, setDate }}>
      {children}
    </DateContext.Provider>
  );
};

export const useDate = (): DateContextProps => {
  const context = useContext(DateContext);
  if (!context) {
    throw new Error('useDate must be used within a DateProvider');
  }
  return context;
};