import { createContext, useState } from "react";
import Content from "./Content";

import "./App.css";
export const ThemeContext = createContext();
function App() {
  const [theme, setTheme] = useState("dark");

  const toggle = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  return (
    <ThemeContext.Provider value={theme}>
      <div style={{ padding: 20 }}>
        <button onClick={toggle}>toggle theme</button>
        <Content theme={theme} />
      </div>
    </ThemeContext.Provider>
  );
}
export default App;
