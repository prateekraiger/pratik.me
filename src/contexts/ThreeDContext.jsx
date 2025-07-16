import React, { createContext, useContext, useState, useEffect } from "react";

const ThreeDContext = createContext();

export const useThreeD = () => {
  const context = useContext(ThreeDContext);
  if (!context) {
    throw new Error("useThreeD must be used within a ThreeDProvider");
  }
  return context;
};

export const ThreeDProvider = ({ children }) => {
  const [is3DEnabled, setIs3DEnabled] = useState(false);
  const [currentPage, setCurrentPage] = useState("home");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check localStorage for previous choice
    const savedChoice = localStorage.getItem("3d-mode-choice");
    if (savedChoice === "enabled") {
      setIs3DEnabled(true);
    }
  }, []);

  const enable3D = async () => {
    setIsLoading(true);
    // Simulate loading time for 3D assets
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIs3DEnabled(true);
    setIsLoading(false);
  };

  const disable3D = () => {
    setIs3DEnabled(false);
    localStorage.setItem("3d-mode-choice", "disabled");
  };

  const toggle3D = () => {
    if (is3DEnabled) {
      disable3D();
    } else {
      enable3D();
    }
  };

  const setPage = (page) => {
    setCurrentPage(page);
  };

  const value = {
    is3DEnabled,
    currentPage,
    isLoading,
    enable3D,
    disable3D,
    toggle3D,
    setPage,
  };

  return (
    <ThreeDContext.Provider value={value}>{children}</ThreeDContext.Provider>
  );
};

export default ThreeDContext;
