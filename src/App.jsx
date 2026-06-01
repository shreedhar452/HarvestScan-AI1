import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Scanner from "./pages/Scanner";
import History from "./pages/History";
import Settings from "./pages/Settings";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Navbar />

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />

            <Route
              path="/scanner"
              element={<Scanner />}
            />

            <Route
              path="/history"
              element={<History />}
            />

            <Route
              path="/settings"
              element={<Settings />}
            />

            {/* Redirect unknown routes */}
            <Route
              path="*"
              element={<Navigate to="/" replace />}
            />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;