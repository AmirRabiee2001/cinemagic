import useLocalStorage from "./useLocalStorage";
import { useEffect } from "react";

export default function useDarkMode() {
  // store setting in local Storage
  const [theme, setTheme] = useLocalStorage("theme", "light");

  // Toggle function
  const themeToggle = () => {
    const htmlTag = document.getElementById("html");
    htmlTag.classList.toggle("dark-mode");

    // Update the theme state
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  // Apply theme on load
  useEffect(() => {
    const htmlTag = document.documentElement;
    if (theme === "dark") {
      htmlTag.classList.add("dark-mode");
    } else {
      htmlTag.classList.remove("dark-mode");
    }
  }, [theme]);

  return [theme, themeToggle];
}
