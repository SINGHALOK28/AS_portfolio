"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { USER_CONFIG } from "@/config/userConfig";

type ConfigType = typeof USER_CONFIG;

interface PortfolioConfigContextType {
  config: ConfigType;
  updateConfig: (newConfig: ConfigType) => void;
  resetConfig: () => void;
  isLoaded: boolean;
}

const PortfolioConfigContext = createContext<PortfolioConfigContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<ConfigType>(USER_CONFIG);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = window.localStorage.getItem("portfolio_config");
        if (stored) {
          const parsed = JSON.parse(stored);
          // Simple validation check: ensure it has key sections
          if (parsed && parsed.profile && parsed.skills) {
            setConfig(parsed);
          }
        }
      } catch (err) {
        console.error("Failed to load portfolio config from localStorage:", err);
      } finally {
        setIsLoaded(true);
      }
    }
  }, []);

  const updateConfig = (newConfig: ConfigType) => {
    setConfig(newConfig);
    if (typeof window !== "undefined") {
      try {
        window.localStorage.setItem("portfolio_config", JSON.stringify(newConfig));
      } catch (err) {
        console.error("Failed to save portfolio config to localStorage:", err);
      }
    }
  };

  const resetConfig = () => {
    setConfig(USER_CONFIG);
    if (typeof window !== "undefined") {
      try {
        window.localStorage.removeItem("portfolio_config");
      } catch (err) {
        console.error("Failed to reset portfolio config in localStorage:", err);
      }
    }
  };

  return (
    <PortfolioConfigContext.Provider value={{ config, updateConfig, resetConfig, isLoaded }}>
      {children}
    </PortfolioConfigContext.Provider>
  );
};

export const usePortfolioConfig = () => {
  const context = useContext(PortfolioConfigContext);
  if (!context) {
    throw new Error("usePortfolioConfig must be used within a PortfolioProvider");
  }
  return context;
};
