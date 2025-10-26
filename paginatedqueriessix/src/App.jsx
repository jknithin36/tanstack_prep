import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
  Link,
} from "react-router-dom";
import Pagination from "./pages/Pagination";
import InfinteScrool from "./pages/InfinteScrool";
function Home() {
  return (
    <div style={{ padding: 16 }}>
      <h1>Examples</h1>
      <nav style={{ display: "flex", gap: 12, marginTop: 8 }}>
        <Link to="/pagination">Go to Pagination</Link>
        <Link to="/infinite-scroll">Go to Infinite Scroll</Link>
      </nav>
    </div>
  );
}

const App = () => {
  return (
    <Router>
      {/* Keep nav INSIDE the Router context */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pagination" element={<Pagination />} />
        <Route path="/infinite-scroll" element={<InfinteScrool />} />
        {/* Optional 404 */}
        <Route
          path="*"
          element={<div style={{ padding: 16 }}>Not found</div>}
        />
      </Routes>
    </Router>
  );
};

export default App;
