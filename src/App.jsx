import Navbar from "./components/Navbar";
import HistoricalChart from "./components/HistoricalChart";
import ForecastChart from "./components/ForecastChart";

function App() {
  return (
    <div style={{ minHeight: "100vh", background: "#f4f6fb", fontFamily: "Segoe UI, Arial, sans-serif" }}>

      {/* Navigation */}
      <Navbar />

      {/* Page content */}
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "32px 24px" }}>

        {/* Page title */}
        <div style={{ marginBottom: "28px" }}>
          <h1 style={{ fontSize: "22px", fontWeight: "700", color: "#1a3a6b", margin: 0 }}>
            Coconut Price Prediction Dashboard
          </h1>
          <p style={{ fontSize: "13px", color: "#888", marginTop: "6px" }}>
            PUSL3190 Computing Project &nbsp;·&nbsp; BSc (Hons) Data Science &nbsp;·&nbsp;
            Samaraweera Chandrasekara (10953732) &nbsp;·&nbsp; Supervisor: Ms. Kavishka Rajapaksha
          </p>
        </div>

        {/* Chart 1 — Historical prices */}
        <HistoricalChart />

        {/* Chart 2 — Future forecast */}
        <ForecastChart />

        {/* Footer */}
        <div style={{
          textAlign: "center",
          marginTop: "32px",
          padding: "16px",
          fontSize: "12px",
          color: "#aaa",
          borderTop: "1px solid #dde4ee",
        }}>
          Data source: Coconut Development Authority (CDA), Sri Lanka &nbsp;·&nbsp;
          Models: ARIMA, Linear Regression, Random Forest, LSTM, GRU &nbsp;·&nbsp;
          Best model: GRU (MAPE ≈ 3.7%)
        </div>

      </div>
    </div>
  );
}

export default App;