import { useState } from "react";

import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import GetQRCode from "./components/GetQRCode";

function App() {
  const [page, setPage] = useState("login"); // login, get-qrcode, dashboard
  const [token, setToken] = useState("");

  const handleTokenSet = (t) => {
    setToken(t);
    setPage("get-qrcode");
  };

  const handleCodeUpdate = (t) => {
    setToken(t);
    setPage("dashboard");
  };

  return (
    <>
      <nav>
        <button onClick={() => setPage("login")}>Login</button>
        <button onClick={() => setPage("get-qrcode")}>Get QR Code</button>
        <button onClick={() => setPage("dashboard")}>Dashboard</button>
      </nav>

      {page == "login" && <Login handleTokenSet={handleTokenSet} />}
      {page == "get-qrcode" && (
        <GetQRCode token={token} handleCodeUpdate={handleCodeUpdate} />
      )}
      {page == "dashboard" && <Dashboard token={token} />}
    </>
  );
}

export default App;
