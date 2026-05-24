"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { USER_CONFIG } from "@/config/userConfig";

type ConfigType = typeof USER_CONFIG;

interface PortfolioConfigContextType {
  config: ConfigType;
  updateConfig: (newConfig: ConfigType) => void;
  resetConfig: () => void;
  isLoaded: boolean;
  theme: string;
  setTheme: (theme: string) => void;
}

/**
 * PortfolioConfigContext
 * 
 * WHY THIS CODE EXISTS:
 * This Context Provider serves as the global state manager for the entire portfolio.
 * It holds the configuration data (from userConfig.ts) and the current UI theme.
 * 
 * WHAT IT DOES:
 * 1. Initializes global state with data from `USER_CONFIG`.
 * 2. Caches the configuration and theme into the browser's `localStorage` so that user preferences persist across sessions.
 * 3. Provides a mechanism to securely sync updates from the source code over stale cache data to ensure users always see the latest projects and URLs.
 * 4. Injects CSS custom variables into the DOM (`data-theme`) to enable dynamic color switching globally.
 */
const PortfolioConfigContext = createContext<PortfolioConfigContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<ConfigType>(USER_CONFIG);
  const [isLoaded, setIsLoaded] = useState(false);
  const [theme, setThemeState] = useState("emerald");

  const setTheme = (newTheme: string) => {
    setThemeState(newTheme);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("portfolio_theme", newTheme);
      document.documentElement.setAttribute("data-theme", newTheme);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = window.localStorage.getItem("portfolio_config");
        if (stored) {
          const parsed = JSON.parse(stored);
          // Simple validation check: ensure it has key sections
          if (parsed && parsed.profile && parsed.skills) {
            // Force sync from source if the new Vice President role is missing from the stale cache
            if (!JSON.stringify(parsed.leadership).includes("Vice President")) {
              parsed.leadership = USER_CONFIG.leadership;
              parsed.experiences = USER_CONFIG.experiences;
            }
            
            // Force usernames and certifications to always sync from source code to avoid stale caches
            parsed.usernames = USER_CONFIG.usernames;
            parsed.certifications = USER_CONFIG.certifications;
            parsed.experiences = USER_CONFIG.experiences;
            parsed.gallery = USER_CONFIG.gallery;
            parsed.profile = USER_CONFIG.profile;
            
            // Sync new demoImage fields into stale cache safely
            if (parsed.projects) {
              parsed.projects = parsed.projects.map((p: any) => {
                const sourceProj = USER_CONFIG.projects.find(sp => sp.id === p.id);
                return { 
                  ...p, 
                  demoImage: sourceProj?.demoImage || p.demoImage,
                  github: sourceProj?.github || p.github,
                  demo: sourceProj?.demo || p.demo
                };
              });
            }

            setConfig(parsed);
          }
        }
        
        // Load theme
        const storedTheme = window.localStorage.getItem("portfolio_theme");
        if (storedTheme) {
          setThemeState(storedTheme);
          document.documentElement.setAttribute("data-theme", storedTheme);
        } else {
          document.documentElement.setAttribute("data-theme", "emerald");
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
    <PortfolioConfigContext.Provider value={{ config, updateConfig, resetConfig, isLoaded, theme, setTheme }}>
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
